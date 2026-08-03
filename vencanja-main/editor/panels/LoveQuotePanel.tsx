import { Quote } from "lucide-react";
import PanelContainer from "./PanelContainer";
import { useEditor } from "../EditorProvider";
import { createSectionSchema } from "../createSectionSchema";
import { LoveQuoteData } from "@/types/sections";
import DynamicSectionRenderer from "../components/DynamicSectionPanelRederer";

export const loveQuote = createSectionSchema<LoveQuoteData>({
  fields: [{ key: "title", label: "Naslov", type: "text" }],
});

const LoveQuotePanel = () => {
  const { config, updateSection } = useEditor();
  const loveQuoteSeciton = config.sections.find((s) => s.type === "loveQuote");

  if (!loveQuoteSeciton) return null;

  return (
    <PanelContainer
      id={loveQuoteSeciton?.id || ""}
      title={loveQuoteSeciton?.name || ""}
      icon={Quote}
    >
      <DynamicSectionRenderer
        data={loveQuoteSeciton.data}
        schema={loveQuote}
        onChange={(updatedData) =>
          updateSection(loveQuoteSeciton.id, {
            data: updatedData,
          })
        }
      />
    </PanelContainer>
  );
};

export default LoveQuotePanel;
