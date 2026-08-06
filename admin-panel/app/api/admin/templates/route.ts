import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { getTemplateCatalog, getTemplatesForEventType } from "@/lib/templates";
import type { EventType } from "@/types/project";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  try {
    const eventType = req.nextUrl.searchParams.get(
      "eventType",
    ) as EventType | null;
    const catalog = eventType
      ? getTemplatesForEventType(eventType)
      : getTemplateCatalog();
    return NextResponse.json(catalog);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Greška";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
