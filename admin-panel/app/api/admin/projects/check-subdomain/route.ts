import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { isSubdomainAvailable } from "@/services/projects.service";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  try {
    const subdomain = req.nextUrl.searchParams.get("subdomain") || "";
    const excludeId = req.nextUrl.searchParams.get("excludeId") || undefined;
    const result = await isSubdomainAvailable(subdomain, excludeId || undefined);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Greška";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
