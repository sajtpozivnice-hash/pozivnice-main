import { ImageIcon, MapPinned } from "lucide-react";
import PanelContainer from "./PanelContainer";
import { useEditor } from "../EditorProvider";
import { createSectionSchema } from "../createSectionSchema";
import { UploadImageData } from "@/types/sections";
import DynamicSectionRenderer from "../components/DynamicSectionPanelRederer";

export const imagesUploadSchema = createSectionSchema<UploadImageData>({
  fields: [
    { key: "title", label: "Naslov", type: "text" },
    { key: "subtitle", label: "Podnaslov", type: "text" },
    { key: "description", label: "Opis", type: "textarea" },
    { key: "buttonText", label: "Tekst dugmeta", type: "text" },
    { key: "imageUrl", label: "Pozadinska slika", type: "image" },
  ],
});

const ImagesUpload = () => {
  const { config, updateSection } = useEditor();
  const imagesUploadSection = config.sections.find(
    (s) => s.type === "uploadImagesSection",
  );

  if (!imagesUploadSection) return null;

  return (
    <PanelContainer
      id={imagesUploadSection.id}
      title={imagesUploadSection.name}
      icon={ImageIcon}
    >
      <DynamicSectionRenderer
        data={imagesUploadSection.data}
        schema={imagesUploadSchema}
        onChange={(updatedData) =>
          updateSection(imagesUploadSection.id, {
            data: updatedData,
          })
        }
      />
    </PanelContainer>
  );
};

export default ImagesUpload;
