import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectInputProps = {
  items: SelectOption[];
  value?: string;
  onChange: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
};

const SelectInput: FC<SelectInputProps> = ({
  items,
  value,
  onChange,
  placeholder = "Izaberite...",
  disabled,
}) => {
  const selectedLabel = items.find((item) => item.value === value)?.label;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full" render={<div className="w-full" />}>
          <Select value={value} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger className="h-9 w-full min-w-0 justify-between">
              {selectedLabel ? (
                <span className="truncate">{selectedLabel}</span>
              ) : (
                <SelectValue placeholder={placeholder} />
              )}
            </SelectTrigger>

            <SelectContent
              alignItemWithTrigger={false}
              align="start"
              className="w-[var(--anchor-width)] max-w-[calc(100vw-1.5rem)]"
            >
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                    className="items-start whitespace-normal"
                  >
                    <span className="whitespace-normal break-words">
                      {item.label}
                    </span>
                    {item.disabled && (
                      <span className="text-xs text-red-500">Popunjen</span>
                    )}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </TooltipTrigger>
        {disabled && (
          <TooltipContent>
            Gost mora imati status "Dolazi" da bi mogao biti raspoređen za sto.
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SelectInput;
