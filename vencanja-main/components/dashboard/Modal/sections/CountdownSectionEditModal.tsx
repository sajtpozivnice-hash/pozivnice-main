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
import { CountdownSection, HeroSection } from "@/types/sections";
import { useEffect, useState } from "react";
import { UniversalProjectConfig } from "@/types/config";

const CountdownSectionEditModal = () => {
  const { closeModal } = useDialog();
  const { config, saving, getSection, saveConfig } = useProject();
  const countdownSection = getSection<CountdownSection>("countdown");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (countdownSection) {
      setForm({
        title: countdownSection.data.title || "",
        description: countdownSection.data.description || "",
      });
      setIsVisible(countdownSection.visible);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!countdownSection) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!config || !countdownSection) return;

    const newConfig: UniversalProjectConfig = {
      ...config,
      sections: config.sections.map((section) => {
        if (section.type !== "countdown") {
          return section;
        }

        return {
          ...(section as CountdownSection),
          visible: isVisible,
          data: {
            ...(section as CountdownSection).data,
            title: form.title,
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
        <SheetTitle>Izmenite sekciju Odbrojavanja </SheetTitle>
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

export default CountdownSectionEditModal;
