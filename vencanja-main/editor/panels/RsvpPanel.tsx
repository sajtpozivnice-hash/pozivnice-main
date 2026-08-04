import { MailCheck } from "lucide-react";
import PanelContainer from "./PanelContainer";
import { useEditor } from "../EditorProvider";
import { createSectionSchema } from "../createSectionSchema";
import { RSVPSection } from "@/types/sections";
import DynamicSectionRenderer from "../components/DynamicSectionPanelRederer";

type RsvpData = RSVPSection["data"];

export const rsvpSchema = createSectionSchema<RsvpData>({
  fields: [
    { key: "title", label: "Naslov", type: "text" },
    { key: "description", label: "Opis", type: "textarea" },
    { key: "buttonText", label: "Tekst dugmeta", type: "text" },
    { key: "imageUrl", label: "Pozadinska slika", type: "image" },
  ],
});

const RsvpPanel = () => {
  const { config, updateSection } = useEditor();
  const rsvpSection = config.sections.find((s) => s.type === "rsvp");

  if (!rsvpSection) return null;

  return (
    <PanelContainer
      id={rsvpSection.id}
      title={rsvpSection.name}
      icon={MailCheck}
    >
      <DynamicSectionRenderer
        data={rsvpSection.data}
        schema={rsvpSchema}
        onChange={(updatedData) =>
          updateSection(rsvpSection.id, {
            data: updatedData,
          })
        }
      />
    </PanelContainer>
  );
};

export default RsvpPanel;
