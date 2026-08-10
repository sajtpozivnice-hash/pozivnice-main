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
import { Plus } from "lucide-react";
import { ScheduleSection } from "@/types/sections";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UniversalProjectConfig } from "@/types/config";
import { RepeaterItemCard } from "./RepeaterItemCard";
import { Badge } from "@/components/ui/badge";
import { SectionModalVisibilityBar } from "./SectionModalVisibilityBar";

type ScheduleItem = NonNullable<ScheduleSection["data"]["items"]>[number];

type ScheduleForm = {
  title: string;
  subtitle: string;
  items: ScheduleItem[];
};

const ScheduleSectionEditModal = () => {
  const { closeModal } = useDialog();
  const { config, saving, getSection, saveConfig } = useProject();
  const scheduleSection = getSection<ScheduleSection>("schedule");
  const [isVisible, setIsVisible] = useState(
    scheduleSection?.visible ?? false,
  );
  const [form, setForm] = useState<ScheduleForm>({
    title: scheduleSection?.data.title || "",
    subtitle: scheduleSection?.data.subtitle || "",
    items: scheduleSection?.data.items || [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleItemChange = (
    itemId: string,
    field: keyof ScheduleItem,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: crypto.randomUUID(),
          time: "",
          title: "",
          description: "",
        },
      ],
    }));
  };

  const removeItem = (itemId: string) => {
    const confirmed = window.confirm(
      "Da li ste sigurni da želite da uklonite ovu stavku?",
    );
    if (!confirmed) return;

    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
  };

  if (!scheduleSection) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!config || !scheduleSection) return;

    const newConfig: UniversalProjectConfig = {
      ...config,
      sections: config.sections.map((section) => {
        if (section.type !== "schedule") {
          return section;
        }

        return {
          ...(section as ScheduleSection),
          visible: isVisible,
          data: {
            ...(section as ScheduleSection).data,
            title: form.title,
            subtitle: form.subtitle,
            items: form.items,
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
          <SheetTitle>Raspored</SheetTitle>
          <SheetDescription>
            Uredite naslov i vremensku liniju događaja tokom dana.
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
            <FieldDescription>Glavni naslov sekcije rasporeda.</FieldDescription>
            <Input
              id="title"
              name="title"
              placeholder="npr. Veliki dan"
              onChange={handleChange}
              value={form.title ?? ""}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="subtitle">Podnaslov</FieldLabel>
            <FieldDescription>
              Kratka rečenica ispod naslova.
            </FieldDescription>
            <Input
              id="subtitle"
              name="subtitle"
              placeholder="npr. Sve što treba da znate"
              onChange={handleChange}
              value={form.subtitle ?? ""}
            />
          </Field>
        </FieldGroup>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold">Stavke rasporeda</p>
              <p className="text-xs text-muted-foreground">
                Dodajte vreme, naziv i opis svakog dela dana.
              </p>
            </div>
            <Badge variant="secondary">{form.items.length}</Badge>
          </div>

          {form.items.length === 0 ? (
            <div className="rounded-xl border border-dashed bg-muted/30 px-4 py-6 text-center">
              <p className="text-sm font-medium">Nema stavki</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Dodajte prvu stavku da gosti vide raspored dana.
              </p>
            </div>
          ) : (
            form.items.map((item, index) => (
              <RepeaterItemCard
                key={item.id}
                title={`Stavka ${index + 1}`}
                onRemove={() => removeItem(item.id)}
              >
                <Field>
                  <FieldLabel htmlFor={`item-time-${item.id}`}>Vreme</FieldLabel>
                  <Input
                    id={`item-time-${item.id}`}
                    placeholder="npr. 16:00"
                    value={item.time ?? ""}
                    onChange={(e) =>
                      handleItemChange(item.id, "time", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`item-title-${item.id}`}>
                    Naslov
                  </FieldLabel>
                  <Input
                    id={`item-title-${item.id}`}
                    placeholder="npr. Ceremonija"
                    value={item.title ?? ""}
                    onChange={(e) =>
                      handleItemChange(item.id, "title", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`item-description-${item.id}`}>
                    Opis
                  </FieldLabel>
                  <Textarea
                    id={`item-description-${item.id}`}
                    placeholder="Mesto ili dodatni detalj"
                    value={item.description ?? ""}
                    onChange={(e) =>
                      handleItemChange(item.id, "description", e.target.value)
                    }
                  />
                </Field>
              </RepeaterItemCard>
            ))
          )}

          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            onClick={addItem}
          >
            <Plus className="h-4 w-4" />
            Dodaj stavku
          </Button>
        </div>

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

export default ScheduleSectionEditModal;
