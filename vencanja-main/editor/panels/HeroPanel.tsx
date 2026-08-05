import { Image } from "lucide-react";
import PanelContainer from "./PanelContainer";
import { useEditor } from "../EditorProvider";
import { createSectionSchema } from "../createSectionSchema";
import { HeroData } from "@/types/sections";
import DynamicSectionRenderer from "../components/DynamicSectionPanelRederer";

export const heroSchema = createSectionSchema<HeroData>({
  fields: [
    { key: "title", label: "Naslov", type: "text" },
    { key: "subtitle", label: "Podnaslov", type: "text" },
    { key: "description", label: "Opis", type: "textarea" },
    { key: "badge", label: "Bedž (npr. godine)", type: "text" },
    { key: "ctaText", label: "Tekst CTA dugmeta", type: "text" },
    { key: "ctaHref", label: "CTA link (npr. #rsvp)", type: "text" },
    { key: "backgroundImage", label: "Pozadinska Slika", type: "image" },
    { key: "image", label: "Slika", type: "image" },
  ],
});

const HeroPanel = () => {
  const { config, updateSection } = useEditor();
  const heroSection = config.sections.find((s) => s.type === "hero");
  if (!heroSection) return null;

  return (
    <PanelContainer
      id={heroSection?.id || ""}
      title={heroSection?.name || ""}
      icon={Image}
    >
      <DynamicSectionRenderer
        data={heroSection.data}
        schema={heroSchema}
        onChange={(updatedData) =>
          updateSection(heroSection.id, {
            data: updatedData,
          })
        }
      />
    </PanelContainer>
  );
};

export default HeroPanel;
