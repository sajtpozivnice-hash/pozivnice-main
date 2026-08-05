"use client";

import { LucideIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { STAT_TONE_CLASSES, StatTone } from "../theme";

export type SummaryStatItem = {
  label: string;
  value: string;
  icon?: LucideIcon;
  tone?: StatTone;
  hint?: string;
  progress?: number;
};

type SummaryStatsProps = {
  items: SummaryStatItem[];
  className?: string;
};

const SummaryStats = ({ items, className = "" }: SummaryStatsProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4",
        className,
      )}
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        const tone = item.tone ?? (["sky", "emerald", "violet", "orange"] as const)[index % 4];
        const classes = STAT_TONE_CLASSES[tone];

        return (
          <div
            key={item.label}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br p-4 shadow-[0_1px_2px_rgb(15_23_42_/_0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgb(15_23_42_/_0.08)]",
              classes.soft,
            )}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {item.label}
              </p>
              {Icon ? (
                <span
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105",
                    classes.chip,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
              ) : null}
            </div>
            <p className={cn("text-2xl font-semibold tracking-tight", classes.ink)}>
              {item.value}
            </p>
            {item.hint ? (
              <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
            ) : null}
            {typeof item.progress === "number" ? (
              <div className="mt-3">
                <Progress
                  value={Math.max(0, Math.min(item.progress, 100))}
                  className={cn("gap-0", classes.bar)}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default SummaryStats;
