// import { NextResponse } from "next/server";
// import { supabase } from "@/lib/client";

// export async function PATCH(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;

//     const body = await req.json();

//     const { data, error } = await supabase
//       .from("guests")
//       .update(body)
//       .eq("id", id)
//       .select()
//       .single();

//     if (error) throw error;

//     return NextResponse.json(data);
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// export async function DELETE(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;

//     const { error } = await supabase.from("guests").delete().eq("id", id);

//     if (error) throw error;

//     return NextResponse.json({
//       success: true,
//     });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   const { id } = await params;

//   const { data, error } = await supabase
//     .from("guests")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 404 });
//   }

//   return NextResponse.json(data);
// }
