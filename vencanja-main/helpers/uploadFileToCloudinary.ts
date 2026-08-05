export const uploadFileToCloudinary = async (file: File): Promise<string> => {
  const reader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    reader.onloadend = async () => {
      try {
        const res = await fetch("/api/upload-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: reader.result,
            fileName: file.name,
            resourceType: file.type.startsWith("image/") ? "image" : "auto",
          }),
        });

        if (!res.ok) {
          const errorBody = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;
          reject(new Error(errorBody?.error || "Upload failed"));
          return;
        }

        const data = (await res.json()) as { secure_url?: string };
        if (!data.secure_url) {
          reject(new Error("Missing upload URL"));
          return;
        }
        resolve(data.secure_url);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};
