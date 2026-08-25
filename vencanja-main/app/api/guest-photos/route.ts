import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import {
  consumeRateLimit,
  getClientIp,
  isAllowedBrowserOrigin,
  MAX_UPLOAD_DATA_URL_CHARS,
} from "@/lib/api/security";

type Body = {
  image?: string;
  projectId?: string;
  fileName?: string;
  guestName?: string | null;
};

function isDataUrl(value: string): boolean {
  return /^data:image\/[a-z0-9.+-]+;base64,/i.test(value);
}

async function assertProjectAllowsGuestPhoto(projectId: string): Promise<
  { ok: true } | { ok: false; status: number; error: string }
> {
  const admin = createAdminClient();
  if (!admin) {
    return {
      ok: false,
      status: 503,
      error: "Upload nije konfigurisan (nedostaje SUPABASE_SERVICE_ROLE_KEY).",
    };
  }

  const { data: project, error } = await admin
    .from("projects")
    .select("id, published, client_id")
    .eq("id", projectId)
    .maybeSingle();

  if (error) {
    console.error("GUEST PHOTO project lookup:", error);
    return { ok: false, status: 500, error: "Greška pri proveri pozivnice." };
  }

  if (!project) {
    return { ok: false, status: 404, error: "Pozivnica nije pronađena." };
  }

  if (project.published) return { ok: true };

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return { ok: false, status: 403, error: "Pozivnica nije objavljena." };
  }

  const { data: client } = await admin
    .from("clients")
    .select("id")
    .eq("auth_user_id", auth.user.id)
    .maybeSingle();

  if (!client || client.id !== project.client_id) {
    return { ok: false, status: 403, error: "Pozivnica nije objavljena." };
  }

  return { ok: true };
}

export async function POST(req: Request) {
  try {
    if (!isAllowedBrowserOrigin(req)) {
      return NextResponse.json(
        { error: "Zabranjen origin (proveri NEXT_PUBLIC_ROOT_DOMAIN)." },
        { status: 403 },
      );
    }

    const ip = getClientIp(req);
    if (!consumeRateLimit(`guest-photo:${ip}`, 20, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Previše upload zahteva. Pokušajte kasnije." },
        { status: 429 },
      );
    }

    const body = (await req.json()) as Body;
    const projectId = body.projectId?.trim();
    const image = body.image;
    const guestName = body.guestName?.trim() || null;
    const fileName = body.fileName?.trim() || "photo.jpg";

    if (!projectId) {
      return NextResponse.json(
        { error: "Nedostaje projectId." },
        { status: 400 },
      );
    }

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { error: "Nedostaje slika." },
        { status: 400 },
      );
    }

    if (!isDataUrl(image)) {
      return NextResponse.json(
        { error: "Neispravan format slike." },
        { status: 400 },
      );
    }

    if (image.length > MAX_UPLOAD_DATA_URL_CHARS) {
      return NextResponse.json(
        { error: "Fotografija je prevelika. Izaberite manju sliku." },
        { status: 413 },
      );
    }

    const allowed = await assertProjectAllowsGuestPhoto(projectId);
    if (!allowed.ok) {
      return NextResponse.json(
        { error: allowed.error },
        { status: allowed.status },
      );
    }

    if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_KEY) {
      return NextResponse.json(
        { error: "Cloudinary nije konfigurisan na serveru." },
        { status: 503 },
      );
    }

    let upload;
    try {
      upload = await cloudinary.uploader.upload(image, {
        folder: `guest-photos/${projectId}`,
        resource_type: "image",
        public_id: fileName.replace(/\.[^/.]+$/, "").slice(0, 80) || undefined,
        width: 1920,
        crop: "limit",
        quality: "auto",
        fetch_format: "auto",
      });
    } catch (err) {
      console.error("GUEST PHOTO cloudinary:", err);
      const message =
        err instanceof Error ? err.message : "Cloudinary upload nije uspeo.";
      return NextResponse.json({ error: message }, { status: 500 });
    }

    const admin = createAdminClient();
    if (!admin) {
      return NextResponse.json(
        { error: "Upload nije konfigurisan (nedostaje SUPABASE_SERVICE_ROLE_KEY)." },
        { status: 503 },
      );
    }

    const { data, error } = await admin
      .from("guest_photos")
      .insert({
        project_id: projectId,
        public_id: upload.public_id,
        secure_url: upload.secure_url,
        file_name: fileName,
        guest_name: guestName,
        width: upload.width ?? null,
        height: upload.height ?? null,
        bytes: upload.bytes ?? null,
        format: upload.format ?? null,
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error("GUEST PHOTO insert:", error);
      return NextResponse.json(
        {
          error:
            error?.message ||
            "Fotografija nije sačuvana u bazi. Proveri guest_photos migraciju.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error: unknown) {
    console.error("GUEST PHOTO API ERROR:", error);
    const message =
      error instanceof Error ? error.message : "Došlo je do greške na serveru.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
