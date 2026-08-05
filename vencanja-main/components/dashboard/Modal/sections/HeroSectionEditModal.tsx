import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDialog } from "../../context/ModalContext";
import Loader from "../../loaders/Loader";
import { useProject } from "../../context/ProjectContext";
import { HeroSection } from "@/types/sections";
import { useState } from "react";
import EditorImage from "@/editor/components/EditorImage";
import { UniversalProjectConfig } from "@/types/config";
import { SectionModalVisibilityBar } from "./SectionModalVisibilityBar";

const HeroSectionEditModal = () => {
  const { closeModal } = useDialog();
  const { config, saving, getSection, saveConfig } = useProject();
  const heroSection = getSection<HeroSection>("hero");
  const [sectionKey, setSectionKey] = useState(heroSection?.id ?? null);
  const [form, setForm] = useState({
    title: heroSection?.data.title ?? "",
    subtitle: heroSection?.data.subtitle ?? "",
    backgroundImage: heroSection?.data.backgroundImage ?? "",
  });
  const [isVisible, setIsVisible] = useState(heroSection?.visible ?? false);

  if (heroSection && heroSection.id !== sectionKey) {
    setSectionKey(heroSection.id);
    setForm({
      title: heroSection.data.title,
      subtitle: heroSection.data.subtitle ?? "",
      backgroundImage: heroSection.data.backgroundImage ?? "",
    });
    setIsVisible(heroSection.visible);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!heroSection) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!config || !heroSection) return;

    const newConfig: UniversalProjectConfig = {
      ...config,
      sections: config.sections.map((section) => {
        if (section.type !== "hero") {
          return section;
        }

        return {
          ...(section as HeroSection),
          visible: isVisible,
          data: {
            ...(section as HeroSection).data,
            title: form.title,
            subtitle: form.subtitle,
            backgroundImage: form.backgroundImage,
          },
        };
      }),
    };

    await saveConfig(newConfig);

    closeModal();
  };

  return (
    <>
      <SheetHeader className="space-y-3">
        <div className="space-y-1">
          <SheetTitle>Naslovna</SheetTitle>
          <SheetDescription>
            Uredite naslov, podnaslov i pozadinsku sliku hero sekcije.
          </SheetDescription>
        </div>
        <SectionModalVisibilityBar
          isVisible={isVisible}
          onToggle={() => setIsVisible((prev) => !prev)}
        />
      </SheetHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FieldGroup className="rounded-xl border bg-muted/20 p-4">
          <Field>
            <FieldLabel htmlFor="title">Naslov</FieldLabel>
            <FieldDescription>Glavni tekst u hero sekciji.</FieldDescription>
            <Input
              id="title"
              name="title"
              placeholder="Upišite glavni naslov"
              onChange={handleChange}
              value={form.title ?? ""}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="subtitle">Podnaslov</FieldLabel>
            <FieldDescription>Kratka poruka ispod naslova.</FieldDescription>
            <Input
              id="subtitle"
              name="subtitle"
              placeholder="Upišite podnaslov"
              onChange={handleChange}
              value={form.subtitle ?? ""}
            />
          </Field>
          <Field>
            <EditorImage
              label="Pozadinska slika"
              value={form.backgroundImage}
              onChange={(url) =>
                setForm((prev) => ({ ...prev, backgroundImage: url }))
              }
            />
          </Field>
        </FieldGroup>
        <SheetFooter>
          <Button className="cursor-pointer" type="submit" disabled={saving}>
            {saving ? (
              <>
                Čuvam...
                <Loader className="mr-2" size={16} />
              </>
            ) : (
              "Sačuvaj izmene"
            )}
          </Button>
          <Button
            className="cursor-pointer"
            variant="outline"
            type="button"
            onClick={closeModal}
          >
            Odustani
          </Button>
        </SheetFooter>
      </form>
    </>
  );
};

export default HeroSectionEditModal;
