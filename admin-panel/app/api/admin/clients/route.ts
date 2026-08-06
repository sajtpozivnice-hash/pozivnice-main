import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

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
        paid: false,
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

  const { id, name, email, phone, paid } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "ID je obavezan" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("clients")
    .update({
      name,
      email,
      phone,
      paid,
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

  const { error } = await supabaseAdmin.from("clients").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
