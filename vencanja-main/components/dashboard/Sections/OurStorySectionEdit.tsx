import { HeartHandshake } from "lucide-react";
import { useDialog } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { OurStorySection } from "@/types/sections";
import ImagePreviewInCard from "../ImagePrewiewInCard";
import { SectionEditCard } from "./SectionEditCard";
import { SectionPreviewField } from "./SectionPreviewField";

export const OurStorySectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const ourStorySection = getSection<OurStorySection>("ourStory");

  if (!ourStorySection) {
    return null;
  }

  return (
    <SectionEditCard
      title="Naša priča"
      description="Kratka priča o vama uz prateću fotografiju."
      icon={HeartHandshake}
      visible={ourStorySection.visible}
      loading={loading}
      onEdit={() => openModal("our_story_edit")}
    >
      <SectionPreviewField label="Naslov" value={ourStorySection.data.title} />
      <SectionPreviewField
        label="Podnaslov"
        value={ourStorySection.data.overline}
      />
      <SectionPreviewField
        label="Opis"
        value={ourStorySection.data.text}
        multiline
      />
      <div className="space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Slika
        </p>
        <ImagePreviewInCard
          src={ourStorySection.data.image}
          alt="Nasa prica slika"
        />
      </div>
    </SectionEditCard>
  );
};
