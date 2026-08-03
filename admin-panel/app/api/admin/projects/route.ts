import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin.from("projects").select("*");
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { client_id, client_name, config_json, subdomain, title } =
    await req.json();

  if (!client_id || !client_name || !config_json) {
    return NextResponse.json(
      { error: "Client, client_name and config_json are required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseAdmin
    .from("projects")
    .insert([{ client_id, client_name, config_json, subdomain, title }])
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const { id, client_name, config_json, subdomain, title } = await req.json();

  const { data, error } = await supabaseAdmin
    .from("projects")
    .update({
      client_name,
      config_json,
      subdomain,
      title,
      updated_at: new Date(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}

// DELETE – obriši projekat
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const { data, error } = await supabaseAdmin
    .from("projects")
    .delete()
    .eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
