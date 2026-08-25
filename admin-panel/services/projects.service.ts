import { deleteProjectsByIds } from "@/services/cascadeDelete.service";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  applyFormOverridesToConfig,
  validateConfigObject,
} from "@/lib/configParse";
import {
  buildInitialConfig,
  getDefaultConfigForTemplate,
  isTemplateKey,
} from "@/lib/templates";
import {
  isReservedSubdomain,
  isValidSubdomain,
  normalizeSubdomain,
} from "@/lib/urls";
import type {
  CreateProjectInput,
  EventType,
  Project,
  ProjectFilters,
  ProjectListItem,
  ProjectsListResult,
  ProjectWithClient,
  UpdateProjectInput,
  UniversalProjectConfig,
} from "@/types/project";
import { normalizeEventType } from "@/types/project";

function asConfig(value: unknown): UniversalProjectConfig | null {
  if (!value || typeof value !== "object") return null;
  const cfg = value as UniversalProjectConfig;
  if (!cfg.template || !cfg.event || !cfg.meta) return null;
  return cfg;
}

function toListItem(row: ProjectWithClient): ProjectListItem {
  const config = asConfig(row.config_json);
  return {
    id: row.id,
    title: row.title,
    subdomain: row.subdomain,
    published: row.published === true,
    created_at: row.created_at,
    updated_at: row.updated_at,
    client_id: row.client_id,
    client_name: row.clients?.name || row.client_name || "—",
    client_email: row.clients?.email || null,
    template: config?.template || "—",
    event_type: normalizeEventType(config?.eventType, config?.template),
    event_date: config?.event?.date || null,
  };
}

export async function isSubdomainAvailable(
  subdomain: string,
  excludeId?: string,
): Promise<{ available: boolean; reason?: string }> {
  const slug = normalizeSubdomain(subdomain);
  if (!slug) {
    return { available: false, reason: "Unesite subdomain." };
  }
  if (!isValidSubdomain(slug)) {
    return {
      available: false,
      reason: isReservedSubdomain(slug)
        ? `Subdomain "${slug}" je rezervisan.`
        : "Subdomain mora biti slug (mala slova, brojevi, crtice), npr. ana-marko",
    };
  }

  let query = supabaseAdmin
    .from("projects")
    .select("id")
    .ilike("subdomain", slug)
    .limit(1);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  if (data && data.length > 0) {
    return { available: false, reason: `Subdomain "${slug}" je već zauzet.` };
  }
  return { available: true };
}

async function assertSubdomainAvailable(
  subdomain: string,
  excludeId?: string,
): Promise<void> {
  const result = await isSubdomainAvailable(subdomain, excludeId);
  if (!result.available) {
    throw new Error(result.reason || `Subdomain "${subdomain}" nije dostupan`);
  }
}

async function getClientName(clientId: string): Promise<{
  name: string;
  email: string;
}> {
  const { data, error } = await supabaseAdmin
    .from("clients")
    .select("id, name, email")
    .eq("id", clientId)
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Klijent nije pronađen");
  }

  return { name: data.name, email: data.email };
}

export async function getProjects(
  filters: ProjectFilters = {},
): Promise<ProjectsListResult> {
  const page = Math.max(1, filters.page || 1);
  const pageSize = Math.min(50, Math.max(5, filters.pageSize || 12));
  const sort = filters.sort || "created_at";
  const ascending = filters.order === "asc";

  let query = await supabaseAdmin
    .from("projects")
    .select("*, clients(id, name, email, phone)")
    .order(sort, { ascending, nullsFirst: false });

  if (query.error) {
    // Fallback if FK embed is unavailable
    query = await supabaseAdmin
      .from("projects")
      .select("*")
      .order(sort, { ascending, nullsFirst: false });
  }

  if (query.error) throw new Error(query.error.message);

  let items = (query.data || []).map((row) =>
    toListItem(row as ProjectWithClient),
  );

  const search = filters.search?.trim().toLowerCase();
  if (search) {
    items = items.filter((p) => {
      const hay = [
        p.title,
        p.subdomain,
        p.client_name,
        p.client_email || "",
        p.template,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(search);
    });
  }

  if (filters.eventType && filters.eventType !== "all") {
    items = items.filter((p) => p.event_type === filters.eventType);
  }

  if (filters.template && filters.template !== "all") {
    items = items.filter((p) => p.template === filters.template);
  }

  if (filters.published === "true") {
    items = items.filter((p) => p.published);
  } else if (filters.published === "false") {
    items = items.filter((p) => !p.published);
  }

  if (filters.clientId && filters.clientId !== "all") {
    items = items.filter((p) => p.client_id === filters.clientId);
  }

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export async function getProjectById(id: string): Promise<ProjectWithClient> {
  const withClient = await supabaseAdmin
    .from("projects")
    .select("*, clients(id, name, email, phone)")
    .eq("id", id)
    .single();

  if (!withClient.error && withClient.data) {
    return withClient.data as ProjectWithClient;
  }

  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data as ProjectWithClient;
}

export async function createProject(
  input: CreateProjectInput,
): Promise<Project> {
  const subdomain = normalizeSubdomain(input.subdomain);
  if (!isValidSubdomain(subdomain)) {
    throw new Error(
      isReservedSubdomain(subdomain)
        ? `Subdomain "${subdomain}" je rezervisan`
        : "Subdomain mora biti slug (mala slova, brojevi, crtice), npr. ana-marko",
    );
  }

  if (!isTemplateKey(input.template)) {
    throw new Error("Nepoznat template");
  }

  await assertSubdomainAvailable(subdomain);
  const client = await getClientName(input.client_id);

  let config_json: UniversalProjectConfig;

  if (input.config_json) {
    const validated = validateConfigObject(input.config_json);
    if (!validated.ok) throw new Error(validated.error);
    config_json = applyFormOverridesToConfig(validated.config, {
      title: input.title,
      eventDate: input.eventDate,
      eventType: input.eventType,
      template: input.template,
    });
  } else {
    config_json = buildInitialConfig({
      template: input.template,
      eventType: input.eventType,
      title: input.title,
      eventDate: input.eventDate,
    });
  }

  const payload = {
    client_id: input.client_id,
    client_name: client.name,
    title: input.title.trim(),
    subdomain,
    config_json,
    published: input.published ?? true,
  };

  let { data, error } = await supabaseAdmin
    .from("projects")
    .insert([payload])
    .select()
    .single();

  // Older schemas may not have client_name
  if (error?.message?.toLowerCase().includes("client_name")) {
    const { client_name: _omit, ...withoutName } = payload;
    const retry = await supabaseAdmin
      .from("projects")
      .insert([withoutName])
      .select()
      .single();
    data = retry.data;
    error = retry.error;
  }

  if (error) throw new Error(error.message);
  return data as Project;
}

export async function updateProject(
  input: UpdateProjectInput,
): Promise<Project> {
  const existing = await getProjectById(input.id);
  let currentConfig = asConfig(existing.config_json);

  // Legacy / broken rows: rebuild from template if needed
  if (!currentConfig) {
    if (!input.template || !isTemplateKey(input.template)) {
      throw new Error(
        "Projekat nema validan config_json. Izaberite template da se regeneriše.",
      );
    }
    currentConfig = buildInitialConfig({
      template: input.template,
      eventType: input.eventType || "wedding",
      title: input.title || existing.title,
      eventDate: input.eventDate,
    });
  }

  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  let nextConfig: UniversalProjectConfig = { ...currentConfig };

  if (typeof input.title === "string") {
    updates.title = input.title.trim();
    nextConfig = {
      ...nextConfig,
      meta: { ...nextConfig.meta, title: input.title.trim() },
    };
  }

  if (typeof input.published === "boolean") {
    updates.published = input.published;
  }

  if (input.client_id && input.client_id !== existing.client_id) {
    const client = await getClientName(input.client_id);
    updates.client_id = input.client_id;
    updates.client_name = client.name;
  }

  if (typeof input.subdomain === "string") {
    const subdomain = normalizeSubdomain(input.subdomain);
    if (!isValidSubdomain(subdomain)) {
      throw new Error(
        isReservedSubdomain(subdomain)
          ? `Subdomain "${subdomain}" je rezervisan`
          : "Subdomain mora biti slug (mala slova, brojevi, crtice), npr. ana-marko",
      );
    }
    if (subdomain !== existing.subdomain) {
      await assertSubdomainAvailable(subdomain, input.id);
    }
    updates.subdomain = subdomain;
  }

  const templateChanging =
    !input.config_json &&
    Boolean(input.template) &&
    isTemplateKey(input.template!) &&
    input.template !== currentConfig.template;

  if (input.config_json) {
    const validated = validateConfigObject(input.config_json);
    if (!validated.ok) throw new Error(validated.error);
    nextConfig = applyFormOverridesToConfig(validated.config, {
      title: typeof input.title === "string" ? input.title : existing.title,
      eventDate: input.eventDate,
      eventType: input.eventType,
      template: input.template,
    });
  } else if (templateChanging) {
    if (!input.resetConfig) {
      throw new Error(
        "Promena template-a zahteva potvrdu (resetConfig). Postojeći config bi bio zamenjen.",
      );
    }
    const seeded = getDefaultConfigForTemplate(input.template!);
    if (!seeded) {
      throw new Error(`Nema default config za template: ${input.template}`);
    }
    nextConfig = {
      ...seeded,
      template: input.template!,
      eventType: input.eventType || currentConfig.eventType || "wedding",
      meta: {
        ...seeded.meta,
        title:
          (typeof input.title === "string" ? input.title.trim() : null) ||
          existing.title ||
          seeded.meta.title,
      },
      event: {
        ...seeded.event,
        date: input.eventDate || currentConfig.event?.date || seeded.event.date,
        names: currentConfig.event?.names || seeded.event.names,
      },
    };
  } else {
    if (input.template && isTemplateKey(input.template)) {
      nextConfig = { ...nextConfig, template: input.template };
    }
    if (input.eventType) {
      nextConfig = { ...nextConfig, eventType: input.eventType };
    }
    if (input.eventDate) {
      nextConfig = {
        ...nextConfig,
        event: { ...nextConfig.event, date: input.eventDate },
      };
    }
  }

  updates.config_json = nextConfig;

  let { data, error } = await supabaseAdmin
    .from("projects")
    .update(updates)
    .eq("id", input.id)
    .select()
    .single();

  if (error?.message?.toLowerCase().includes("client_name")) {
    const { client_name: _omit, ...withoutName } = updates;
    const retry = await supabaseAdmin
      .from("projects")
      .update(withoutName)
      .eq("id", input.id)
      .select()
      .single();
    data = retry.data;
    error = retry.error;
  }

  if (error) throw new Error(error.message);
  return data as Project;
}

export async function deleteProject(id: string): Promise<void> {
  await deleteProjectsByIds([id]);
}
