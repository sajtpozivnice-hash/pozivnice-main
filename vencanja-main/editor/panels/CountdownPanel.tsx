import { Clock } from "lucide-react";
import PanelContainer from "./PanelContainer";
import { useEditor } from "../EditorProvider";
import { createSectionSchema } from "../createSectionSchema";
import { CountdownData } from "@/types/sections";
import DynamicSectionRenderer from "../components/DynamicSectionPanelRederer";

export const countdownSchema = createSectionSchema<CountdownData>({
  fields: [
    { key: "title", label: "Naslov", type: "text" },
    { key: "description", label: "Opis", type: "text" },
  ],
});

const CountdownPanel = () => {
  const { config, updateSection } = useEditor();
  const countdownSection = config.sections.find((s) => s.type === "countdown");
  if (!countdownSection) return null;

  return (
    <PanelContainer
      id={countdownSection?.id || ""}
      title={countdownSection?.name || ""}
      icon={Clock}
    >
      <DynamicSectionRenderer
        data={countdownSection.data}
        schema={countdownSchema}
        onChange={(updatedData) =>
          updateSection(countdownSection.id, {
            data: updatedData,
          })
        }
      />
    </PanelContainer>
  );
};

export default CountdownPanel;
