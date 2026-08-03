import { Quote, Text } from "lucide-react";
import PanelContainer from "./PanelContainer";
import { useEditor } from "../EditorProvider";
import { createSectionSchema } from "../createSectionSchema";
import { InviteTextSectionData } from "@/types/sections";
import DynamicSectionRenderer from "../components/DynamicSectionPanelRederer";

export const inviteText = createSectionSchema<InviteTextSectionData>({
  fields: [{ key: "description", label: "Tekst", type: "textarea" }],
});

const InvitePanel = () => {
  const { config, updateSection } = useEditor();
  const inviteSeciton = config.sections.find((s) => s.type === "inviteText");

  if (!inviteSeciton) return null;

  return (
    <PanelContainer
      id={inviteSeciton?.id || ""}
      title={inviteSeciton?.name || ""}
      icon={Text}
    >
      <DynamicSectionRenderer
        data={inviteSeciton.data}
        schema={inviteText}
        onChange={(updatedData) =>
          updateSection(inviteSeciton.id, {
            data: updatedData,
          })
        }
      />
    </PanelContainer>
  );
};

export default InvitePanel;
