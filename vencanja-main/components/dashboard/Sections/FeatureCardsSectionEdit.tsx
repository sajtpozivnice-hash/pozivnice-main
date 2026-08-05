import { LayoutGrid } from "lucide-react";
import { useDialog } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { FeatureCardsSection } from "@/types/sections";
import { SectionEditCard } from "./SectionEditCard";
import { SectionPreviewField } from "./SectionPreviewField";
import { SectionItemsPreview } from "./SectionItemsPreview";

export const FeatureCardsSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const section = getSection<FeatureCardsSection>("featureCards");

  if (!section) {
    return null;
  }

  const cards = section.data.cards ?? [];

  return (
    <SectionEditCard
      title={section.name || "Informacije"}
      description="Kartice sa korisnim napomenama za goste."
      icon={LayoutGrid}
      visible={section.visible}
      loading={loading}
      onEdit={() => openModal("feature_cards_edit")}
    >
      <SectionPreviewField label="Naslov" value={section.data.title} />
      <SectionPreviewField label="Podnaslov" value={section.data.subtitle} />
      <SectionItemsPreview
        label="Kartice"
        count={cards.length}
        emptyTitle="Nema kartica"
        emptyDescription="Dodajte kartice u uređivaču sekcije."
      >
        {cards.slice(0, 4).map((card) => (
          <div
            key={card.id}
            className="rounded-xl border bg-muted/30 px-3 py-2"
          >
            <p className="truncate text-sm font-medium">
              {card.title || "Bez naslova"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {card.description || "Nema opisa"}
            </p>
          </div>
        ))}
        {cards.length > 4 ? (
          <p className="text-xs text-muted-foreground">
            + još {cards.length - 4} kartica
          </p>
        ) : null}
      </SectionItemsPreview>
    </SectionEditCard>
  );
};
