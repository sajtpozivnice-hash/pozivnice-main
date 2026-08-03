"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { toast } from "sonner";

export type GuestOption = {
  value: string;
  label: string;
};

type Props = {
  options: GuestOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  available?: number;
};

export default function GuestMultiSelect({
  options,
  value,
  onChange,
  placeholder = "Lista gostiju koji nisu rasporedjeni...",
  available,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((x) => x !== id));
      return;
    }

    if (typeof available === "number" && value.length >= available) {
      toast.error(`Za ovaj sto možete dodati još ${available} gosta.`);
      return;
    }

    onChange([...value, id]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between min-h-10"
        >
          <div className="flex flex-wrap gap-1">
            {value.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              options
                .filter((o) => value.includes(o.value))
                .map((o) => (
                  <Badge key={o.value} variant="secondary">
                    {o.label}
                  </Badge>
                ))
            )}
          </div>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Pretraži gosta..." />

          <CommandList>
            <CommandEmpty>Nema rezultata.</CommandEmpty>

            <CommandGroup>
              {options.map((guest) => {
                const limitReached =
                  typeof available === "number" &&
                  !value.includes(guest.value) &&
                  value.length >= available;
                return (
                  <CommandItem
                    key={guest.value}
                    value={guest.label}
                    onSelect={() => toggle(guest.value)}
                    disabled={limitReached}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(guest.value)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />

                    {guest.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
