import { TextQuote } from "lucide-react";
import { useDialog } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { InviteTextSection } from "@/types/sections";
import { SectionEditCard } from "./SectionEditCard";
import { SectionPreviewField } from "./SectionPreviewField";

export const InviteTextSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const inviteTextSection = getSection<InviteTextSection>("inviteText");

  if (!inviteTextSection) {
    return null;
  }

  return (
    <SectionEditCard
      title="Tekst pozivnice"
      description="Glavna poruka kojom pozivate goste."
      icon={TextQuote}
      visible={inviteTextSection.visible}
      loading={loading}
      onEdit={() => openModal("invite_text_edit")}
    >
      <SectionPreviewField
        label="Tekst"
        value={inviteTextSection.data.description}
        multiline
      />
    </SectionEditCard>
  );
};
