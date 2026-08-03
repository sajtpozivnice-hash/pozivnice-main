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
import { OurGallerySection } from "@/types/sections";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UniversalProjectConfig } from "@/types/config";
import { RepeaterItemCard } from "./RepeaterItemCard";
import { Badge } from "@/components/ui/badge";
import { SectionModalVisibilityBar } from "./SectionModalVisibilityBar";

type GalleryImage = OurGallerySection["data"]["images"][number];

type OurGalleryForm = {
  title: string;
  description: string;
  images: GalleryImage[];
};

const OurGallerySectionEditModal = () => {
  const { closeModal } = useDialog();
  const { config, saving, getSection, saveConfig } = useProject();
  const ourGallerySection = getSection<OurGallerySection>("ourGallery");
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState<OurGalleryForm>({
    title: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    if (ourGallerySection) {
      setForm({
        title: ourGallerySection.data.title || "",
        description: ourGallerySection.data.description || "",
        images: ourGallerySection.data.images || [],
      });
      setIsVisible(ourGallerySection.visible);
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

  const handleImageChange = (index: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.map((image, imageIndex) =>
        imageIndex === index ? { ...image, url: value } : image,
      ),
    }));
  };

  const addImage = () => {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, { url: "" }],
    }));
  };

  const removeImage = (index: number) => {
    const confirmed = window.confirm(
      "Da li ste sigurni da želite da uklonite ovu sliku?",
    );
    if (!confirmed) return;

    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, imageIndex) => imageIndex !== index),
    }));
  };

  if (!ourGallerySection) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!config || !ourGallerySection) return;

    const newConfig: UniversalProjectConfig = {
      ...config,
      sections: config.sections.map((section) => {
        if (section.type !== "ourGallery") {
          return section;
        }

        return {
          ...(section as OurGallerySection),
          visible: isVisible,
          data: {
            ...(section as OurGallerySection).data,
            title: form.title,
            description: form.description,
            images: form.images,
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
          <SheetTitle>Galerija</SheetTitle>
          <SheetDescription>
            Uredite naslov, opis i listu fotografija galerije.
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
            <FieldDescription>Glavni naslov galerije.</FieldDescription>
            <Input
              id="title"
              name="title"
              placeholder="npr. Naša galerija"
              onChange={handleChange}
              value={form.title ?? ""}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Opis</FieldLabel>
            <FieldDescription>
              Kratki tekst iznad fotografija.
            </FieldDescription>
            <Textarea
              id="description"
              name="description"
              placeholder="Opis galerije"
              onChange={handleChange}
              value={form.description ?? ""}
            />
          </Field>
        </FieldGroup>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold">Fotografije</p>
              <p className="text-xs text-muted-foreground">
                Dodajte URL svake slike koju želite da prikažete.
              </p>
            </div>
            <Badge variant="secondary">{form.images.length}</Badge>
          </div>

          {form.images.length === 0 ? (
            <div className="rounded-xl border border-dashed bg-muted/30 px-4 py-6 text-center">
              <p className="text-sm font-medium">Nema slika</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Dodajte prvu fotografiju u galeriju.
              </p>
            </div>
          ) : (
            form.images.map((image, index) => (
              <RepeaterItemCard
                key={`gallery-image-${index}`}
                title={`Slika ${index + 1}`}
                onRemove={() => removeImage(index)}
              >
                <Field>
                  <FieldLabel htmlFor={`image-url-${index}`}>
                    URL slike
                  </FieldLabel>
                  <Input
                    id={`image-url-${index}`}
                    placeholder="https://..."
                    value={image.url ?? ""}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                  />
                </Field>
                {image.url ? (
                  <div className="overflow-hidden rounded-lg border">
                    <img
                      src={image.url}
                      alt={`Pregled ${index + 1}`}
                      className="h-28 w-full object-cover"
                    />
                  </div>
                ) : null}
              </RepeaterItemCard>
            ))
          )}

          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            onClick={addImage}
          >
            <Plus className="h-4 w-4" />
            Dodaj sliku
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

export default OurGallerySectionEditModal;
