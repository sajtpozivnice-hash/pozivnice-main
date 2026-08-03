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
        <TooltipTrigger>
          <Select value={value} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger className="w-full">
              {selectedLabel ? (
                <span>{selectedLabel}</span>
              ) : (
                <SelectValue placeholder={placeholder} />
              )}
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                  >
                    <span>{item.label}</span>
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
