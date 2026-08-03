export const uploadImageToCloudinary = async (file: File) => {
  const reader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    reader.onloadend = async () => {
      try {
        const res = await fetch("/api/upload-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: reader.result }),
        });

        const data = await res.json();
        resolve(data.secure_url);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsDataURL(file);
  });
};
