import { BookType } from "lucide-react";
import PanelContainer from "./PanelContainer";
import EditorInput from "../components/EditorInput";
import { useEditor } from "../EditorProvider";

const GeneralInfoPanel = () => {
  const { config, updateEvent } = useEditor();

  return (
    <PanelContainer id={"general"} title={"GLAVNE INFORMACIJE"} icon={BookType}>
      <EditorInput
        label="Imena"
        value={config.event.names || ""}
        onChange={(value) => updateEvent({ names: value })}
      />
      <EditorInput
        label="DATUM  DOGAĐAJA"
        onChange={(value) => updateEvent({ date: value })}
        value={config.event.date || ""}
        type="date"
      />
      <EditorInput
        label="KRAJNJI DATUM POTVRDE"
        value={config?.event.rsvpDate}
        onChange={(value) => updateEvent({ rsvpDate: value })}
        type="date"
      />
    </PanelContainer>
  );
};

export default GeneralInfoPanel;
