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
import { LoveQuoteSection } from "@/types/sections";
import SectionLoader from "../loaders/SectionLoader";

export const LoveQuoteSectionEdit = () => {
  const { openModal } = useDialog();
  const { getSection, loading } = useProject();
  const loveQuoteSection = getSection<LoveQuoteSection>("loveQuote");

  if (!loveQuoteSection) {
    return null;
  }

  const isVisible = loveQuoteSection.visible;
  const editModalHandler = () => openModal("love_quote_edit");

  if (loading) {
    return <SectionLoader />;
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          Sekcija: <span className="font-bold">Ljubavni Citat</span>
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
          {loveQuoteSection.data.title}
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
