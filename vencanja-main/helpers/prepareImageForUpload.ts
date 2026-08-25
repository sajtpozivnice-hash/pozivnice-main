/** Keep payloads under Vercel’s ~4.5MB function body limit (base64 expands ~33%). */
const MAX_EDGE = 1920;
const TARGET_DATA_URL_CHARS = 3_200_000;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Slika nije mogla da se učita."));
    };
    img.src = url;
  });
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Failed to read file"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/**
 * Resize + JPEG-compress for API upload. Falls back to raw data URL if canvas fails
 * (e.g. some HEIC files) — caller may still hit size limits.
 */
export async function prepareImageDataUrl(file: File): Promise<{
  dataUrl: string;
  fileName: string;
}> {
  const baseName = file.name.replace(/\.[^/.]+$/, "") || "photo";
  const fileName = `${baseName.slice(0, 60)}.jpg`;

  try {
    const img = await loadImage(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    ctx.drawImage(img, 0, 0, width, height);

    let quality = 0.82;
    let dataUrl = canvas.toDataURL("image/jpeg", quality);
    while (dataUrl.length > TARGET_DATA_URL_CHARS && quality > 0.45) {
      quality -= 0.1;
      dataUrl = canvas.toDataURL("image/jpeg", quality);
    }

    if (dataUrl.length > TARGET_DATA_URL_CHARS) {
      throw new Error("Fotografija je prevelika. Izaberite manju sliku.");
    }

    return { dataUrl, fileName };
  } catch (err) {
    // Non-decodable formats: try original if small enough
    const dataUrl = await readAsDataUrl(file);
    if (dataUrl.length > TARGET_DATA_URL_CHARS) {
      throw err instanceof Error
        ? err
        : new Error("Fotografija je prevelika. Izaberite manju sliku.");
    }
    return { dataUrl, fileName: file.name };
  }
}
