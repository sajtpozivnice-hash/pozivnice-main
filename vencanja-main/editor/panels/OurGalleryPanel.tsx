import { Images } from "lucide-react";
import PanelContainer from "./PanelContainer";
import { useEditor } from "../EditorProvider";
import { createSectionSchema } from "../createSectionSchema";
import { OurGallerySection } from "@/types/sections";
import DynamicSectionRenderer from "../components/DynamicSectionPanelRederer";

type OurGalleryData = OurGallerySection["data"];

export const ourGallerySchema = createSectionSchema<OurGalleryData>({
  fields: [
    { key: "title", label: "Naslov", type: "text" },
    { key: "description", label: "Opis", type: "textarea" },
    {
      key: "images",
      label: "Slike",
      type: "repeater",
      itemSchema: [{ key: "url", label: "Slika", type: "image" }],
    },
  ],
});

const OurGalleryPanel = () => {
  const { config, updateSection } = useEditor();
  const ourGallerySection = config.sections.find(
    (s) => s.type === "ourGallery",
  );

  if (!ourGallerySection) return null;

  return (
    <PanelContainer
      id={ourGallerySection.id}
      title={ourGallerySection.name}
      icon={Images}
    >
      <DynamicSectionRenderer
        data={ourGallerySection.data}
        schema={ourGallerySchema}
        onChange={(updatedData) =>
          updateSection(ourGallerySection.id, {
            data: {
              ...ourGallerySection.data,
              ...updatedData,
            },
          })
        }
      />
    </PanelContainer>
  );
};

export default OurGalleryPanel;
