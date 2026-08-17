"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";

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
  const [imageLoading, setImageLoading] = useState(false);

  const configPreview = preview?.trim() ? preview.trim() : "";
  const displaySrc = localObjectUrl ?? configPreview;
  const busy = loading || imageLoading;

  const clearLocalObjectUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setLocalObjectUrl(null);
  };

  useEffect(() => {
    clearLocalObjectUrl();
    if (preview?.trim()) {
      setImageLoading(true);
    } else {
      setImageLoading(false);
    }
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
    setImageLoading(true);

    onChange?.(file);
    e.target.value = "";
  };

  const removeImage = () => {
    clearLocalObjectUrl();
    setImageLoading(false);
    onChange?.(null);
  };

  return (
    <div className={className}>
      <Label className="mb-2 block">{label}</Label>

      <Card className="overflow-hidden">
        <CardContent className="space-y-2 p-2">
          {displaySrc ? (
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/40">
              <img
                key={displaySrc}
                src={displaySrc}
                alt="Preview"
                className={`h-full w-full object-cover transition-opacity ${
                  busy ? "opacity-40" : "opacity-100"
                }`}
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
                ref={(img) => {
                  if (img?.complete) setImageLoading(false);
                }}
              />

              {busy ? (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black/25 backdrop-blur-[1px]">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                  <span className="text-xs font-medium text-white">
                    {loading ? "Upload u toku…" : "Učitavanje…"}
                  </span>
                </div>
              ) : null}

              {allowRemove && !busy ? (
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute right-1 top-1 z-20 h-7 w-7 cursor-pointer"
                  onClick={removeImage}
                >
                  <X size={14} />
                </Button>
              ) : null}
            </div>
          ) : (
            <div className="relative flex aspect-square flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground">
              {loading ? (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-background/80">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="text-xs font-medium">Upload u toku…</span>
                </div>
              ) : (
                <>
                  <ImageIcon size={28} />
                  <p className="mt-1 text-xs">Nema izabrane slike</p>
                </>
              )}
            </div>
          )}

          <Label
            htmlFor={inputId}
            className={`flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border text-sm hover:bg-muted ${
              busy ? "pointer-events-none opacity-60" : ""
            }`}
          >
            {busy ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Upload size={14} />
            )}
            {loading
              ? "Upload u toku…"
              : imageLoading
                ? "Učitavanje…"
                : displaySrc
                  ? "Zameni sliku"
                  : "Izaberi sliku"}
          </Label>

          <Input
            id={inputId}
            type="file"
            accept="image/*"
            className="hidden"
            disabled={busy}
            onChange={handleFileChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImagePreviewInput;
