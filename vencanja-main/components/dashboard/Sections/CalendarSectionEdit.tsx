import { CalendarDays } from "lucide-react";
import { useDialog } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { CalendarSection } from "@/types/sections";
import { SectionEditCard } from "./SectionEditCard";
import { SectionPreviewField } from "./SectionPreviewField";

export const CalendarSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const calendarSection = getSection<CalendarSection>("calendar");

  if (!calendarSection) {
    return null;
  }

  return (
    <SectionEditCard
      title="Kalendar"
      description="Istaknite datum i podsetite goste da sačuvaju dan."
      icon={CalendarDays}
      visible={calendarSection.visible}
      loading={loading}
      onEdit={() => openModal("calendar_edit")}
    >
      <SectionPreviewField label="Naslov" value={calendarSection.data.title} />
    </SectionEditCard>
  );
};
