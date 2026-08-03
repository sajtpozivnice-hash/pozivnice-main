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
import { InviteTextSection, UploadImagesSection } from "@/types/sections";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UniversalProjectConfig } from "@/types/config";

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
      <SheetHeader>
        <SheetTitle>Izmenite sekciju Dodavajne Slika </SheetTitle>
        <SheetDescription>
          Ovde mozete izmeniti sve vezano za UploadImagesSection sekciju
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
            <Textarea
              id="title"
              name="title"
              placeholder="Upišite naslov"
              onChange={handleChange}
              value={form.title ?? ""}
            />
          </Field>
          <Field>
            <Label htmlFor="subtitle">Izmenite Podnaslov</Label>
            <Textarea
              id="subtitle"
              name="subtitle"
              placeholder="Upišite podnaslov"
              onChange={handleChange}
              value={form.subtitle ?? ""}
            />
          </Field>
          <Field>
            <Label htmlFor="description">Izmenite Opis</Label>
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

export default ImageUploadSectionEditModal;
