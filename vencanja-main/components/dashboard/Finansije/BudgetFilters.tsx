"use client";

import SelectInput, { SelectOption } from "../SelectInput";
import SearchField from "../shared/SearchField";
import { BudgetItemStatus } from "../types";

export type BudgetStatusFilter = "all" | BudgetItemStatus;
export type BudgetSortKey =
  | "due-asc"
  | "due-desc"
  | "amount-desc"
  | "amount-asc"
  | "title-asc"
  | "vendor-asc";

type Props = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: BudgetStatusFilter;
  onStatusChange: (value: BudgetStatusFilter) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  vendorFilter: string;
  onVendorChange: (value: string) => void;
  sortKey: BudgetSortKey;
  onSortChange: (value: BudgetSortKey) => void;
  categoryOptions: SelectOption[];
  vendorOptions: SelectOption[];
};

const STATUS_OPTIONS: SelectOption[] = [
  { label: "Sve", value: "all" },
  { label: "Plaćeno", value: "paid" },
  { label: "Delimično", value: "partial" },
  { label: "Neplaćeno", value: "unpaid" },
];

const SORT_OPTIONS: SelectOption[] = [
  { label: "Rok (najbliži)", value: "due-asc" },
  { label: "Rok (najkasniji)", value: "due-desc" },
  { label: "Iznos (veći → manji)", value: "amount-desc" },
  { label: "Iznos (manji → veći)", value: "amount-asc" },
  { label: "Naziv (A–Ž)", value: "title-asc" },
  { label: "Dobavljač (A–Ž)", value: "vendor-asc" },
];

const BudgetFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  vendorFilter,
  onVendorChange,
  sortKey,
  onSortChange,
  categoryOptions,
  vendorOptions,
}: Props) => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <SearchField
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Traži po nazivu, dobavljaču, kategoriji..."
      />

      <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-1.5">
          <p className="text-sm text-foreground">Status</p>
          <SelectInput
            items={STATUS_OPTIONS}
            value={statusFilter}
            onChange={(value) =>
              onStatusChange((value as BudgetStatusFilter) || "all")
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
          <p className="text-sm text-foreground">Dobavljač</p>
          <SelectInput
            items={[
              { label: "Svi dobavljači", value: "all" },
              ...vendorOptions,
            ]}
            value={vendorFilter}
            onChange={(value) => onVendorChange(value || "all")}
          />
        </div>
        <div className="space-y-1.5">
          <p className="text-sm text-foreground">Sortiraj</p>
          <SelectInput
            items={SORT_OPTIONS}
            value={sortKey}
            onChange={(value) =>
              onSortChange((value as BudgetSortKey) || "due-asc")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetFilters;
