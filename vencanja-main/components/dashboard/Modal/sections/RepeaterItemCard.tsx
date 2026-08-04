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
    <div className="space-y-3 rounded-xl border bg-muted/20 p-3 shadow-sm sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
          {title}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0 cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
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
