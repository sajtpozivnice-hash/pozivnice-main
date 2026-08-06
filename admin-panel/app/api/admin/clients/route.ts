import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { inviteClientByEmail } from "@/lib/clientInvite";
import { deleteClient } from "@/services/clients.service";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const { data, error } = await supabaseAdmin
    .from("clients")
    .select("id, name, email, phone, auth_user_id, created_at, updated_at")
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const { name, email, phone } = await req.json();

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "Ime i email su obavezni" },
      { status: 400 },
    );
  }

  try {
    const invite = await inviteClientByEmail({
      email: email.trim(),
      name: name.trim(),
    });

    const { data, error } = await supabaseAdmin
      .from("clients")
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone || null,
          auth_user_id: invite.userId,
        },
      ])
      .select("id, name, email, phone, auth_user_id, created_at, updated_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        ...data,
        invite_sent: true,
        invite_type: invite.linkType,
      },
      { status: 201 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Greška";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const { id, name, email, phone } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "ID je obavezan" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("clients")
    .update({
      name,
      email,
      phone,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("id, name, email, phone, auth_user_id, created_at, updated_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID je obavezan" }, { status: 400 });
  }

  try {
    await deleteClient(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Greška";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
