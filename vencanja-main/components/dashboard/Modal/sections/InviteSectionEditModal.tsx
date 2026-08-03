import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDialog } from "../../context/ModalContext";
import Loader from "../../loaders/Loader";
import { useProject } from "../../context/ProjectContext";
import { InviteTextSection } from "@/types/sections";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UniversalProjectConfig } from "@/types/config";
import { SectionModalVisibilityBar } from "./SectionModalVisibilityBar";

const InviteSectionEditModal = () => {
  const { closeModal } = useDialog();
  const { config, saving, getSection, saveConfig } = useProject();
  const [isVisible, setIsVisible] = useState(false);
  const textInviteSection = getSection<InviteTextSection>("inviteText");
  const [form, setForm] = useState({
    description: "",
  });

  useEffect(() => {
    if (textInviteSection) {
      setForm({
        description: textInviteSection?.data?.description || "",
      });
      setIsVisible(textInviteSection.visible);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!textInviteSection) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!config || !textInviteSection) return;

    const newConfig: UniversalProjectConfig = {
      ...config,
      sections: config.sections.map((section) => {
        if (section.type !== "inviteText") {
          return section;
        }

        return {
          ...(section as InviteTextSection),
          visible: isVisible,
          data: {
            ...(section as InviteTextSection).data,
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
      <SheetHeader className="space-y-3">
        <div className="space-y-1">
          <SheetTitle>Tekst pozivnice</SheetTitle>
          <SheetDescription>
            Uredite tekst pozivnice koji gosti vide na sajtu.
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
            <FieldLabel htmlFor="description">Tekst</FieldLabel>
            <FieldDescription>
              Glavni tekst pozivnice u ovoj sekciji.
            </FieldDescription>
            <Textarea
              id="description"
              name="description"
              placeholder="Upišite tekst pozivnice"
              onChange={handleChange}
              value={form.description ?? ""}
            />
          </Field>
        </FieldGroup>
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

export default InviteSectionEditModal;
