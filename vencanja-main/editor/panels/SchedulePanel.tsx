import { ClipboardClock } from "lucide-react";
import PanelContainer from "./PanelContainer";
import { useEditor } from "../EditorProvider";
import { createSectionSchema } from "../createSectionSchema";
import { ScheduleSection } from "@/types/sections";
import DynamicSectionRenderer from "../components/DynamicSectionPanelRederer";

type ScheduleData = ScheduleSection["data"];

export const scheduleSchema = createSectionSchema<ScheduleData>({
  fields: [
    { key: "title", label: "Naslov", type: "text" },
    { key: "subtitle", label: "Podnaslov", type: "text" },
    {
      key: "items",
      label: "Stavke",
      type: "repeater",
      itemSchema: [
        { key: "time", label: "Vreme", type: "text" },
        { key: "title", label: "Naslov", type: "text" },
        { key: "description", label: "Opis", type: "textarea" },
      ],
    },
  ],
});

const SchedulePanel = () => {
  const { config, updateSection } = useEditor();
  const scheduleSection = config.sections.find((s) => s.type === "schedule");

  if (!scheduleSection) return null;

  return (
    <PanelContainer
      id={scheduleSection.id}
      title={scheduleSection.name}
      icon={ClipboardClock}
    >
      <DynamicSectionRenderer
        data={scheduleSection.data}
        schema={scheduleSchema}
        onChange={(updatedData) =>
          updateSection(scheduleSection.id, {
            data: updatedData,
          })
        }
      />
    </PanelContainer>
  );
};

export default SchedulePanel;
