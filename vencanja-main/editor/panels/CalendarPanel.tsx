import { CalendarHeart } from "lucide-react";
import PanelContainer from "./PanelContainer";
import { useEditor } from "../EditorProvider";
import { createSectionSchema } from "../createSectionSchema";
import { CalendarData } from "@/types/sections";
import DynamicSectionRenderer from "../components/DynamicSectionPanelRederer";

export const calendarSchema = createSectionSchema<CalendarData>({
  fields: [
    { key: "title", label: "Naslov", type: "text" },
    { key: "description", label: "Opis", type: "text" },
    { key: "imageUrl", label: "Pozadinska slika", type: "image" },
  ],
});

const CalendarPanel = () => {
  const { config, updateSection } = useEditor();
  const calendarSection = config.sections.find((s) => s.type === "calendar");

  if (!calendarSection) return null;
  return (
    <PanelContainer
      id={calendarSection?.id || ""}
      title={calendarSection?.name || ""}
      icon={CalendarHeart}
    >
      <DynamicSectionRenderer
        data={calendarSection.data}
        schema={calendarSchema}
        onChange={(updatedData) =>
          updateSection(calendarSection.id, {
            data: updatedData,
          })
        }
      />
    </PanelContainer>
  );
};

export default CalendarPanel;
