import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin.from("guests").select("*");
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { project_id, name, email, rsvp_status, seat } = await req.json();
  const { data, error } = await supabaseAdmin
    .from("guests")
    .insert([{ project_id, name, email, rsvp_status, seat }])
    .select()
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const { id, name, email, rsvp_status, seat } = await req.json();
  const { data, error } = await supabaseAdmin
    .from("guests")
    .update({ name, email, rsvp_status, seat, updated_at: new Date() })
    .eq("id", id)
    .select()
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const { data, error } = await supabaseAdmin
    .from("guests")
    .delete()
    .eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
