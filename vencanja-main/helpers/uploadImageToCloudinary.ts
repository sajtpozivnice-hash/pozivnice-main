import { isDemoMode } from "@/lib/demo/mode";
import { prepareImageDataUrl } from "@/helpers/prepareImageForUpload";

export type CloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
  bytes?: number;
  format?: string;
};

export type UploadImagePurpose = "editor" | "budget" | "guest-photo";

type UploadImageOptions = {
  fileName?: string;
  folder?: string;
  purpose?: UploadImagePurpose;
  projectId?: string;
};

const demoUploadImage = async (
  file: File,
  options: UploadImageOptions = {},
): Promise<CloudinaryUploadResult> => {
  const { dataUrl } = await prepareImageDataUrl(file);
  return {
    public_id: `demo/${Date.now()}-${options.fileName ?? file.name}`,
    secure_url: dataUrl,
    width: undefined,
    height: undefined,
    bytes: file.size,
    format: "jpg",
  };
};

export const uploadImageToCloudinaryDetailed = async (
  file: File,
  options: UploadImageOptions = {},
): Promise<CloudinaryUploadResult> => {
  if (isDemoMode()) return demoUploadImage(file, options);

  const purpose = options.purpose ?? "editor";
  const prepared = await prepareImageDataUrl(file);

  const res = await fetch("/api/upload-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({
      image: prepared.dataUrl,
      fileName: options.fileName ?? prepared.fileName,
      resourceType: "image",
      folder: options.folder,
      purpose,
      projectId: options.projectId,
    }),
  });

  if (!res.ok) {
    const errorBody = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(errorBody?.error || "Upload failed");
  }

  const data = (await res.json()) as Partial<CloudinaryUploadResult>;
  if (!data.secure_url || !data.public_id) {
    throw new Error("Missing upload result");
  }

  return {
    public_id: data.public_id,
    secure_url: data.secure_url,
    width: data.width,
    height: data.height,
    bytes: data.bytes,
    format: data.format,
  };
};

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const result = await uploadImageToCloudinaryDetailed(file, {
    purpose: "editor",
  });
  return result.secure_url;
};
