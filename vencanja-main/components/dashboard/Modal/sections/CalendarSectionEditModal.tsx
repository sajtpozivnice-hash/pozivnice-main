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
import { CalendarSection } from "@/types/sections";
import { useEffect, useState } from "react";
import { UniversalProjectConfig } from "@/types/config";
import { SectionModalVisibilityBar } from "./SectionModalVisibilityBar";

const CalendarSectionEditModal = () => {
  const { closeModal } = useDialog();
  const { config, saving, getSection, saveConfig } = useProject();
  const calendarSection = getSection<CalendarSection>("calendar");
  const [form, setForm] = useState({
    title: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (calendarSection) {
      setForm({
        title: calendarSection.data.title || "",
      });
      setIsVisible(calendarSection.visible);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!calendarSection) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!config || !calendarSection) return;

    const newConfig: UniversalProjectConfig = {
      ...config,
      sections: config.sections.map((section) => {
        if (section.type !== "calendar") {
          return section;
        }

        return {
          ...(section as CalendarSection),
          visible: isVisible,
          data: {
            ...(section as CalendarSection).data,
            title: form.title,
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
          <SheetTitle>Kalendar</SheetTitle>
          <SheetDescription>
            Uredite naslov sekcije sa kalendarom.
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
              Glavni naslov koji se prikazuje iznad kalendara.
            </FieldDescription>
            <Input
              id="title"
              name="title"
              placeholder="Upišite glavni naslov za Kalendar sekciju"
              onChange={handleChange}
              value={form.title ?? ""}
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

export default CalendarSectionEditModal;
