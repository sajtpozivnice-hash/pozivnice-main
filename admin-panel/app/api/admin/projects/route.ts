import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import {
  createProject,
  getProjects,
} from "@/services/projects.service";
import type {
  CreateProjectInput,
  EventType,
  ProjectFilters,
  ProjectSortField,
  TemplateKey,
} from "@/types/project";

function parseFilters(req: NextRequest): ProjectFilters {
  const sp = req.nextUrl.searchParams;
  return {
    search: sp.get("search") || undefined,
    eventType: (sp.get("eventType") as EventType | "all") || "all",
    template: sp.get("template") || "all",
    published: (sp.get("published") as "all" | "true" | "false") || "all",
    clientId: sp.get("clientId") || "all",
    sort: (sp.get("sort") as ProjectSortField) || "created_at",
    order: (sp.get("order") as "asc" | "desc") || "desc",
    page: Number(sp.get("page") || 1),
    pageSize: Number(sp.get("pageSize") || 12),
  };
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  try {
    const result = await getProjects(parseFilters(req));
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Greška";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  try {
    const body = (await req.json()) as CreateProjectInput;
    if (
      !body.client_id ||
      !body.title ||
      !body.subdomain ||
      !body.template ||
      !body.eventType
    ) {
      return NextResponse.json(
        {
          error:
            "Obavezna polja: client_id, title, subdomain, template, eventType",
        },
        { status: 400 },
      );
    }

    const project = await createProject({
      client_id: body.client_id,
      title: body.title,
      subdomain: body.subdomain,
      template: body.template as TemplateKey,
      eventType: body.eventType,
      eventDate: body.eventDate,
      published: body.published,
      config_json: body.config_json,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Greška";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
