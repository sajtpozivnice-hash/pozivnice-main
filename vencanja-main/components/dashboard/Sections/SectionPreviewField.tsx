type SectionPreviewFieldProps = {
  label: string;
  value?: string | number | null;
  multiline?: boolean;
};

export const SectionPreviewField = ({
  label,
  value,
  multiline = false,
}: SectionPreviewFieldProps) => {
  const displayValue =
    value === undefined || value === null || value === ""
      ? "—"
      : String(value);

  return (
    <div className="space-y-1">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={
          multiline
            ? "line-clamp-3 text-sm leading-relaxed text-foreground"
            : "truncate text-sm font-medium text-foreground"
        }
      >
        {displayValue}
      </p>
    </div>
  );
};
