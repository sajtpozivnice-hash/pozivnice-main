"use client";

import { useMemo, useState } from "react";
import { useProject } from "../context/ProjectContext";
import { OurGallerySection } from "@/types/sections";
import EmptyMessage from "../EmptyMessage";
import SectionLoader from "../loaders/SectionLoader";
import { Button } from "@/components/ui/button";
import { useDialog } from "../context/ModalContext";
import { Images as ImagesIcon, Pencil } from "lucide-react";

const Images = () => {
  const { getSection, loading } = useProject();
  const { openModal } = useDialog();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const gallerySection = getSection<OurGallerySection>("ourGallery");

  const images = useMemo(
    () =>
      (gallerySection?.data.images ?? [])
        .map((image) => image.url?.trim())
        .filter((url): url is string => Boolean(url)),
    [gallerySection],
  );

  if (loading && !gallerySection) {
    return <SectionLoader />;
  }

  if (images.length === 0) {
    return (
      <EmptyMessage
        title="Nema fotografija u galeriji"
        description="Dodajte slike u sekciji „Naša galerija” na pozivnici, pa će se ovde prikazati za brzi pregled."
        icon={ImagesIcon}
        accent="gallery"
        action={
          gallerySection ? (
            <Button
              className="cursor-pointer"
              onClick={() => openModal("our_gallery_edit")}
            >
              <Pencil className="h-4 w-4" />
              Uredi galeriju
            </Button>
          ) : undefined
        }
      />
    );
  }

  return (
    <div className="w-full min-w-0 space-y-4">
      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {images.length} fotografija iz galerije pozivnice.
        </p>
        {gallerySection ? (
          <Button
            variant="outline"
            className="h-9 w-full cursor-pointer sm:w-auto"
            onClick={() => openModal("our_gallery_edit")}
          >
            <Pencil className="h-4 w-4" />
            Uredi galeriju
          </Button>
        ) : null}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {images.map((url) => (
          <button
            key={url}
            type="button"
            className="mb-4 w-full break-inside-avoid overflow-hidden rounded-xl border bg-muted/20 text-left transition-shadow hover:shadow-md"
            onClick={() => setPreviewUrl(url)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt="Fotografija iz galerije"
              className="h-auto w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        ))}
      </div>

      {previewUrl ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreviewUrl(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Pregled fotografije"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Pregled"
            className="max-h-[90vh] max-w-full rounded-lg object-contain"
            referrerPolicy="no-referrer"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Images;
