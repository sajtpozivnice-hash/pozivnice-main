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
import { OurStorySection } from "@/types/sections";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UniversalProjectConfig } from "@/types/config";
import ImagePreviewInput from "../../ImagePreviewInput";
import { SectionModalVisibilityBar } from "./SectionModalVisibilityBar";

const OurStorySectionEditModal = () => {
  const { closeModal } = useDialog();
  const { config, saving, getSection, saveConfig } = useProject();
  const ourStorySection = getSection<OurStorySection>("ourStory");
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({
    title: "",
    overline: "",
    text: "",
    image: "",
  });

  useEffect(() => {
    if (ourStorySection) {
      setForm({
        title: ourStorySection.data.title || "",
        overline: ourStorySection.data.overline || "",
        text: ourStorySection.data.text || "",
        image: ourStorySection.data.image || "",
      });
      setIsVisible(ourStorySection.visible);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!ourStorySection) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!config || !ourStorySection) return;

    const newConfig: UniversalProjectConfig = {
      ...config,
      sections: config.sections.map((section) => {
        if (section.type !== "ourStory") {
          return section;
        }

        return {
          ...(section as OurStorySection),
          visible: isVisible,
          data: {
            ...(section as OurStorySection).data,
            title: form.title,
            overline: form.overline,
            text: form.text,
            image: form.image,
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
          <SheetTitle>Naša priča</SheetTitle>
          <SheetDescription>
            Uredite naslov, podnaslov, tekst i fotografiju vaše priče.
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
            <Input
              id="title"
              name="title"
              placeholder="Upišite naslov sekcije"
              onChange={handleChange}
              value={form.title ?? ""}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="overline">Podnaslov</FieldLabel>
            <Input
              id="overline"
              name="overline"
              placeholder="Upišite podnaslov"
              onChange={handleChange}
              value={form.overline ?? ""}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="text">Opis</FieldLabel>
            <FieldDescription>Glavni tekst vaše priče.</FieldDescription>
            <Textarea
              id="text"
              name="text"
              placeholder="Upišite tekst priče"
              onChange={handleChange}
              value={form.text ?? ""}
            />
          </Field>
          <Field>
            <ImagePreviewInput preview={form.image} label="Slika" />
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

export default OurStorySectionEditModal;
