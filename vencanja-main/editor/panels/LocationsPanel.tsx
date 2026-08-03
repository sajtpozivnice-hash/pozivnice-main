import { MapPinned } from "lucide-react";
import PanelContainer from "./PanelContainer";
import { useEditor } from "../EditorProvider";
import { createSectionSchema } from "../createSectionSchema";
import { LocationsData } from "@/types/sections";
import DynamicSectionRenderer from "../components/DynamicSectionPanelRederer";

export const locationsSchema = createSectionSchema<LocationsData>({
  fields: [
    { key: "title", label: "Naslov", type: "text" },
    { key: "subtitle", label: "Podnaslov", type: "text" },
    {
      key: "cards",
      label: "Kartice",
      type: "repeater",
      itemSchema: [
        { key: "title", label: "Naslov", type: "text" },
        { key: "time", label: "Vreme", type: "text" },
        { key: "location", label: "Lokacija", type: "textarea" },
        { key: "text", label: "Opis", type: "textarea" },
      ],
    },
  ],
});

const LocationsPanel = () => {
  const { config, updateSection } = useEditor();
  const locationsSection = config.sections.find((s) => s.type === "locations");

  if (!locationsSection) return null;

  return (
    <PanelContainer
      id={locationsSection.id}
      title={locationsSection.name}
      icon={MapPinned}
    >
      <DynamicSectionRenderer
        data={locationsSection.data}
        schema={locationsSchema}
        onChange={(updatedData) =>
          updateSection(locationsSection.id, {
            data: updatedData,
          })
        }
      />
    </PanelContainer>
  );
};

export default LocationsPanel;
