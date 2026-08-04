"use client";

import { FC, useState } from "react";
import ImagePreviewInput from "@/components/dashboard/ImagePreviewInput";
import { uploadImageToCloudinary } from "@/helpers/uploadImageToCloudinary";

type EditorImageProps = {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  allowRemove?: boolean;
};

const EditorImage: FC<EditorImageProps> = ({
  label,
  value,
  onChange,
  allowRemove = true,
}) => {
  const [loading, setLoading] = useState(false);
  const preview = value?.trim() ? value.trim() : "";

  const handleChange = async (file: File | null) => {
    if (!file) {
      onChange("");
      return;
    }

    setLoading(true);

    try {
      const url = await uploadImageToCloudinary(file);
      onChange(url);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImagePreviewInput
      label={label}
      preview={preview}
      onChange={handleChange}
      allowRemove={allowRemove}
      loading={loading}
    />
  );
};

export default EditorImage;
