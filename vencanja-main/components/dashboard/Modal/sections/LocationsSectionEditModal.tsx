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
import { CardItem, LocationsSection } from "@/types/sections";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UniversalProjectConfig } from "@/types/config";

type LocationsForm = {
  title: string;
  subtitle: string;
  cards: CardItem[];
};

const LocationsSectionEditModal = () => {
  const { closeModal } = useDialog();
  const { config, saving, getSection, saveConfig } = useProject();
  const locationsSection = getSection<LocationsSection>("locations");
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState<LocationsForm>({
    title: "",
    subtitle: "",
    cards: [],
  });

  useEffect(() => {
    if (locationsSection) {
      setForm({
        title: locationsSection.data.title || "",
        subtitle: locationsSection.data.subtitle || "",
        cards: locationsSection.data.cards || [],
      });
      setIsVisible(locationsSection.visible);
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

  const handleCardChange = (
    cardId: number,
    field: keyof CardItem,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      cards: prev.cards.map((card) =>
        card.id === cardId ? { ...card, [field]: value } : card,
      ),
    }));
  };

  const addCard = () => {
    setForm((prev) => {
      const nextId =
        prev.cards.reduce((max, card) => Math.max(max, card.id), 0) + 1;

      return {
        ...prev,
        cards: [
          ...prev.cards,
          {
            id: nextId,
            title: "",
            time: "",
            location: "",
            text: "",
          },
        ],
      };
    });
  };

  const removeCard = (cardId: number) => {
    setForm((prev) => ({
      ...prev,
      cards: prev.cards.filter((card) => card.id !== cardId),
    }));
  };

  if (!locationsSection) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!config || !locationsSection) return;

    const newConfig: UniversalProjectConfig = {
      ...config,
      sections: config.sections.map((section) => {
        if (section.type !== "locations") {
          return section;
        }

        return {
          ...(section as LocationsSection),
          visible: isVisible,
          data: {
            ...(section as LocationsSection).data,
            title: form.title,
            subtitle: form.subtitle,
            cards: form.cards,
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
        <SheetTitle>Izmenite sekciju Lokacije </SheetTitle>
        <SheetDescription>
          Ovde mozete izmeniti sve vezano za Lokacije sekciju
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
          {form.cards.map((card, index) => (
            <FieldGroup key={card.id}>
              <Label>Kartica {index + 1}</Label>
              <Field>
                <Label htmlFor={`card-title-${card.id}`}>Naslov</Label>
                <Input
                  id={`card-title-${card.id}`}
                  placeholder="Naslov kartice"
                  value={card.title ?? ""}
                  onChange={(e) =>
                    handleCardChange(card.id, "title", e.target.value)
                  }
                />
              </Field>
              <Field>
                <Label htmlFor={`card-time-${card.id}`}>Vreme</Label>
                <Input
                  id={`card-time-${card.id}`}
                  placeholder="Vreme"
                  value={card.time ?? ""}
                  onChange={(e) =>
                    handleCardChange(card.id, "time", e.target.value)
                  }
                />
              </Field>
              <Field>
                <Label htmlFor={`card-location-${card.id}`}>Lokacija</Label>
                <Textarea
                  id={`card-location-${card.id}`}
                  placeholder="Adresa / lokacija"
                  value={card.location ?? ""}
                  onChange={(e) =>
                    handleCardChange(card.id, "location", e.target.value)
                  }
                />
              </Field>
              <Field>
                <Label htmlFor={`card-text-${card.id}`}>Opis</Label>
                <Textarea
                  id={`card-text-${card.id}`}
                  placeholder="Opis"
                  value={card.text ?? ""}
                  onChange={(e) =>
                    handleCardChange(card.id, "text", e.target.value)
                  }
                />
              </Field>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => removeCard(card.id)}
              >
                Ukloni karticu
              </Button>
            </FieldGroup>
          ))}
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={addCard}
          >
            Dodaj karticu
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

export default LocationsSectionEditModal;
