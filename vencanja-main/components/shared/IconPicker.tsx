"use client";

import { cn } from "@/lib/utils";
import {
  FEATURE_ICON_OPTIONS,
  type FeatureIconOption,
} from "@/helpers/featureIcons";

type Props = {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  options?: FeatureIconOption[];
  className?: string;
};

export function IconPicker({
  label,
  value,
  onChange,
  options = FEATURE_ICON_OPTIONS,
  className,
}: Props) {
  const selected = (value || "").trim().toLowerCase();

  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <label className="text-[14px] font-bold uppercase tracking-[0.2em]">
          {label}
        </label>
      ) : null}
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
        {options.map(({ id, label: iconLabel, Icon }) => {
          const isActive =
            selected === id ||
            (id === "map-pin" && selected === "mappin");

          return (
            <button
              key={id}
              type="button"
              title={iconLabel}
              aria-label={iconLabel}
              aria-pressed={isActive}
              onClick={() => onChange(id)}
              className={cn(
                "flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border transition-all",
                isActive
                  ? "border-black bg-black text-white shadow-md"
                  : "border-black/10 bg-white text-black/70 hover:border-black/25 hover:bg-black/[0.03]",
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
              <span className="max-w-full truncate px-1 text-[9px] font-semibold uppercase tracking-wide">
                {iconLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default IconPicker;
