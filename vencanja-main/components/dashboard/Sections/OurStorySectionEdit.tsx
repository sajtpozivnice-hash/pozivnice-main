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
import { OurStorySection } from "@/types/sections";
import SectionLoader from "../loaders/SectionLoader";
import ImagePreviewInCard from "../ImagePrewiewInCard";

export const OurStorySectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const ourStorySection = getSection<OurStorySection>("ourStory");

  if (!ourStorySection) {
    return null;
  }

  const isVisible = ourStorySection.visible;
  const editModalHandler = () => openModal("our_story_edit");

  if (loading) {
    return <SectionLoader />;
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          Sekcija: <span className="font-bold">Naša Priča</span>
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
          {ourStorySection.data.title}
        </p>
        <p>
          <span className="font-bold">Podnaslov:</span>{" "}
          {ourStorySection.data.overline}
        </p>
        <p>
          <span className="font-bold">Opis:</span> {ourStorySection.data.text}
        </p>
        <div className="mt-4">
          <p className="mb-2 font-bold">Pozadinska Slika:</p>
          <ImagePreviewInCard
            src={ourStorySection.data.image}
            alt="Nasa prica slika"
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
