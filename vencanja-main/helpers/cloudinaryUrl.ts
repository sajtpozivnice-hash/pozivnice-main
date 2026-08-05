/**
 * Build a Cloudinary delivery URL with transforms for thumbnails.
 * Falls back to the original URL when the input is not a Cloudinary upload URL.
 */
export const cloudinaryThumbnailUrl = (
  url: string,
  options: { width?: number; height?: number; crop?: "fill" | "limit" } = {},
): string => {
  const width = options.width ?? 480;
  const height = options.height;
  const crop = options.crop ?? "fill";

  const marker = "/image/upload/";
  const index = url.indexOf(marker);
  if (index === -1) return url;

  const transforms = [
    `c_${crop}`,
    `w_${width}`,
    height ? `h_${height}` : null,
    "q_auto",
    "f_auto",
  ]
    .filter(Boolean)
    .join(",");

  return `${url.slice(0, index + marker.length)}${transforms}/${url.slice(index + marker.length)}`;
};

export const formatFileBytes = (bytes: number | null | undefined): string => {
  if (bytes == null || Number.isNaN(bytes) || bytes < 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const formatImageDimensions = (
  width: number | null | undefined,
  height: number | null | undefined,
): string => {
  if (!width || !height) return "—";
  return `${width} × ${height}`;
};
