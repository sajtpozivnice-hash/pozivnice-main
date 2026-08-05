import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

type UploadBody = {
  image?: string;
  fileName?: string;
  resourceType?: "image" | "auto" | "raw";
  /** Optional Cloudinary folder; defaults to wedding for invitation editor assets */
  folder?: string;
};

function resolveFolder(folder?: string): string {
  if (folder && /^[a-z0-9/_-]+$/i.test(folder) && folder.length <= 120) {
    return folder;
  }
  return "wedding";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as UploadBody;
    const { image, fileName, resourceType = "image", folder } = body;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: resolveFolder(folder),
      resource_type: resourceType,
      public_id: fileName
        ? fileName.replace(/\.[^/.]+$/, "").slice(0, 80)
        : undefined,
      width: resourceType === "image" ? 1920 : undefined,
      crop: resourceType === "image" ? "limit" : undefined,
      quality: resourceType === "image" ? "auto" : undefined,
      fetch_format: resourceType === "image" ? "auto" : undefined,
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
