import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type RepeaterItemCardProps = {
  title: string;
  onRemove: () => void;
  removeLabel?: string;
  children: ReactNode;
};

export const RepeaterItemCard = ({
  title,
  onRemove,
  removeLabel = "Ukloni",
  children,
}: RepeaterItemCardProps) => {
  return (
    <div className="space-y-3 rounded-xl border bg-muted/20 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={onRemove}
        >
          <Trash2 className="h-3.5 w-3.5" />
          {removeLabel}
        </Button>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
};
