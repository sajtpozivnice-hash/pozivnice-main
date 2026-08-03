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
import { OurGallerySection } from "@/types/sections";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UniversalProjectConfig } from "@/types/config";

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
      <SheetHeader>
        <SheetTitle>Izmenite sekciju Galerija </SheetTitle>
        <SheetDescription>
          Ovde mozete izmeniti sve vezano za Galerija sekciju
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
            <Label htmlFor="description">Izmenite Opis</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Upišite opis sekcije"
              onChange={handleChange}
              value={form.description ?? ""}
            />
          </Field>
          {form.images.map((image, index) => (
            <FieldGroup key={`gallery-image-${index}`}>
              <Label>Slika {index + 1}</Label>
              <Field>
                <Label htmlFor={`image-url-${index}`}>URL slike</Label>
                <Input
                  id={`image-url-${index}`}
                  placeholder="https://..."
                  value={image.url ?? ""}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                />
              </Field>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => removeImage(index)}
              >
                Ukloni sliku
              </Button>
            </FieldGroup>
          ))}
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={addImage}
          >
            Dodaj sliku
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

export default OurGallerySectionEditModal;
