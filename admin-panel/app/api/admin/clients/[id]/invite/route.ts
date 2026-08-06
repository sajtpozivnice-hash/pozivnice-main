import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { inviteClientByEmail } from "@/lib/clientInvite";

type RouteContext = { params: Promise<{ id: string }> };

/** Resend invite / password-setup email for an existing client. */
export async function POST(req: NextRequest, context: RouteContext) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await context.params;
    const { data: client, error } = await supabaseAdmin
      .from("clients")
      .select("id, name, email, auth_user_id")
      .eq("id", id)
      .single();

    if (error || !client) {
      return NextResponse.json(
        { error: error?.message || "Klijent nije pronađen" },
        { status: 404 },
      );
    }

    const invite = await inviteClientByEmail({
      email: client.email,
      name: client.name,
    });

    // Keep auth_user_id in sync if it was missing / changed
    if (invite.userId && invite.userId !== client.auth_user_id) {
      await supabaseAdmin
        .from("clients")
        .update({ auth_user_id: invite.userId })
        .eq("id", id);
    }

    return NextResponse.json({
      success: true,
      invite_type: invite.linkType,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Greška";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
