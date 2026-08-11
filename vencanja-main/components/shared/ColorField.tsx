"use client";

import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  /** Larger swatch for editor sidebars */
  size?: "sm" | "md" | "lg";
};

function normalizeHex(value: string): string {
  const raw = value.trim();
  if (/^#[0-9A-Fa-f]{6}$/.test(raw)) return raw;
  if (/^#[0-9A-Fa-f]{3}$/.test(raw)) {
    const [, a, b, c] = raw;
    return `#${a}${a}${b}${b}${c}${c}`.toLowerCase();
  }
  if (/^[0-9A-Fa-f]{6}$/.test(raw)) return `#${raw}`;
  return "#000000";
}

export function ColorField({
  label,
  value,
  onChange,
  className,
  size = "md",
}: Props) {
  const safeValue = normalizeHex(value || "#000000");
  const swatch =
    size === "lg"
      ? "h-16 w-16"
      : size === "sm"
        ? "h-9 w-9"
        : "h-11 w-14";

  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <label className="text-[14px] font-bold uppercase tracking-[0.2em]">
          {label}
        </label>
      ) : null}
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={safeValue}
          onChange={(e) => onChange(e.target.value)}
          onInput={(e) => onChange((e.target as HTMLInputElement).value)}
          aria-label={label || "Boja"}
          className={cn(
            "cursor-pointer rounded-xl border border-black/10 bg-transparent p-0 shadow-sm",
            swatch,
            "[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-[10px] [&::-webkit-color-swatch]:border-none",
            "[&::-moz-color-swatch]:rounded-[10px] [&::-moz-color-swatch]:border-none",
          )}
        />
        <span className="font-mono text-xs uppercase tracking-wider text-black/45">
          {safeValue}
        </span>
      </div>
    </div>
  );
}

export default ColorField;
