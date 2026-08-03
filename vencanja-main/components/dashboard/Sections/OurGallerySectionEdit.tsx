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
import { OurGallerySection } from "@/types/sections";
import SectionLoader from "../loaders/SectionLoader";

export const OurGallerySectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const ourGallerySection = getSection<OurGallerySection>("ourGallery");

  if (!ourGallerySection) {
    return null;
  }

  const isVisible = ourGallerySection.visible;
  const editModalHandler = () => openModal("our_gallery_edit");

  if (loading) {
    return <SectionLoader />;
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          Sekcija: <span className="font-bold">Galerija</span>
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
          {ourGallerySection.data.title}
        </p>
        <p>
          <span className="font-bold">Opis:</span>{" "}
          {ourGallerySection.data.description}
        </p>
        <p>
          <span className="font-bold">Broj slika:</span>{" "}
          {ourGallerySection.data.images?.length ?? 0}
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
