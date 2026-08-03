import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const { project_id, name, email, rsvp_status, table_id, message, notes } =
//       body;

//     if (!project_id || !name || !rsvp_status) {
//       return NextResponse.json(
//         { error: "project_id, name i rsvp_status su obavezni." },
//         { status: 400 },
//       );
//     }

//     const { data, error } = await supabase
//       .from("guests")
//       .insert({
//         project_id,
//         name,
//         email,
//         rsvp_status,
//         table_id,
//         message,
//         notes,
//       })
//       .select()
//       .single();

//     if (error) throw error;

//     return NextResponse.json(data);
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
// GET /api/guests?project_id=123
// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);

//   const projectId = searchParams.get("project_id");

//   if (!projectId) {
//     return NextResponse.json(
//       { error: "project_id je obavezan." },
//       { status: 400 },
//     );
//   }

//   const { data, error } = await supabase
//     .from("guests")
//     .select("*")
//     .eq("project_id", projectId)
//     .order("created_at", { ascending: false });

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   return NextResponse.json(data);
// }
