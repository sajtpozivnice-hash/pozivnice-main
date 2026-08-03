import { Upload } from "lucide-react";
import { useDialog } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { UploadImagesSection } from "@/types/sections";
import { SectionEditCard } from "./SectionEditCard";
import { SectionPreviewField } from "./SectionPreviewField";

export const ImageUploadSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const imageUploadSection = getSection<UploadImagesSection>(
    "uploadImagesSection",
  );

  if (!imageUploadSection) {
    return null;
  }

  return (
    <SectionEditCard
      title="Dodavanje slika"
      description="Pozovite goste da podele svoje fotografije."
      icon={Upload}
      visible={imageUploadSection.visible}
      loading={loading}
      onEdit={() => openModal("upload_image_edit")}
    >
      <SectionPreviewField
        label="Naslov"
        value={imageUploadSection.data.title}
      />
      <SectionPreviewField
        label="Podnaslov"
        value={imageUploadSection.data.subtitle}
      />
      <SectionPreviewField
        label="Opis"
        value={imageUploadSection.data.description}
        multiline
      />
    </SectionEditCard>
  );
};
