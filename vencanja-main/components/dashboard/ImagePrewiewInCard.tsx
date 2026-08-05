import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

type Props = {
  src?: string;
  alt?: string;
  className?: string;
};

const ImagePreviewInCard = ({
  src,
  alt = "Preview slike",
  className,
}: Props) => {
  return (
    <Card className={className}>
      <CardContent className="p-2">
        {src ? (
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className="flex aspect-square flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground">
            <ImageIcon size={32} />
            <p className="mt-2 text-sm">Nema slike</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImagePreviewInCard;
