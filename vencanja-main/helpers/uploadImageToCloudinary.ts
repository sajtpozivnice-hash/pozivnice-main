import { isDemoMode } from "@/lib/demo/mode";

export type CloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
  bytes?: number;
  format?: string;
};

type UploadImageOptions = {
  fileName?: string;
  folder?: string;
};

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Failed to read file"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

const demoUploadImage = async (
  file: File,
  options: UploadImageOptions = {},
): Promise<CloudinaryUploadResult> => {
  const secure_url = await readFileAsDataUrl(file);
  return {
    public_id: `demo/${Date.now()}-${options.fileName ?? file.name}`,
    secure_url,
    width: undefined,
    height: undefined,
    bytes: file.size,
    format: file.type.split("/")[1] || "jpg",
  };
};

export const uploadImageToCloudinaryDetailed = async (
  file: File,
  options: UploadImageOptions = {},
): Promise<CloudinaryUploadResult> => {
  if (isDemoMode()) return demoUploadImage(file, options);

  const reader = new FileReader();

  return new Promise<CloudinaryUploadResult>((resolve, reject) => {
    reader.onloadend = async () => {
      try {
        const res = await fetch("/api/upload-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: reader.result,
            fileName: options.fileName ?? file.name,
            resourceType: "image",
            folder: options.folder,
          }),
        });

        if (!res.ok) {
          const errorBody = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;
          reject(new Error(errorBody?.error || "Upload failed"));
          return;
        }

        const data = (await res.json()) as Partial<CloudinaryUploadResult>;
        if (!data.secure_url || !data.public_id) {
          reject(new Error("Missing upload result"));
          return;
        }

        resolve({
          public_id: data.public_id,
          secure_url: data.secure_url,
          width: data.width,
          height: data.height,
          bytes: data.bytes,
          format: data.format,
        });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const result = await uploadImageToCloudinaryDetailed(file);
  return result.secure_url;
};
