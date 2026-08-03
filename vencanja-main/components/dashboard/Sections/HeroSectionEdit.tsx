import { Image } from "lucide-react";
import { useProject } from "../context/ProjectContext";
import { HeroSection } from "@/types/sections";
import { useDialog } from "../context/ModalContext";
import ImagePreviewInCard from "../ImagePrewiewInCard";
import { SectionEditCard } from "./SectionEditCard";
import { SectionPreviewField } from "./SectionPreviewField";

export const HeroSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const heroSection = getSection<HeroSection>("hero");

  if (!heroSection) {
    return null;
  }

  return (
    <SectionEditCard
      title="Naslovna"
      description="Prvi utisak — imena, poruka i pozadinska slika."
      icon={Image}
      visible={heroSection.visible}
      loading={loading}
      onEdit={() => openModal("hero_edit")}
    >
      <SectionPreviewField label="Naslov" value={heroSection.data.title} />
      <SectionPreviewField
        label="Podnaslov"
        value={heroSection.data.subtitle}
      />
      <div className="space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Pozadinska slika
        </p>
        <ImagePreviewInCard
          src={heroSection.data.backgroundImage}
          alt="Hero pozadina"
        />
      </div>
    </SectionEditCard>
  );
};
