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
import { CalendarSection } from "@/types/sections";
import SectionLoader from "../loaders/SectionLoader";

export const CalendarSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const calendarSection = getSection<CalendarSection>("calendar");

  if (!calendarSection) {
    return null;
  }

  const isVisible = calendarSection.visible;
  const editModalHandler = () => openModal("calendar_edit");

  if (loading) {
    return <SectionLoader />;
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          Sekcija: <span className="font-bold">Kalendar</span>
        </CardTitle>
        <CardDescription
          className={`${isVisible ? "text-green-700" : "text-red-700"} font-bold`}
        >
          Status: {isVisible ? "Vidljiva na sajtu" : "Nije Vidljiva na sajtu"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-bold">Naslov:</span>{" "}
          {calendarSection.data.title}
        </p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full cursor-pointer" onClick={editModalHandler}>
          Izmeni / Podesi Sekciju
        </Button>
      </CardFooter>
    </Card>
  );
};
