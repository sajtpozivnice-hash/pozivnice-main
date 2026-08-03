import { Images } from "lucide-react";
import { useDialog } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { OurGallerySection } from "@/types/sections";
import { SectionEditCard } from "./SectionEditCard";
import { SectionPreviewField } from "./SectionPreviewField";
import { SectionItemsPreview } from "./SectionItemsPreview";

export const OurGallerySectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const ourGallerySection = getSection<OurGallerySection>("ourGallery");

  if (!ourGallerySection) {
    return null;
  }

  const images = ourGallerySection.data.images ?? [];

  return (
    <SectionEditCard
      title="Galerija"
      description="Kolekcija fotografija koje žele da vide gosti."
      icon={Images}
      visible={ourGallerySection.visible}
      loading={loading}
      onEdit={() => openModal("our_gallery_edit")}
    >
      <SectionPreviewField
        label="Naslov"
        value={ourGallerySection.data.title}
      />
      <SectionPreviewField
        label="Opis"
        value={ourGallerySection.data.description}
        multiline
      />
      <SectionItemsPreview
        label="Slike"
        count={images.length}
        emptyTitle="Nema slika"
        emptyDescription="Dodajte URL-ove fotografija u uređivaču."
      >
        <div className="grid grid-cols-3 gap-2">
          {images.slice(0, 3).map((image, index) => (
            <div
              key={`${image.url}-${index}`}
              className="aspect-square overflow-hidden rounded-lg border bg-muted"
            >
              {image.url ? (
                <img
                  src={image.url}
                  alt={`Galerija ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                  Prazno
                </div>
              )}
            </div>
          ))}
        </div>
        {images.length > 3 ? (
          <p className="text-xs text-muted-foreground">
            + još {images.length - 3} slika
          </p>
        ) : null}
      </SectionItemsPreview>
    </SectionEditCard>
  );
};
