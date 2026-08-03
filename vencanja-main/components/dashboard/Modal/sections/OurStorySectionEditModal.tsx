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
import { OurStorySection } from "@/types/sections";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UniversalProjectConfig } from "@/types/config";
import ImagePreviewInput from "../../ImagePreviewInput";

const OurStorySectionEditModal = () => {
  const { closeModal } = useDialog();
  const { config, saving, getSection, saveConfig } = useProject();
  const ourStorySection = getSection<OurStorySection>("ourStory");
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({
    title: "",
    overline: "",
    text: "",
    image: "",
  });

  useEffect(() => {
    if (ourStorySection) {
      setForm({
        title: ourStorySection.data.title || "",
        overline: ourStorySection.data.overline || "",
        text: ourStorySection.data.text || "",
        image: ourStorySection.data.image || "",
      });
      setIsVisible(ourStorySection.visible);
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

  if (!ourStorySection) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!config || !ourStorySection) return;

    const newConfig: UniversalProjectConfig = {
      ...config,
      sections: config.sections.map((section) => {
        if (section.type !== "ourStory") {
          return section;
        }

        return {
          ...(section as OurStorySection),
          visible: isVisible,
          data: {
            ...(section as OurStorySection).data,
            title: form.title,
            overline: form.overline,
            text: form.text,
            image: form.image,
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
        <SheetTitle>Izmenite sekciju Naša Priča </SheetTitle>
        <SheetDescription>
          Ovde mozete izmeniti sve vezano za Naša Priča sekciju
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
            <Label htmlFor="overline">Izmenite Podnaslov</Label>
            <Input
              id="overline"
              name="overline"
              placeholder="Upišite podnaslov sekcije"
              onChange={handleChange}
              value={form.overline ?? ""}
            />
          </Field>
          <Field>
            <Label htmlFor="text">Izmenite Opis</Label>
            <Textarea
              id="text"
              name="text"
              placeholder="Upišite tekst priče"
              onChange={handleChange}
              value={form.text ?? ""}
            />
          </Field>
          <Field>
            <ImagePreviewInput
              preview={form.image}
              label="Izmenite Sliku"
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

export default OurStorySectionEditModal;
