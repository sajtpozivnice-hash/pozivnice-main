import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      image?: string;
      fileName?: string;
      resourceType?: "image" | "auto" | "raw";
    };

    const { image, fileName, resourceType = "image" } = body;

    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
      });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "wedding",
      resource_type: resourceType,
      public_id: fileName
        ? fileName.replace(/\.[^/.]+$/, "").slice(0, 80)
        : undefined,
      width: resourceType === "image" ? 1920 : undefined,
      crop: resourceType === "image" ? "limit" : undefined,
      quality: resourceType === "image" ? "auto" : undefined,
      fetch_format: resourceType === "image" ? "auto" : undefined,
    });

    return new Response(
      JSON.stringify({
        public_id: result.public_id,
        secure_url: result.secure_url,
      }),
      { status: 200 },
    );
  } catch (err: unknown) {
    console.error("Cloudinary upload error:", err);
    const message = err instanceof Error ? err.message : "Upload failed";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
}
