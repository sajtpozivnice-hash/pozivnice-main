"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type DemoBannerProps = {
  onReset: () => void;
};

export function DemoBanner({ onReset }: DemoBannerProps) {
  return (
    <div className="sticky top-0 z-50 border-b border-amber-200/80 bg-amber-50/95 text-amber-950 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-5 md:px-7">
        <p className="text-sm leading-snug">
          <span className="font-medium">Demo verzija</span>
          <span className="text-amber-900/80">
            {" "}
            — izmene se ne čuvaju. Osvežavanje stranice vraća početno stanje.
          </span>
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0 border-amber-300 bg-white/80 text-amber-950 hover:bg-white"
          onClick={onReset}
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
          Vrati početno stanje
        </Button>
      </div>
    </div>
  );
}
