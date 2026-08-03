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
import { HeroSection } from "@/types/sections";
import { useEffect, useState } from "react";
import ImagePreviewInput from "../../ImagePreviewInput";
import { UniversalProjectConfig } from "@/types/config";

const HeroSectionEditModal = () => {
  const { closeModal } = useDialog();
  const { config, saving, getSection, saveConfig } = useProject();
  const heroSection = getSection<HeroSection>("hero");
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    backgroundImage: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (heroSection) {
      setForm({
        title: heroSection.data.title,
        subtitle: heroSection.data.subtitle ?? "",
        backgroundImage: heroSection.data.backgroundImage ?? "",
      });

      setIsVisible(heroSection.visible);
    }
  }, [heroSection]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!heroSection) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!config || !heroSection) return;

    const newConfig: UniversalProjectConfig = {
      ...config,
      sections: config.sections.map((section) => {
        if (section.type !== "hero") {
          return section;
        }

        return {
          ...(section as HeroSection),
          visible: isVisible,
          data: {
            ...(section as HeroSection).data,
            title: form.title,
            subtitle: form.subtitle,
            backgroundImage: form.backgroundImage,
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
        <SheetTitle>Izmenite Hero sekciju </SheetTitle>
        <SheetDescription>
          Ovde mozete izmeniti sve vezano za Hero sekciju
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
              placeholder="Upišite glavni naslov za Hero sekciju"
              onChange={handleChange}
              value={form.title ?? ""}
            />
          </Field>
          <Field>
            <Label htmlFor="subtitle">Izmenite Podnaslov</Label>
            <Input
              id="subtitle"
              name="subtitle"
              placeholder="Upišite podnaslov za Hero sekciju"
              onChange={handleChange}
              value={form.subtitle ?? ""}
            />
          </Field>
          <Field>
            <ImagePreviewInput
              preview={form.backgroundImage}
              label="Izmenite Pozadinsku Sliku"
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

export default HeroSectionEditModal;
