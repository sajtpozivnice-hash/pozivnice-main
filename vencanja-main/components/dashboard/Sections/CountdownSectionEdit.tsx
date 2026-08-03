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
import { CountdownSection } from "@/types/sections";
import SectionLoader from "../loaders/SectionLoader";

export const CountdownSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const countdownSection = getSection<CountdownSection>("countdown");

  if (!countdownSection) {
    return null;
  }

  const isVisible = countdownSection.visible;
  const editModalHandler = () => openModal("countdown_edit");

  if (loading) {
    return <SectionLoader />;
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          Sekcija: <span className="font-bold">Odbrojavanja</span>
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
          {countdownSection.data.title}
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
