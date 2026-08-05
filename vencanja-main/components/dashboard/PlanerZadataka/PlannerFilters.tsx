"use client";

import SelectInput, { SelectOption } from "../SelectInput";
import SearchField from "../shared/SearchField";
import { PlannerPriority } from "../types";

export type PlannerStatusFilter =
  | "all"
  | "completed"
  | "incomplete"
  | "overdue"
  | "today"
  | "this_week";

export type PlannerPriorityFilter = "all" | PlannerPriority;

type Props = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: PlannerStatusFilter;
  onStatusChange: (value: PlannerStatusFilter) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  priorityFilter: PlannerPriorityFilter;
  onPriorityChange: (value: PlannerPriorityFilter) => void;
  categoryOptions: SelectOption[];
};

const STATUS_OPTIONS: SelectOption[] = [
  { label: "Sve", value: "all" },
  { label: "Završeno", value: "completed" },
  { label: "Nezavršeno", value: "incomplete" },
  { label: "Kasni", value: "overdue" },
  { label: "Danas", value: "today" },
  { label: "Ove nedelje", value: "this_week" },
];

const PRIORITY_OPTIONS: SelectOption[] = [
  { label: "Svi prioriteti", value: "all" },
  { label: "Visok", value: "high" },
  { label: "Srednji", value: "medium" },
  { label: "Nizak", value: "low" },
];

const PlannerFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  priorityFilter,
  onPriorityChange,
  categoryOptions,
}: Props) => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <SearchField
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Traži po naslovu..."
      />

      <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 xl:grid-cols-3">
        <div className="space-y-1.5">
          <p className="text-sm text-foreground">Status</p>
          <SelectInput
            items={STATUS_OPTIONS}
            value={statusFilter}
            onChange={(value) =>
              onStatusChange((value as PlannerStatusFilter) || "all")
            }
          />
        </div>
        <div className="space-y-1.5">
          <p className="text-sm text-foreground">Kategorija</p>
          <SelectInput
            items={[
              { label: "Sve kategorije", value: "all" },
              ...categoryOptions,
            ]}
            value={categoryFilter}
            onChange={(value) => onCategoryChange(value || "all")}
          />
        </div>
        <div className="space-y-1.5">
          <p className="text-sm text-foreground">Prioritet</p>
          <SelectInput
            items={PRIORITY_OPTIONS}
            value={priorityFilter}
            onChange={(value) =>
              onPriorityChange((value as PlannerPriorityFilter) || "all")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PlannerFilters;
