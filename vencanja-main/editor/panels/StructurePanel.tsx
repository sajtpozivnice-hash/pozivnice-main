import { StretchVerticalIcon } from "lucide-react";
import PanelContainer from "./PanelContainer";
import { useEditor } from "../EditorProvider";
import VisibilityPanel from "./VisibilityPanel";

const StructurePanel = () => {
  const { config } = useEditor();

  const sortedSections = [...config.sections].sort((a, b) => a.order - b.order);

  return (
    <PanelContainer
      id={"structure"}
      title={"REDOSLED I VIDLJIVOST SEKCIJA"}
      icon={StretchVerticalIcon}
    >
      {sortedSections.map((item) => (
        <VisibilityPanel
          key={item.id}
          id={item.id}
          title={item.name}
          visible={item.visible}
          order={item.order}
        />
      ))}
    </PanelContainer>
  );
};

export default StructurePanel;
