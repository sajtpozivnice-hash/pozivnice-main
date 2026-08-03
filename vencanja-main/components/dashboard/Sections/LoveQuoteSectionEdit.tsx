import { Quote } from "lucide-react";
import { useDialog } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { LoveQuoteSection } from "@/types/sections";
import { SectionEditCard } from "./SectionEditCard";
import { SectionPreviewField } from "./SectionPreviewField";

export const LoveQuoteSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const loveQuoteSection = getSection<LoveQuoteSection>("loveQuote");

  if (!loveQuoteSection) {
    return null;
  }

  return (
    <SectionEditCard
      title="Ljubavni citat"
      description="Istaknuta poruka ili citat na pozivnici."
      icon={Quote}
      visible={loveQuoteSection.visible}
      loading={loading}
      onEdit={() => openModal("love_quote_edit")}
    >
      <SectionPreviewField
        label="Citat"
        value={loveQuoteSection.data.title}
        multiline
      />
    </SectionEditCard>
  );
};
