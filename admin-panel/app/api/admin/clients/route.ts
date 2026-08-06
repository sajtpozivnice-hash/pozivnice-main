import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { deleteClient } from "@/services/clients.service";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const { data, error } = await supabaseAdmin
    .from("clients")
    .select("*")
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

  const { data: authUser, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email: email.trim(),
      password: "Test123456!",
      email_confirm: true,
    });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("clients")
    .insert([
      {
        name: name.trim(),
        email: email.trim(),
        phone: phone || null,
        auth_user_id: authUser?.user?.id,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data, { status: 201 });
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
    .select()
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
