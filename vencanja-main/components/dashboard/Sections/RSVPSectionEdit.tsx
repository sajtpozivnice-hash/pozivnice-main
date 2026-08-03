import { UserCheck } from "lucide-react";
import { useDialog } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { RSVPSection } from "@/types/sections";
import { SectionEditCard } from "./SectionEditCard";
import { SectionPreviewField } from "./SectionPreviewField";

export const RSVPSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const rsvpSection = getSection<RSVPSection>("rsvp");

  if (!rsvpSection) {
    return null;
  }

  return (
    <SectionEditCard
      title="Potvrda dolaska"
      description="Tekst kojim pozivate goste da potvrde prisustvo."
      icon={UserCheck}
      visible={rsvpSection.visible}
      loading={loading}
      onEdit={() => openModal("rsvp_edit")}
    >
      <SectionPreviewField label="Naslov" value={rsvpSection.data.title} />
      <SectionPreviewField
        label="Opis"
        value={rsvpSection.data.description}
        multiline
      />
    </SectionEditCard>
  );
};
