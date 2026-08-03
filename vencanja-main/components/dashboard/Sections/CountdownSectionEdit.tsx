import { Timer } from "lucide-react";
import { useDialog } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { CountdownSection } from "@/types/sections";
import { SectionEditCard } from "./SectionEditCard";
import { SectionPreviewField } from "./SectionPreviewField";

export const CountdownSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const countdownSection = getSection<CountdownSection>("countdown");

  if (!countdownSection) {
    return null;
  }

  return (
    <SectionEditCard
      title="Odbrojavanje"
      description="Prikaz preostalog vremena do događaja."
      icon={Timer}
      visible={countdownSection.visible}
      loading={loading}
      onEdit={() => openModal("countdown_edit")}
    >
      <SectionPreviewField
        label="Naslov"
        value={countdownSection.data.title}
      />
    </SectionEditCard>
  );
};
