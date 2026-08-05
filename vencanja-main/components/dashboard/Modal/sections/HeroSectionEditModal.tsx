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
import { Textarea } from "@/components/ui/textarea";

const HeroSectionEditModal = () => {
  const { closeModal } = useDialog();
  const { config, saving, getSection, saveConfig } = useProject();
  const heroSection = getSection<HeroSection>("hero");
  const [sectionKey, setSectionKey] = useState(heroSection?.id ?? null);
  const [form, setForm] = useState({
    title: heroSection?.data.title ?? "",
    subtitle: heroSection?.data.subtitle ?? "",
    description: heroSection?.data.description ?? "",
    badge: heroSection?.data.badge ?? "",
    ctaText: heroSection?.data.ctaText ?? "",
    ctaHref: heroSection?.data.ctaHref ?? "",
    backgroundImage: heroSection?.data.backgroundImage ?? "",
    image: heroSection?.data.image ?? "",
  });
  const [isVisible, setIsVisible] = useState(heroSection?.visible ?? false);

  if (heroSection && heroSection.id !== sectionKey) {
    setSectionKey(heroSection.id);
    setForm({
      title: heroSection.data.title,
      subtitle: heroSection.data.subtitle ?? "",
      description: heroSection.data.description ?? "",
      badge: heroSection.data.badge ?? "",
      ctaText: heroSection.data.ctaText ?? "",
      ctaHref: heroSection.data.ctaHref ?? "",
      backgroundImage: heroSection.data.backgroundImage ?? "",
      image: heroSection.data.image ?? "",
    });
    setIsVisible(heroSection.visible);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!heroSection) {
    return null;
  }

  const showExtended =
    "badge" in heroSection.data ||
    "ctaText" in heroSection.data ||
    "description" in heroSection.data ||
    "image" in heroSection.data;

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
            ...(showExtended
              ? {
                  description: form.description,
                  badge: form.badge,
                  ctaText: form.ctaText,
                  ctaHref: form.ctaHref,
                  image: form.image,
                }
              : {}),
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
            Uredite naslov, podnaslov i slike hero sekcije.
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
          {showExtended ? (
            <>
              <Field>
                <FieldLabel htmlFor="description">Opis</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  onChange={handleChange}
                  value={form.description}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="badge">Bedž</FieldLabel>
                <Input
                  id="badge"
                  name="badge"
                  placeholder="npr. 7 godina"
                  onChange={handleChange}
                  value={form.badge}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="ctaText">CTA tekst</FieldLabel>
                <Input
                  id="ctaText"
                  name="ctaText"
                  onChange={handleChange}
                  value={form.ctaText}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="ctaHref">CTA link</FieldLabel>
                <Input
                  id="ctaHref"
                  name="ctaHref"
                  placeholder="#rsvp"
                  onChange={handleChange}
                  value={form.ctaHref}
                />
              </Field>
              <Field>
                <EditorImage
                  label="Portret / glavna slika"
                  value={form.image}
                  onChange={(url) =>
                    setForm((prev) => ({ ...prev, image: url }))
                  }
                />
              </Field>
            </>
          ) : null}
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
