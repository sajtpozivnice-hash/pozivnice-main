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
import { RSVPSection } from "@/types/sections";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UniversalProjectConfig } from "@/types/config";
import { SectionModalVisibilityBar } from "./SectionModalVisibilityBar";

const RSVPSectionEditModal = () => {
  const { closeModal } = useDialog();
  const { config, saving, getSection, saveConfig } = useProject();
  const [isVisible, setIsVisible] = useState(false);
  const rsvpSection = getSection<RSVPSection>("rsvp");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (rsvpSection) {
      setForm({
        title: rsvpSection?.data?.title || "",
        description: rsvpSection?.data?.description || "",
      });
      setIsVisible(rsvpSection.visible);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!rsvpSection) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!config || !rsvpSection) return;

    const newConfig: UniversalProjectConfig = {
      ...config,
      sections: config.sections.map((section) => {
        if (section.type !== "rsvp") {
          return section;
        }

        return {
          ...(section as RSVPSection),
          visible: isVisible,
          data: {
            ...(section as RSVPSection).data,
            title: form.title,
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
          <SheetTitle>Potvrda dolazaka</SheetTitle>
          <SheetDescription>
            Uredite naslov i tekst RSVP sekcije.
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
            <FieldDescription>
              Glavni naslov sekcije za potvrdu dolazaka.
            </FieldDescription>
            <Textarea
              id="title"
              name="title"
              placeholder="Upišite naslov sekcije"
              onChange={handleChange}
              value={form.title ?? ""}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Tekst</FieldLabel>
            <FieldDescription>
              Dodatni tekst ispod naslova za goste.
            </FieldDescription>
            <Textarea
              id="description"
              name="description"
              placeholder="Upišite tekst pozivnice"
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

export default RSVPSectionEditModal;
