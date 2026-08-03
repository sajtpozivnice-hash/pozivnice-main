import { MessageCircleHeart } from "lucide-react";
import PanelContainer from "./PanelContainer";
import { useEditor } from "../EditorProvider";
import { createSectionSchema } from "../createSectionSchema";
import { OurStoryData } from "@/types/sections";
import DynamicSectionRenderer from "../components/DynamicSectionPanelRederer";

export const ourStorySchema = createSectionSchema<OurStoryData>({
  fields: [
    { key: "title", label: "Naslov", type: "text" },
    { key: "subtitle", label: "Podnaslov", type: "text" },
    { key: "overline", label: "Drugi Podnaslov", type: "text" },
    { key: "text", label: "Opis", type: "textarea" },
    { key: "image", label: "Slika", type: "image" },
    {
      key: "cards",
      label: "Kartice",
      type: "repeater",
      itemSchema: [
        { key: "title", label: "Naslov", type: "text" },
        { key: "subtitle", label: "Podnaslov", type: "text" },
        { key: "time", label: "Vreme", type: "text" },
        { key: "location", label: "Lokacija", type: "textarea" },
        { key: "text", label: "Opis", type: "textarea" },
      ],
    },
  ],
});

const OurStoryPanel = () => {
  const { config, updateSection } = useEditor();
  const ourStorySection = config.sections.find((s) => s.type === "ourStory");
  if (!ourStorySection) return null;

  return (
    <PanelContainer
      id={ourStorySection?.id || ""}
      title={ourStorySection?.name || ""}
      icon={MessageCircleHeart}
    >
      <DynamicSectionRenderer
        data={ourStorySection.data}
        schema={ourStorySchema}
        onChange={(updatedData) =>
          updateSection(ourStorySection.id, {
            data: updatedData,
          })
        }
      />
    </PanelContainer>
  );
};

export default OurStoryPanel;
