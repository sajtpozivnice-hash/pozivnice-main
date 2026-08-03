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
import { ScheduleSection } from "@/types/sections";
import SectionLoader from "../loaders/SectionLoader";

export const ScheduleSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const scheduleSection = getSection<ScheduleSection>("schedule");

  if (!scheduleSection) {
    return null;
  }

  const isVisible = scheduleSection.visible;
  const editModalHandler = () => openModal("schedule_edit");

  if (loading) {
    return <SectionLoader />;
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          Sekcija: <span className="font-bold">Raspored</span>
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
          {scheduleSection.data.title}
        </p>
        <p>
          <span className="font-bold">Podnaslov:</span>{" "}
          {scheduleSection.data.subtitle}
        </p>
        <p>
          <span className="font-bold">Broj stavki:</span>{" "}
          {scheduleSection.data.items?.length ?? 0}
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
