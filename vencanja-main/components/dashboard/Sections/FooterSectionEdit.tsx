import { PanelBottom } from "lucide-react";
import { useDialog } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { FooterSection } from "@/types/sections";
import { SectionEditCard } from "./SectionEditCard";
import { SectionPreviewField } from "./SectionPreviewField";

export const FooterSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const footerSection = getSection<FooterSection>("footer");

  if (!footerSection) {
    return null;
  }

  return (
    <SectionEditCard
      title="Završna poruka"
      description="Završni tekst na dnu pozivnice."
      icon={PanelBottom}
      visible={footerSection.visible}
      loading={loading}
      onEdit={() => openModal("footer_edit")}
    >
      <SectionPreviewField
        label="Poruka"
        value={footerSection.data.title}
        multiline
      />
    </SectionEditCard>
  );
};
