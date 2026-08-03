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
import { RSVPSection } from "@/types/sections";
import SectionLoader from "../loaders/SectionLoader";

export const RSVPSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const rsvpSection = getSection<RSVPSection>("rsvp");

  if (!rsvpSection) {
    return null;
  }

  const isVisible = rsvpSection.visible;
  const editModalHandler = () => openModal("rsvp_edit");

  if (loading) {
    return <SectionLoader />;
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          Sekcija: <span className="font-bold">Potvrde Dolazaka</span>
        </CardTitle>
        <CardDescription
          className={`${isVisible ? "text-green-700" : "text-red-700"} font-bold`}
        >
          Status: {isVisible ? "Vidljiva na sajtu" : "Nije Vidljiva na sajtu"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-bold">Naslov:</span> {rsvpSection.data.title}
        </p>
        <p>
          <span className="font-bold">Opis:</span>{" "}
          {rsvpSection.data.description}
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
