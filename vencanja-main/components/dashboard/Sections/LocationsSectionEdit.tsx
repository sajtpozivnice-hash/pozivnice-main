import { MapPinned } from "lucide-react";
import { useDialog } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { LocationsSection } from "@/types/sections";
import { SectionEditCard } from "./SectionEditCard";
import { SectionPreviewField } from "./SectionPreviewField";
import { SectionItemsPreview } from "./SectionItemsPreview";

export const LocationsSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const locationsSection = getSection<LocationsSection>("locations");

  if (!locationsSection) {
    return null;
  }

  const cards = locationsSection.data.cards ?? [];
  const editModalHandler = () => openModal("locations_edit");

  return (
    <SectionEditCard
      title="Lokacije"
      description="Adrese i detalji važnih mesta tokom dana."
      icon={MapPinned}
      visible={locationsSection.visible}
      loading={loading}
      onEdit={editModalHandler}
    >
      <SectionPreviewField label="Naslov" value={locationsSection.data.title} />
      <SectionPreviewField
        label="Podnaslov"
        value={locationsSection.data.subtitle}
      />
      <SectionItemsPreview
        label="Kartice lokacija"
        count={cards.length}
        emptyTitle="Nema dodatih lokacija"
        emptyDescription="Dodajte kartice sa adresama i vremenima u uređivaču."
      >
        {cards.slice(0, 3).map((card) => (
          <div
            key={card.id}
            className="rounded-xl border bg-muted/30 px-3 py-2"
          >
            <p className="truncate text-sm font-medium">
              {card.title || "Bez naslova"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {[card.time, card.location].filter(Boolean).join(" · ") ||
                "Nema detalja"}
            </p>
          </div>
        ))}
        {cards.length > 3 ? (
          <p className="text-xs text-muted-foreground">
            + još {cards.length - 3} lokacija
          </p>
        ) : null}
      </SectionItemsPreview>
    </SectionEditCard>
  );
};
