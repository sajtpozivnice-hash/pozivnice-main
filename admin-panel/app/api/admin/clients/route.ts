import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET – lista svih klijenata
export async function GET() {
  const { data, error } = await supabaseAdmin.from("clients").select("*");
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// POST – kreiranje klijenta i slanje invite email
export async function POST(req: NextRequest) {
  const { name, email, phone } = await req.json();

  // const { data: authUser, error: authError } =
  //   await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
  //     redirectTo: "http://localhost:3000/dashboard/set-password",
  //   });

  const { data: authUser, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password: "Test123456!",
      email_confirm: true,
    });

  console.log("AUTH USER", authUser);
  console.log("AUTH ERROR", authError);
  if (authError)
    return NextResponse.json({ error: authError.message }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("clients")
    .insert([
      { name, email, phone, auth_user_id: authUser?.user?.id, paid: false },
    ])
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// PUT – update klijenta, uključujući paid status
export async function PUT(req: NextRequest) {
  const { id, name, email, phone, paid } = await req.json();
  const { data, error } = await supabaseAdmin
    .from("clients")
    .update({ name, email, phone, paid, updated_at: new Date() })
    .eq("id", id)
    .select()
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// DELETE – obriši klijenta
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const { data, error } = await supabaseAdmin
    .from("clients")
    .delete()
    .eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
