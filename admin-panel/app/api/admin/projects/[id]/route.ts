import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import {
  deleteProject,
  getProjectById,
  updateProject,
} from "@/services/projects.service";
import type { UpdateProjectInput } from "@/types/project";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, context: RouteContext) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await context.params;
    const project = await getProjectById(id);
    return NextResponse.json(project);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Greška";
    return NextResponse.json({ error: message }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await context.params;
    const body = (await req.json()) as Omit<UpdateProjectInput, "id">;
    const project = await updateProject({ ...body, id });
    return NextResponse.json(project);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Greška";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await context.params;
    await deleteProject(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Greška";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
