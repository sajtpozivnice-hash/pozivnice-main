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

type UploadPurpose = "editor" | "budget" | "guest-photo";

type UploadBody = {
  image?: string;
  fileName?: string;
  resourceType?: "image" | "auto" | "raw";
  folder?: string;
  purpose?: UploadPurpose;
  projectId?: string;
};

function resolveOwnerFolder(folder?: string): string {
  if (folder && /^[a-z0-9/_-]+$/i.test(folder) && folder.length <= 120) {
    return folder;
  }
  return "wedding";
}

function isDataUrl(value: string): boolean {
  return /^data:[a-z0-9.+-]+\/[a-z0-9.+-]+;base64,/i.test(value);
}

async function requireAuthenticatedUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

async function assertGuestPhotoAllowed(projectId: string): Promise<
  { ok: true } | { ok: false; status: number; error: string }
> {
  const admin = createAdminClient();
  const db = admin ?? (await createClient());

  const { data: project, error } = await db
    .from("projects")
    .select("id, published, client_id")
    .eq("id", projectId)
    .maybeSingle();

  if (error || !project) {
    return { ok: false, status: 404, error: "Pozivnica nije pronađena." };
  }

  if (project.published) return { ok: true };

  // Unpublished: only project owner may upload (preview).
  const user = await requireAuthenticatedUser();
  if (!user || !admin) {
    return { ok: false, status: 403, error: "Pozivnica nije objavljena." };
  }

  const { data: client } = await admin
    .from("clients")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (!client || client.id !== project.client_id) {
    return { ok: false, status: 403, error: "Pozivnica nije objavljena." };
  }

  return { ok: true };
}

export async function POST(req: Request) {
  try {
    if (!isAllowedBrowserOrigin(req)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const ip = getClientIp(req);
    const userEarly = await requireAuthenticatedUser();
    const uploadLimit = userEarly ? 60 : 20;
    if (!consumeRateLimit(`upload:${ip}`, uploadLimit, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Previše upload zahteva. Pokušajte kasnije." },
        { status: 429 },
      );
    }

    const body = (await req.json()) as UploadBody;
    const {
      image,
      fileName,
      resourceType = "image",
      folder,
      purpose = "editor",
      projectId,
    } = body;

    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (image.length > MAX_UPLOAD_DATA_URL_CHARS) {
      return NextResponse.json(
        { error: "Fajl je prevelik. Pokušajte sa manjom slikom." },
        { status: 413 },
      );
    }

    if (!isDataUrl(image)) {
      return NextResponse.json(
        { error: "Neispravan format fajla." },
        { status: 400 },
      );
    }

    let cloudFolder: string;
    let resolvedResourceType: "image" | "auto" | "raw" = resourceType;

    if (purpose === "guest-photo") {
      const pid = projectId?.trim();
      if (!pid) {
        return NextResponse.json(
          { error: "Nedostaje projectId." },
          { status: 400 },
        );
      }

      const allowed = await assertGuestPhotoAllowed(pid);
      if (!allowed.ok) {
        return NextResponse.json(
          { error: allowed.error },
          { status: allowed.status },
        );
      }

      if (!image.startsWith("data:image/")) {
        return NextResponse.json(
          { error: "Dozvoljene su samo slike." },
          { status: 400 },
        );
      }

      // Force folder — never trust client-supplied path for public uploads
      cloudFolder = `guest-photos/${pid}`;
      resolvedResourceType = "image";
    } else if (purpose === "editor") {
      // Public /editor/{template} must work without login (marketing try-before-buy).
      // Logged-in owners may use a custom folder; anonymous is forced into template-preview.
      if (!image.startsWith("data:image/")) {
        return NextResponse.json(
          { error: "Dozvoljene su samo slike." },
          { status: 400 },
        );
      }

      resolvedResourceType = "image";
      cloudFolder = userEarly
        ? resolveOwnerFolder(folder)
        : "template-preview";
    } else if (purpose === "budget") {
      if (!userEarly) {
        return NextResponse.json(
          { error: "Morate biti prijavljeni." },
          { status: 401 },
        );
      }

      cloudFolder =
        folder && /^budget\/[a-z0-9/_-]+$/i.test(folder) ? folder : "budget";
    } else {
      return NextResponse.json({ error: "Nepoznat purpose." }, { status: 400 });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: cloudFolder,
      resource_type: resolvedResourceType,
      public_id: fileName
        ? fileName.replace(/\.[^/.]+$/, "").slice(0, 80)
        : undefined,
      width: resolvedResourceType === "image" ? 1920 : undefined,
      crop: resolvedResourceType === "image" ? "limit" : undefined,
      quality: resolvedResourceType === "image" ? "auto" : undefined,
      fetch_format: resolvedResourceType === "image" ? "auto" : undefined,
    });

    return NextResponse.json({
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width ?? null,
      height: result.height ?? null,
      bytes: result.bytes ?? null,
      format: result.format ?? null,
    });
  } catch (err: unknown) {
    console.error("Cloudinary upload error:", err);
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
