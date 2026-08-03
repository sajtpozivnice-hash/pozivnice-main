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
import { CardItem, LocationsSection } from "@/types/sections";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UniversalProjectConfig } from "@/types/config";
import { RepeaterItemCard } from "./RepeaterItemCard";
import { Badge } from "@/components/ui/badge";
import { SectionModalVisibilityBar } from "./SectionModalVisibilityBar";

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
    const confirmed = window.confirm(
      "Da li ste sigurni da želite da uklonite ovu lokaciju?",
    );
    if (!confirmed) return;

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
      <SheetHeader className="space-y-3">
        <div className="space-y-1">
          <SheetTitle>Lokacije</SheetTitle>
          <SheetDescription>
            Uredite naslov sekcije i kartice sa adresama, vremenima i opisima.
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
            <FieldDescription>Glavni naslov sekcije lokacija.</FieldDescription>
            <Input
              id="title"
              name="title"
              placeholder="npr. Lokacije"
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
              placeholder="npr. Važne adrese našeg dana"
              onChange={handleChange}
              value={form.subtitle ?? ""}
            />
          </Field>
        </FieldGroup>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold">Kartice lokacija</p>
              <p className="text-xs text-muted-foreground">
                Svaka kartica predstavlja jedno mesto ili događaj.
              </p>
            </div>
            <Badge variant="secondary">{form.cards.length}</Badge>
          </div>

          {form.cards.length === 0 ? (
            <div className="rounded-xl border border-dashed bg-muted/30 px-4 py-6 text-center">
              <p className="text-sm font-medium">Nema kartica</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Dodajte prvu lokaciju da gosti vide gde treba da dođu.
              </p>
            </div>
          ) : (
            form.cards.map((card, index) => (
              <RepeaterItemCard
                key={card.id}
                title={`Lokacija ${index + 1}`}
                onRemove={() => removeCard(card.id)}
                removeLabel="Ukloni"
              >
                <Field>
                  <FieldLabel htmlFor={`card-title-${card.id}`}>
                    Naslov
                  </FieldLabel>
                  <Input
                    id={`card-title-${card.id}`}
                    placeholder="npr. Crkveno venčanje"
                    value={card.title ?? ""}
                    onChange={(e) =>
                      handleCardChange(card.id, "title", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`card-time-${card.id}`}>Vreme</FieldLabel>
                  <Input
                    id={`card-time-${card.id}`}
                    placeholder="npr. 15:00"
                    value={card.time ?? ""}
                    onChange={(e) =>
                      handleCardChange(card.id, "time", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`card-location-${card.id}`}>
                    Adresa / lokacija
                  </FieldLabel>
                  <Textarea
                    id={`card-location-${card.id}`}
                    placeholder="Adresa ili naziv mesta"
                    value={card.location ?? ""}
                    onChange={(e) =>
                      handleCardChange(card.id, "location", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`card-text-${card.id}`}>Opis</FieldLabel>
                  <Textarea
                    id={`card-text-${card.id}`}
                    placeholder="Kratak opis za goste"
                    value={card.text ?? ""}
                    onChange={(e) =>
                      handleCardChange(card.id, "text", e.target.value)
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
            onClick={addCard}
          >
            <Plus className="h-4 w-4" />
            Dodaj lokaciju
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

export default LocationsSectionEditModal;
