"use client";

type FieldProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
  className?: string;
};

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  disabled,
  hint,
  className = "",
}: FieldProps) {
  return (
    <label className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      {label ? (
        <span className="text-sm font-medium text-[var(--foreground)]">
          {label}
          {required ? <span className="text-red-500"> *</span> : null}
        </span>
      ) : null}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full min-w-0 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)] disabled:opacity-60"
      />
      {hint ? <span className="text-xs text-[var(--muted)]">{hint}</span> : null}
    </label>
  );
}

type TextAreaProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
  className?: string;
  rows?: number;
  mono?: boolean;
};

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  hint,
  className = "",
  rows = 10,
  mono,
}: TextAreaProps) {
  return (
    <label className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      {label ? (
        <span className="text-sm font-medium text-[var(--foreground)]">
          {label}
          {required ? <span className="text-red-500"> *</span> : null}
        </span>
      ) : null}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        spellCheck={false}
        className={`w-full min-w-0 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)] disabled:opacity-60 ${
          mono ? "font-mono text-xs leading-relaxed" : ""
        }`}
      />
      {hint ? <span className="text-xs text-[var(--muted)]">{hint}</span> : null}
    </label>
  );
}

type SelectProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export function SelectField({
  label,
  value,
  onChange,
  options,
  required,
  disabled,
  className = "",
}: SelectProps) {
  return (
    <label className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      {label ? (
        <span className="text-sm font-medium text-[var(--foreground)]">
          {label}
          {required ? <span className="text-red-500"> *</span> : null}
        </span>
      ) : null}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className="w-full min-w-0 max-w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)] disabled:opacity-60"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
