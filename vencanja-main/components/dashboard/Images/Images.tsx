"use client";

import { useState } from "react";
import { useGuestPhotos } from "../context/GuestPhotosContext";
import EmptyMessage from "../EmptyMessage";
import SectionLoader from "../loaders/SectionLoader";
import { Button } from "@/components/ui/button";
import { cloudinaryThumbnailUrl } from "@/helpers/cloudinaryUrl";
import {
  Download,
  Eye,
  Images as ImagesIcon,
  Loader2,
  Trash2,
} from "lucide-react";
import { GuestPhoto } from "../types";
import SummaryStats from "../shared/SummaryStats";

const formatAddedAt = (iso: string): string => {
  try {
    return new Intl.DateTimeFormat("sr-Latn-RS", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

const Images = () => {
  const { photos, loading, deletePhoto } = useGuestPhotos();
  const [previewPhoto, setPreviewPhoto] = useState<GuestPhoto | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDownload = (url: string, fileName?: string | null) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName || "fotografija.jpg";
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleDelete = async (photo: GuestPhoto) => {
    const confirmed = window.confirm(
      "Da li ste sigurni da želite da obrišete ovu fotografiju gosta?",
    );
    if (!confirmed) return;

    setDeletingId(photo.id);
    try {
      await deletePhoto(photo.id);
      if (previewPhoto?.id === photo.id) {
        setPreviewPhoto(null);
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (loading && photos.length === 0) {
    return <SectionLoader />;
  }

  return (
    <div className="w-full min-w-0 space-y-4">
      <SummaryStats
        items={[
          {
            label: "Fotografije gostiju",
            value: String(photos.length),
            tone: "rose",
          },
        ]}
      />

      {photos.length === 0 ? (
        <EmptyMessage
          title="Još nema fotografija gostiju"
          description="Kada gosti uploaduju slike sa pozivnice, pojaviće se ovde."
          icon={ImagesIcon}
          accent="gallery"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {photos.map((photo) => (
            <article
              key={photo.id}
              className="overflow-hidden rounded-2xl border border-rose-200/60 bg-gradient-to-b from-rose-50/50 via-white to-white shadow-sm"
            >
              <button
                type="button"
                className="block w-full"
                onClick={() => setPreviewPhoto(photo)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cloudinaryThumbnailUrl(photo.secure_url, {
                    width: 640,
                    height: 480,
                  })}
                  alt={photo.guest_name || "Fotografija gosta"}
                  className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </button>
              <div className="space-y-3 p-3">
                <div>
                  <p className="truncate text-sm font-semibold">
                    {photo.guest_name?.trim() || "Anonimni gost"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatAddedAt(photo.created_at)}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 cursor-pointer px-2 text-[11px]"
                    onClick={() => setPreviewPhoto(photo)}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Pregled
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 cursor-pointer px-2 text-[11px]"
                    onClick={() =>
                      handleDownload(photo.secure_url, photo.file_name)
                    }
                  >
                    <Download className="h-3.5 w-3.5" />
                    Preuzmi
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 cursor-pointer px-2 text-[11px] text-destructive hover:bg-destructive/10 hover:text-destructive"
                    disabled={deletingId === photo.id}
                    onClick={() => void handleDelete(photo)}
                  >
                    {deletingId === photo.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                    Obriši
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {previewPhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={() => setPreviewPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Pregled fotografije"
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl space-y-3"
            onClick={(event) => event.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewPhoto.secure_url}
              alt="Pregled"
              className="max-h-[75vh] w-full rounded-xl object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/95 p-3 text-sm">
              <div>
                <p className="font-medium">
                  {previewPhoto.guest_name?.trim() || "Anonimni gost"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatAddedAt(previewPhoto.created_at)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() =>
                    handleDownload(
                      previewPhoto.secure_url,
                      previewPhoto.file_name,
                    )
                  }
                >
                  <Download className="h-4 w-4" />
                  Preuzmi
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => setPreviewPhoto(null)}
                >
                  Zatvori
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Images;
