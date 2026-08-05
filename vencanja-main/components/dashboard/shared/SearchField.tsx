"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  "aria-label"?: string;
};

const SearchField = ({
  value,
  onChange,
  placeholder = "Pretraži...",
  label = "Pretraga",
  "aria-label": ariaLabel,
}: SearchFieldProps) => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-1.5">
      {label ? (
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span>{label}</span>
        </div>
      ) : null}
      <div className="relative w-full min-w-0">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-9 pr-9 pl-9"
          aria-label={ariaLabel ?? label}
        />
        {value ? (
          <button
            type="button"
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={() => onChange("")}
            aria-label="Obriši pretragu"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default SearchField;
