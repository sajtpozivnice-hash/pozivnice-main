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
import { LocationsSection } from "@/types/sections";
import SectionLoader from "../loaders/SectionLoader";

export const LocationsSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const locationsSection = getSection<LocationsSection>("locations");

  if (!locationsSection) {
    return null;
  }

  const isVisible = locationsSection.visible;
  const editModalHandler = () => openModal("locations_edit");

  if (loading) {
    return <SectionLoader />;
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          Sekcija: <span className="font-bold">Lokacije</span>
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
          {locationsSection.data.title}
        </p>
        <p>
          <span className="font-bold">Podnaslov:</span>{" "}
          {locationsSection.data.subtitle}
        </p>
        <p>
          <span className="font-bold">Broj kartica:</span>{" "}
          {locationsSection.data.cards?.length ?? 0}
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
