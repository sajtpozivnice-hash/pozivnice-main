import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { mapAttendanceToRsvpStatus } from "@/components/dashboard/utils/guestParty";

type Body = {
  projectId?: string;
  fullName?: string;
  email?: string;
  guestsCount?: number;
  message?: string;
  attendance?: "yes" | "no" | "maybe";
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const projectId = body.projectId?.trim();
    const fullName = body.fullName?.trim();
    const attendance = body.attendance ?? "yes";
    const partySize = Math.min(
      Math.max(Math.floor(Number(body.guestsCount) || 1), 1),
      50,
    );

    if (!projectId) {
      return NextResponse.json(
        { error: "Nedostaje projectId." },
        { status: 400 },
      );
    }

    if (!fullName) {
      return NextResponse.json(
        { error: "Ime i prezime su obavezni." },
        { status: 400 },
      );
    }

    if (!["yes", "no", "maybe"].includes(attendance)) {
      return NextResponse.json(
        { error: "Neispravan status dolaska." },
        { status: 400 },
      );
    }

    const admin = createAdminClient();
    const db = admin ?? (await createClient());

    const { data: project, error: projectError } = await db
      .from("projects")
      .select("id, published, client_id")
      .eq("id", projectId)
      .maybeSingle();

    if (projectError || !project) {
      return NextResponse.json(
        { error: "Pozivnica nije pronađena." },
        { status: 404 },
      );
    }

    if (!project.published && !admin) {
      // Without service role, only rely on RLS owner path via authenticated client.
      const userClient = await createClient();
      const { data: auth } = await userClient.auth.getUser();
      if (!auth.user) {
        return NextResponse.json(
          { error: "Pozivnica nije objavljena." },
          { status: 403 },
        );
      }
    }

    if (!project.published && admin) {
      // Allow owner preview: verify ownership when unpublished.
      const userClient = await createClient();
      const { data: auth } = await userClient.auth.getUser();
      if (auth.user) {
        const { data: client } = await admin
          .from("clients")
          .select("id")
          .eq("auth_user_id", auth.user.id)
          .maybeSingle();
        if (!client || client.id !== project.client_id) {
          return NextResponse.json(
            { error: "Pozivnica nije objavljena." },
            { status: 403 },
          );
        }
      } else {
        return NextResponse.json(
          { error: "Pozivnica nije objavljena." },
          { status: 403 },
        );
      }
    }

    const status = mapAttendanceToRsvpStatus(attendance);
    const message = body.message?.trim() || null;
    const email = body.email?.trim() || null;
    const writer = admin ?? db;

    const { data: contact, error: contactError } = await writer
      .from("guests")
      .insert({
        project_id: projectId,
        name: fullName,
        email,
        message,
        notes: null,
        rsvp_status: status,
        table_id: null,
        party_size: partySize,
        is_child: false,
        age: null,
        parent_guest_id: null,
        name_pending: false,
      })
      .select("id")
      .single();

    if (contactError || !contact) {
      console.error("RSVP contact insert failed:", contactError);
      return NextResponse.json(
        { error: "RSVP nije sačuvan. Pokušajte ponovo." },
        { status: 500 },
      );
    }

    if (partySize > 1) {
      const companions = Array.from({ length: partySize - 1 }, () => ({
        project_id: projectId,
        name: "",
        email: null,
        message: null,
        notes: null,
        rsvp_status: status,
        table_id: null,
        party_size: 1,
        is_child: false,
        age: null,
        parent_guest_id: contact.id,
        name_pending: true,
      }));

      const { error: companionsError } = await writer
        .from("guests")
        .insert(companions);

      if (companionsError) {
        console.error("RSVP companions insert failed:", companionsError);
        await writer.from("guests").delete().eq("id", contact.id);
        return NextResponse.json(
          { error: "RSVP nije sačuvan. Pokušajte ponovo." },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({
      success: true,
      contactId: contact.id,
      partySize,
    });
  } catch (error: unknown) {
    console.error("RSVP API ERROR:", error);
    return NextResponse.json(
      { error: "Došlo je do greške na serveru." },
      { status: 500 },
    );
  }
}
