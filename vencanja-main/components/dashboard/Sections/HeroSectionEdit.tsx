import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useProject } from "../context/ProjectContext";
import { HeroSection } from "@/types/sections";
import SectionLoader from "../loaders/SectionLoader";
import { useDialog } from "../context/ModalContext";
import ImagePreviewInCard from "../ImagePrewiewInCard";

export const HeroSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const heroSection = getSection<HeroSection>("hero");

  if (!heroSection) {
    return null;
  }

  const isVisible = heroSection.visible;

  const editModalHandler = () => openModal("hero_edit");

  if (loading) {
    return <SectionLoader />;
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          Sekcija: <span className="font-bold">Naslovna</span>
        </CardTitle>
        <CardDescription
          className={`${isVisible ? "text-green-700" : "text-red-700"} font-bold`}
        >
          Status: {isVisible ? "Vidljiva na sajtu" : "Nije Vidljiva na sajtu"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-bold">Naslov:</span> {heroSection.data.title}
        </p>
        <p>
          <span className="font-bold">Podnaslov: </span>
          {heroSection.data.subtitle}
        </p>
        <div className="mt-4">
          <p className="mb-2 font-bold">Pozadinska Slika:</p>
          <ImagePreviewInCard
            src={heroSection.data.backgroundImage}
            alt="Hero pozadina"
          />
        </div>
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
