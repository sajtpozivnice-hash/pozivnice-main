import { MessageSquareText } from "lucide-react";
import PanelContainer from "./PanelContainer";
import { useEditor } from "../EditorProvider";
import { createSectionSchema } from "../createSectionSchema";
import { FooterData } from "@/types/sections";
import DynamicSectionRenderer from "../components/DynamicSectionPanelRederer";

export const footerSchema = createSectionSchema<FooterData>({
  fields: [
    { key: "title", label: "Naslov", type: "text" },
    { key: "subtitle", label: "Podnaslov", type: "text" },
    { key: "description", label: "Opis", type: "textarea" },
    { key: "imageUrl", label: "Slika", type: "image" },
  ],
});

const FooterPanel = () => {
  const { config, updateSection } = useEditor();
  const footerSection = config.sections.find((s) => s.type === "footer");
  if (!footerSection) return null;

  return (
    <PanelContainer
      id={footerSection?.id || ""}
      title={footerSection?.name || ""}
      icon={MessageSquareText}
    >
      <DynamicSectionRenderer
        data={footerSection.data}
        schema={footerSchema}
        onChange={(updatedData) =>
          updateSection(footerSection.id, {
            data: updatedData,
          })
        }
      />
    </PanelContainer>
  );
};

export default FooterPanel;
