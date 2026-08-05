"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type FilterEmptyStateProps = {
  title: string;
  description?: string;
  onReset: () => void;
  resetLabel?: string;
  action?: ReactNode;
};

const FilterEmptyState = ({
  title,
  description,
  onReset,
  resetLabel = "Resetuj filtere",
  action,
}: FilterEmptyStateProps) => {
  return (
    <div className="dashboard-fade-in rounded-2xl border border-dashed border-border/70 bg-gradient-to-b from-muted/30 to-white px-4 py-10 text-center shadow-sm">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {description ? (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      ) : null}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={onReset}
        >
          {resetLabel}
        </Button>
        {action}
      </div>
    </div>
  );
};

export default FilterEmptyState;
