import { ClipboardList } from "lucide-react";
import { useDialog } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { ScheduleSection } from "@/types/sections";
import { SectionEditCard } from "./SectionEditCard";
import { SectionPreviewField } from "./SectionPreviewField";
import { SectionItemsPreview } from "./SectionItemsPreview";

export const ScheduleSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const scheduleSection = getSection<ScheduleSection>("schedule");

  if (!scheduleSection) {
    return null;
  }

  const items = scheduleSection.data.items ?? [];

  return (
    <SectionEditCard
      title="Raspored"
      description="Vremenska linija događaja tokom dana."
      icon={ClipboardList}
      visible={scheduleSection.visible}
      loading={loading}
      onEdit={() => openModal("schedule_edit")}
    >
      <SectionPreviewField label="Naslov" value={scheduleSection.data.title} />
      <SectionPreviewField
        label="Podnaslov"
        value={scheduleSection.data.subtitle}
      />
      <SectionItemsPreview
        label="Stavke rasporeda"
        count={items.length}
        emptyTitle="Nema stavki"
        emptyDescription="Dodajte vremena i događaje u uređivaču."
      >
        {items.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="rounded-xl border bg-muted/30 px-3 py-2"
          >
            <p className="truncate text-sm font-medium">
              {item.title || "Bez naslova"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {[item.time, item.description].filter(Boolean).join(" · ") ||
                "Nema detalja"}
            </p>
          </div>
        ))}
        {items.length > 3 ? (
          <p className="text-xs text-muted-foreground">
            + još {items.length - 3} stavki
          </p>
        ) : null}
      </SectionItemsPreview>
    </SectionEditCard>
  );
};
