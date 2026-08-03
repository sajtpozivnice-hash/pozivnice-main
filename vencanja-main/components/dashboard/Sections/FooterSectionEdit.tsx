import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDialog } from "../context/ModalContext";
import { useProject } from "../context/ProjectContext";
import { FooterSection, InviteTextSection } from "@/types/sections";
import SectionLoader from "../loaders/SectionLoader";

export const FooterSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const footerSection = getSection<FooterSection>("footer");

  if (!footerSection) {
    return null;
  }

  const isVisible = footerSection.visible;
  const editModalHandler = () => openModal("footer_edit");

  if (loading) {
    return <SectionLoader />;
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          Sekcija: <span className="font-bold">Zaglavlje Sajta</span>
        </CardTitle>
        <CardDescription
          className={`${isVisible ? "text-green-700" : "text-red-700"} font-bold`}
        >
          Status: {isVisible ? "Vidljiva na sajtu" : "Nije Vidljiva na sajtu"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-bold">Naslov:</span> {footerSection.data.title}
        </p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          onClick={editModalHandler}
        >
          Izmeni / Podesi Sekciju
        </Button>
      </CardFooter>
    </Card>
  );
};
