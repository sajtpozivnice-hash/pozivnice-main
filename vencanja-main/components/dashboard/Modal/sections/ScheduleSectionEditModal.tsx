import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDialog } from "../../context/ModalContext";
import Loader from "../../loaders/Loader";
import { useProject } from "../../context/ProjectContext";
import { EyeIcon, EyeOff } from "lucide-react";
import { ScheduleSection } from "@/types/sections";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UniversalProjectConfig } from "@/types/config";

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
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState<ScheduleForm>({
    title: "",
    subtitle: "",
    items: [],
  });

  useEffect(() => {
    if (scheduleSection) {
      setForm({
        title: scheduleSection.data.title || "",
        subtitle: scheduleSection.data.subtitle || "",
        items: scheduleSection.data.items || [],
      });
      setIsVisible(scheduleSection.visible);
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
      <SheetHeader>
        <SheetTitle>Izmenite sekciju Raspored </SheetTitle>
        <SheetDescription>
          Ovde mozete izmeniti sve vezano za Raspored sekciju
        </SheetDescription>
        <div className="flex flex-row items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? "Sakrij sa sajta" : "Prikaži na sajtu"}
            {isVisible ? <EyeOff /> : <EyeIcon />}
          </Button>
          <SheetDescription
            className={`${isVisible ? "text-green-700" : "text-red-700"} font-bold`}
          >
            Status: {isVisible ? "Vidljiva na sajtu" : "Nije Vidljiva na sajtu"}
          </SheetDescription>
        </div>
      </SheetHeader>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <Label htmlFor="title">Izmenite Naslov</Label>
            <Input
              id="title"
              name="title"
              placeholder="Upišite naslov sekcije"
              onChange={handleChange}
              value={form.title ?? ""}
            />
          </Field>
          <Field>
            <Label htmlFor="subtitle">Izmenite Podnaslov</Label>
            <Input
              id="subtitle"
              name="subtitle"
              placeholder="Upišite podnaslov sekcije"
              onChange={handleChange}
              value={form.subtitle ?? ""}
            />
          </Field>
          {form.items.map((item, index) => (
            <FieldGroup key={item.id}>
              <Label>Stavka {index + 1}</Label>
              <Field>
                <Label htmlFor={`item-time-${item.id}`}>Vreme</Label>
                <Input
                  id={`item-time-${item.id}`}
                  placeholder="Vreme"
                  value={item.time ?? ""}
                  onChange={(e) =>
                    handleItemChange(item.id, "time", e.target.value)
                  }
                />
              </Field>
              <Field>
                <Label htmlFor={`item-title-${item.id}`}>Naslov</Label>
                <Input
                  id={`item-title-${item.id}`}
                  placeholder="Naslov događaja"
                  value={item.title ?? ""}
                  onChange={(e) =>
                    handleItemChange(item.id, "title", e.target.value)
                  }
                />
              </Field>
              <Field>
                <Label htmlFor={`item-description-${item.id}`}>Opis</Label>
                <Textarea
                  id={`item-description-${item.id}`}
                  placeholder="Opis"
                  value={item.description ?? ""}
                  onChange={(e) =>
                    handleItemChange(item.id, "description", e.target.value)
                  }
                />
              </Field>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => removeItem(item.id)}
              >
                Ukloni stavku
              </Button>
            </FieldGroup>
          ))}
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={addItem}
          >
            Dodaj stavku
          </Button>
        </FieldGroup>
        <SheetFooter>
          <Button className="cursor-pointer" type="submit">
            {saving ? (
              <>
                Čuvam...
                <Loader className="mr-2" size={16} />
              </>
            ) : (
              `Sačuvaj Izmene`
            )}
          </Button>

          <Button
            className="cursor-pointer"
            variant="outline"
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
