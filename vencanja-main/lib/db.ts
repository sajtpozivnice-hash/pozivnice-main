import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { UniversalProjectConfig } from "@/types/config";

export type PublicSiteProject = {
  id: string;
  title: string;
  subdomain: string;
  published: boolean;
  config_json: UniversalProjectConfig;
};

type ProjectRow = {
  id: string;
  title: string;
  subdomain: string;
  published?: boolean | null;
  config_json: UniversalProjectConfig | string | null;
};

type LoadResult =
  | { ok: true; project: PublicSiteProject | null }
  | { ok: false; retry: true };

function normalizeConfig(
  value: ProjectRow["config_json"],
): UniversalProjectConfig | null {
  if (!value) return null;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as UniversalProjectConfig;
    } catch {
      return null;
    }
  }
  return value;
}

function mapPublishedProject(row: ProjectRow): PublicSiteProject | null {
  const config_json = normalizeConfig(row.config_json);
  if (!row.id || !config_json) return null;

  // Strict: only explicitly published projects are public
  if (row.published !== true) return null;

  return {
    id: row.id,
    title: row.title,
    subdomain: row.subdomain,
    published: true,
    config_json,
  };
}

async function loadViaRpc(slug: string): Promise<LoadResult> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc(
    "get_published_project_by_subdomain",
    { p_subdomain: slug },
  );

  if (error) {
    // Missing RPC → try fallbacks. Other errors still allow fallback.
    if (error.code !== "PGRST202") {
      console.error("[getProjectBySlug] RPC failed", {
        slug,
        message: error.message,
        code: error.code,
      });
    }
    return { ok: false, retry: true };
  }

  const row = (Array.isArray(data) ? data[0] : data) as ProjectRow | null;
  return { ok: true, project: row ? mapPublishedProject(row) : null };
}

async function selectBySubdomain(
  client: NonNullable<ReturnType<typeof createAdminClient>>,
  slug: string,
  includePublished: boolean,
): Promise<{ data: ProjectRow | null; error: { message: string } | null }> {
  // Literal select strings keep Supabase typings valid (dynamic columns break them).
  if (includePublished) {
    const result = await client
      .from("projects")
      .select("id, title, subdomain, published, config_json")
      .eq("subdomain", slug)
      .limit(1)
      .maybeSingle();

    return {
      data: (result.data as ProjectRow | null) ?? null,
      error: result.error,
    };
  }

  const result = await client
    .from("projects")
    .select("id, title, subdomain, config_json")
    .eq("subdomain", slug)
    .limit(1)
    .maybeSingle();

  return {
    data: result.data
      ? ({ ...(result.data as Omit<ProjectRow, "published">), published: true } as ProjectRow)
      : null,
    error: result.error,
  };
}

async function loadViaAdmin(slug: string): Promise<PublicSiteProject | null> {
  const admin = createAdminClient();
  if (!admin) return null;

  let { data, error } = await selectBySubdomain(admin, slug, true);

  if (error?.message?.toLowerCase().includes("published")) {
    const retry = await selectBySubdomain(admin, slug, false);
    data = retry.data;
    error = retry.error;
  }

  // Case-insensitive fallback if DB still has mixed-case subdomain values
  if (!error && !data) {
    const loose = await admin
      .from("projects")
      .select("id, title, subdomain, published, config_json")
      .ilike("subdomain", slug)
      .limit(1)
      .maybeSingle();

    if (!loose.error && loose.data) {
      data = loose.data as ProjectRow;
    } else if (loose.error) {
      error = loose.error;
    }
  }

  if (error) {
    console.error("[getProjectBySlug] admin select failed", error);
    return null;
  }

  return data ? mapPublishedProject(data) : null;
}

async function loadViaAnonSelect(slug: string): Promise<PublicSiteProject | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, subdomain, published, config_json")
    .eq("subdomain", slug)
    .eq("published", true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[getProjectBySlug] anon select failed", {
      slug,
      message: error.message,
      code: error.code,
    });
    return null;
  }

  return data ? mapPublishedProject(data as ProjectRow) : null;
}

/**
 * Load a public invitation project by subdomain slug.
 * Tries RPC → service-role select → anon select.
 * Fallbacks run only when RPC is unavailable/errors — not when RPC returns empty.
 */
export async function getProjectBySlug(
  subdomain: string,
): Promise<PublicSiteProject | null> {
  const slug = subdomain.trim().toLowerCase();
  if (!slug) return null;

  const rpc = await loadViaRpc(slug);
  if (rpc.ok) {
    return rpc.project;
  }

  const viaAdmin = await loadViaAdmin(slug);
  if (viaAdmin) return viaAdmin;

  const viaAnon = await loadViaAnonSelect(slug);
  if (viaAnon) return viaAnon;

  return null;
}

export const getDefaultProjectBySlug = (param: string) => {
  void param;
  return;
};
