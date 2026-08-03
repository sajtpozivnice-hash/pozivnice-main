"use client";

import { useEffect, useState } from "react";
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
};

const ImagePreviewInput = ({
  preview,
  onChange,
  label = "Slika",
  className,
}: ImagePreviewInputProps) => {
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    setImagePreview(preview ?? "");
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setImagePreview(url);

    onChange?.(file);
  };

  const removeImage = () => {
    setImagePreview("");
    onChange?.(null);
  };

  return (
    <div className={className}>
      <Label className="mb-2 block">{label}</Label>

      <Card className="overflow-hidden">
        <CardContent className="p-2 space-y-2">
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-28 w-full rounded-lg object-cover"
              />

              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute right-1 top-1 h-7 w-7 cursor-pointer"
                onClick={removeImage}
              >
                <X size={14} />
              </Button>
            </div>
          ) : (
            <div className="flex h-28 flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground">
              <ImageIcon size={28} />
              <p className="mt-1 text-xs">Nema izabrane slike</p>
            </div>
          )}

          <Label
            htmlFor="image-upload"
            className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border text-sm hover:bg-muted"
          >
            <Upload size={14} />
            Izaberi sliku
          </Label>

          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImagePreviewInput;
