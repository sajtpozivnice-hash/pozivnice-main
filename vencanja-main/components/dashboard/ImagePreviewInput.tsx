"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ImageIcon, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type ImagePreviewInputProps = {
  preview?: string;
  onChange?: (file: File | null) => void;
  label?: string;
  className?: string;
  allowRemove?: boolean;
  loading?: boolean;
};

const ImagePreviewInput = ({
  preview,
  onChange,
  label = "Slika",
  className,
  allowRemove = true,
  loading = false,
}: ImagePreviewInputProps) => {
  const inputId = useId();
  const objectUrlRef = useRef<string | null>(null);
  const [localObjectUrl, setLocalObjectUrl] = useState<string | null>(null);

  const configPreview = preview?.trim() ? preview.trim() : "";
  // Config URL is controlled; local blob only while a new file is uploading
  const displaySrc = localObjectUrl ?? configPreview;

  const clearLocalObjectUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setLocalObjectUrl(null);
  };

  useEffect(() => {
    // Parent config value changed (initial open or Cloudinary URL saved)
    clearLocalObjectUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync only when preview prop changes
  }, [preview]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setLocalObjectUrl(url);

    onChange?.(file);
    e.target.value = "";
  };

  const removeImage = () => {
    clearLocalObjectUrl();
    onChange?.(null);
  };

  return (
    <div className={className}>
      <Label className="mb-2 block">{label}</Label>

      <Card className="overflow-hidden">
        <CardContent className="space-y-2 p-2">
          {displaySrc ? (
            <div className="relative">
              <img
                src={displaySrc}
                alt="Preview"
                className={`h-28 w-full rounded-lg object-cover ${
                  loading ? "opacity-60" : ""
                }`}
                referrerPolicy="no-referrer"
              />

              {allowRemove && !loading ? (
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute right-1 top-1 h-7 w-7 cursor-pointer"
                  onClick={removeImage}
                >
                  <X size={14} />
                </Button>
              ) : null}
            </div>
          ) : (
            <div className="flex h-28 flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground">
              <ImageIcon size={28} />
              <p className="mt-1 text-xs">Nema izabrane slike</p>
            </div>
          )}

          <Label
            htmlFor={inputId}
            className={`flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border text-sm hover:bg-muted ${
              loading ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <Upload size={14} />
            {loading
              ? "Upload u toku..."
              : displaySrc
                ? "Zameni sliku"
                : "Izaberi sliku"}
          </Label>

          <Input
            id={inputId}
            type="file"
            accept="image/*"
            className="hidden"
            disabled={loading}
            onChange={handleFileChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImagePreviewInput;
