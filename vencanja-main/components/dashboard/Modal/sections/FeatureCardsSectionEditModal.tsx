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
import { FeatureCardItem, FeatureCardsSection } from "@/types/sections";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UniversalProjectConfig } from "@/types/config";
import { RepeaterItemCard } from "./RepeaterItemCard";
import { SectionModalVisibilityBar } from "./SectionModalVisibilityBar";
import EditorImage from "@/editor/components/EditorImage";

type FeatureCardsForm = {
  title: string;
  subtitle: string;
  description: string;
  cards: FeatureCardItem[];
};

const FeatureCardsSectionEditModal = () => {
  const { closeModal } = useDialog();
  const { config, saving, getSection, saveConfig } = useProject();
  const section = getSection<FeatureCardsSection>("featureCards");
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState<FeatureCardsForm>({
    title: "",
    subtitle: "",
    description: "",
    cards: [],
  });

  useEffect(() => {
    if (section) {
      setForm({
        title: section.data.title || "",
        subtitle: section.data.subtitle || "",
        description: section.data.description || "",
        cards: section.data.cards || [],
      });
      setIsVisible(section.visible);
    }
  }, [section]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCardChange = (
    cardId: string,
    field: keyof FeatureCardItem,
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
    setForm((prev) => ({
      ...prev,
      cards: [
        ...prev.cards,
        {
          id: crypto.randomUUID(),
          title: "",
          description: "",
          icon: "sparkles",
          accent: "#FF5C8A",
          image: "",
        },
      ],
    }));
  };

  const removeCard = (cardId: string) => {
    const confirmed = window.confirm(
      "Da li ste sigurni da želite da uklonite ovu karticu?",
    );
    if (!confirmed) return;
    setForm((prev) => ({
      ...prev,
      cards: prev.cards.filter((card) => card.id !== cardId),
    }));
  };

  if (!section) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config || !section) return;

    const newConfig: UniversalProjectConfig = {
      ...config,
      sections: config.sections.map((current) => {
        if (current.type !== "featureCards") {
          return current;
        }

        return {
          ...(current as FeatureCardsSection),
          visible: isVisible,
          data: {
            ...(current as FeatureCardsSection).data,
            title: form.title,
            subtitle: form.subtitle,
            description: form.description,
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
          <SheetTitle>{section.name || "Informacije"}</SheetTitle>
          <SheetDescription>
            Uredite kartice sa napomenama za goste (pokloni, dress code…).
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
              value={form.title}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="subtitle">Podnaslov</FieldLabel>
            <Input
              id="subtitle"
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Opis</FieldLabel>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
          </Field>
        </FieldGroup>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Kartice</p>
            <Button type="button" variant="outline" size="sm" onClick={addCard}>
              <Plus className="h-4 w-4" />
              Dodaj
            </Button>
          </div>

          {form.cards.map((card, index) => (
            <RepeaterItemCard
              key={card.id}
              title={`Kartica ${index + 1}`}
              onRemove={() => removeCard(card.id)}
            >
              <Field>
                <FieldLabel>Naslov</FieldLabel>
                <Input
                  value={card.title}
                  onChange={(e) =>
                    handleCardChange(card.id, "title", e.target.value)
                  }
                />
              </Field>
              <Field>
                <FieldLabel>Opis</FieldLabel>
                <Textarea
                  value={card.description ?? ""}
                  onChange={(e) =>
                    handleCardChange(card.id, "description", e.target.value)
                  }
                  rows={3}
                />
              </Field>
              <Field>
                <FieldLabel>Ikonica</FieldLabel>
                <FieldDescription>
                  gift, shirt, baby, info, party, music, camera, sparkles
                </FieldDescription>
                <Input
                  value={card.icon ?? ""}
                  onChange={(e) =>
                    handleCardChange(card.id, "icon", e.target.value)
                  }
                />
              </Field>
              <Field>
                <FieldLabel>Boja (hex)</FieldLabel>
                <Input
                  value={card.accent ?? ""}
                  onChange={(e) =>
                    handleCardChange(card.id, "accent", e.target.value)
                  }
                />
              </Field>
              <EditorImage
                label="Slika"
                value={card.image ?? ""}
                onChange={(value) => handleCardChange(card.id, "image", value)}
              />
            </RepeaterItemCard>
          ))}
        </div>

        <SheetFooter>
          <Button type="button" variant="outline" onClick={closeModal}>
            Otkaži
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? <Loader /> : "Sačuvaj"}
          </Button>
        </SheetFooter>
      </form>
    </>
  );
};

export default FeatureCardsSectionEditModal;
