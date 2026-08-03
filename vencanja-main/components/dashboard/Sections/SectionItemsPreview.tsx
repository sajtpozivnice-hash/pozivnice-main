import { ReactNode } from "react";

type SectionItemsPreviewProps = {
  label: string;
  emptyTitle: string;
  emptyDescription: string;
  count: number;
  children?: ReactNode;
};

export const SectionItemsPreview = ({
  label,
  emptyTitle,
  emptyDescription,
  count,
  children,
}: SectionItemsPreviewProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {count}
        </span>
      </div>

      {count === 0 ? (
        <div className="rounded-xl border border-dashed bg-muted/30 px-3 py-4 text-center">
          <p className="text-sm font-medium text-foreground">{emptyTitle}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {emptyDescription}
          </p>
        </div>
      ) : (
        <div className="space-y-2">{children}</div>
      )}
    </div>
  );
};
