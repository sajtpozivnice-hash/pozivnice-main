import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDialog } from "../../context/ModalContext";
import Loader from "../../loaders/Loader";
import { useProject } from "../../context/ProjectContext";
import { UploadImagesSection } from "@/types/sections";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UniversalProjectConfig } from "@/types/config";
import { SectionModalVisibilityBar } from "./SectionModalVisibilityBar";

const ImageUploadSectionEditModal = () => {
  const { closeModal } = useDialog();
  const { config, saving, getSection, saveConfig } = useProject();
  const [isVisible, setIsVisible] = useState(false);
  const imageUploadSection = getSection<UploadImagesSection>(
    "uploadImagesSection",
  );
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
  });

  useEffect(() => {
    if (imageUploadSection) {
      setForm({
        title: imageUploadSection?.data?.title || "",
        subtitle: imageUploadSection?.data?.subtitle || "",
        description: imageUploadSection?.data?.description || "",
      });
      setIsVisible(imageUploadSection.visible);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!imageUploadSection) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!config || !imageUploadSection) return;

    const newConfig: UniversalProjectConfig = {
      ...config,
      sections: config.sections.map((section) => {
        if (section.type !== "uploadImagesSection") {
          return section;
        }

        return {
          ...(section as UploadImagesSection),
          visible: isVisible,
          data: {
            ...(section as UploadImagesSection).data,
            title: form.title,
            subtitle: form.subtitle,
            description: form.description,
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
          <SheetTitle>Dodavanje slika</SheetTitle>
          <SheetDescription>
            Uredite naslov, podnaslov i opis sekcije za upload slika.
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
            <FieldDescription>Glavni naslov sekcije.</FieldDescription>
            <Textarea
              id="title"
              name="title"
              placeholder="Upišite naslov"
              onChange={handleChange}
              value={form.title ?? ""}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="subtitle">Podnaslov</FieldLabel>
            <FieldDescription>Kratka rečenica ispod naslova.</FieldDescription>
            <Textarea
              id="subtitle"
              name="subtitle"
              placeholder="Upišite podnaslov"
              onChange={handleChange}
              value={form.subtitle ?? ""}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Opis</FieldLabel>
            <FieldDescription>
              Dodatni tekst koji objašnjava sekciju gostima.
            </FieldDescription>
            <Textarea
              id="description"
              name="description"
              placeholder="Upišite opis"
              onChange={handleChange}
              value={form.description ?? ""}
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

export default ImageUploadSectionEditModal;
