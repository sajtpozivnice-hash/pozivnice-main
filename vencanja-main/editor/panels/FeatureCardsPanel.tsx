import { LayoutGrid } from "lucide-react";
import PanelContainer from "./PanelContainer";
import { useEditor } from "../EditorProvider";
import { createSectionSchema } from "../createSectionSchema";
import { FeatureCardsSection } from "@/types/sections";
import DynamicSectionRenderer from "../components/DynamicSectionPanelRederer";

type FeatureCardsData = FeatureCardsSection["data"];

export const featureCardsSchema = createSectionSchema<FeatureCardsData>({
  fields: [
    { key: "title", label: "Naslov", type: "text" },
    { key: "subtitle", label: "Podnaslov", type: "text" },
    { key: "description", label: "Opis", type: "textarea" },
    {
      key: "cards",
      label: "Kartice",
      type: "repeater",
      itemSchema: [
        { key: "title", label: "Naslov", type: "text" },
        { key: "description", label: "Opis", type: "textarea" },
        { key: "icon", label: "Ikonica (gift, shirt, baby, info, party…)", type: "text" },
        { key: "accent", label: "Boja (hex)", type: "text" },
        { key: "image", label: "Slika", type: "image" },
      ],
    },
  ],
});

const FeatureCardsPanel = () => {
  const { config, updateSection } = useEditor();
  const section = config.sections.find((s) => s.type === "featureCards");

  if (!section) return null;

  return (
    <PanelContainer id={section.id} title={section.name} icon={LayoutGrid}>
      <DynamicSectionRenderer
        data={section.data}
        schema={featureCardsSchema}
        onChange={(updatedData) =>
          updateSection(section.id, {
            data: updatedData,
          })
        }
      />
    </PanelContainer>
  );
};

export default FeatureCardsPanel;
