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
import { UploadImagesSection } from "@/types/sections";
import SectionLoader from "../loaders/SectionLoader";

export const ImageUploadSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const imageUploadSection = getSection<UploadImagesSection>(
    "uploadImagesSection",
  );

  if (!imageUploadSection) {
    return null;
  }

  const isVisible = imageUploadSection.visible;
  const editModalHandler = () => openModal("upload_image_edit");

  if (loading) {
    return <SectionLoader />;
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          Sekcija: <span className="font-bold">Dodavanja Slika</span>
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
          {imageUploadSection.data.description}
        </p>
        <p>
          <span className="font-bold">Podnaslov:</span>{" "}
          {imageUploadSection.data.subtitle}
        </p>
        <p>
          <span className="font-bold">Opis:</span>{" "}
          {imageUploadSection.data.description}
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
