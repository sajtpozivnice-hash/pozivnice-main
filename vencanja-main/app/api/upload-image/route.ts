import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
      });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "wedding",
      width: 1920,
      crop: "limit",
      quality: "auto",
      fetch_format: "auto",
    });

    return new Response(
      JSON.stringify({
        public_id: result.public_id,
        secure_url: result.secure_url,
      }),
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Cloudinary upload error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Upload failed" }),
      { status: 500 },
    );
  }
}
