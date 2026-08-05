"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDialog } from "../context/ModalContext";
import { useBudget } from "../context/BudgetContext";
import EmptyMessage from "../EmptyMessage";
import SectionLoader from "../loaders/SectionLoader";
import BudgetSummary from "./BudgetSummary";
import BudgetChart from "./BudgetChart";
import BudgetTimeline from "./BudgetTimeline";
import BudgetItemCard from "./BudgetItemCard";
import BudgetFilters, {
  BudgetSortKey,
  BudgetStatusFilter,
} from "./BudgetFilters";
import FilterEmptyState from "../shared/FilterEmptyState";
import { getBudgetItemStatus } from "./budgetHelpers";
import { FolderPlus, Plus, Wallet } from "lucide-react";
import { matchesSearchQuery } from "../utils/search";
import { useDashboard } from "../context/DashboardContext";
import { getEventCopy } from "@/helpers/eventType";

const Finansije = () => {
  const { openModal } = useDialog();
  const { activeProject } = useDashboard();
  const copy = getEventCopy(activeProject?.config_json);
  const { items, categories, loading } = useBudget();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BudgetStatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [sortKey, setSortKey] = useState<BudgetSortKey>("due-asc");

  const vendorOptions = useMemo(() => {
    const vendors = Array.from(
      new Set(
        items
          .map((item) => item.vendor_name?.trim())
          .filter((name): name is string => Boolean(name)),
      ),
    ).sort((a, b) => a.localeCompare(b, "sr"));

    return vendors.map((vendor) => ({ label: vendor, value: vendor }));
  }, [items]);

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categories],
  );

  const filteredItems = useMemo(() => {
    const filtered = items.filter((item) => {
      const status = getBudgetItemStatus(item);
      if (statusFilter !== "all" && status !== statusFilter) return false;
      if (categoryFilter !== "all" && item.category_id !== categoryFilter) {
        return false;
      }
      if (
        vendorFilter !== "all" &&
        (item.vendor_name?.trim() || "") !== vendorFilter
      ) {
        return false;
      }

      return matchesSearchQuery(
        [
          item.title,
          item.vendor_name,
          item.budget_categories?.name,
          item.notes,
        ],
        searchQuery,
      );
    });

    filtered.sort((a, b) => {
      switch (sortKey) {
        case "due-desc": {
          const aTime = a.due_date ? new Date(a.due_date).getTime() : 0;
          const bTime = b.due_date ? new Date(b.due_date).getTime() : 0;
          return bTime - aTime;
        }
        case "amount-desc":
          return Number(b.planned_amount) - Number(a.planned_amount);
        case "amount-asc":
          return Number(a.planned_amount) - Number(b.planned_amount);
        case "title-asc":
          return a.title.localeCompare(b.title, "sr");
        case "vendor-asc":
          return (a.vendor_name ?? "").localeCompare(b.vendor_name ?? "", "sr");
        case "due-asc":
        default: {
          const aTime = a.due_date
            ? new Date(a.due_date).getTime()
            : Number.MAX_SAFE_INTEGER;
          const bTime = b.due_date
            ? new Date(b.due_date).getTime()
            : Number.MAX_SAFE_INTEGER;
          return aTime - bTime;
        }
      }
    });

    return filtered;
  }, [
    items,
    searchQuery,
    statusFilter,
    categoryFilter,
    vendorFilter,
    sortKey,
  ]);

  if (loading && items.length === 0 && categories.length === 0) {
    return <SectionLoader />;
  }

  return (
    <div className="w-full min-w-0 space-y-4">
      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {copy.budgetBlurb}
        </p>
        <div className="grid w-full grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:w-auto">
          <Button
            variant="outline"
            className="h-9 w-full cursor-pointer"
            onClick={() => openModal("add_budget_category")}
          >
            <FolderPlus className="h-4 w-4" />
            Nova kategorija
          </Button>
          <Button
            className="h-9 w-full cursor-pointer"
            onClick={() => openModal("add_budget_item")}
          >
            <Plus className="h-4 w-4" />
            Novi trošak
          </Button>
        </div>
      </div>

      <BudgetSummary />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BudgetChart />
        <BudgetTimeline />
      </div>

      <BudgetFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        vendorFilter={vendorFilter}
        onVendorChange={setVendorFilter}
        sortKey={sortKey}
        onSortChange={setSortKey}
        categoryOptions={categoryOptions}
        vendorOptions={vendorOptions}
      />

      {items.length === 0 ? (
        <EmptyMessage
          title="Nemate unetih troškova"
          description={copy.budgetEmpty}
          icon={Wallet}
          accent="budget"
          action={
            <Button
              className="cursor-pointer"
              onClick={() => openModal("add_budget_item")}
            >
              Dodaj trošak
            </Button>
          }
        />
      ) : filteredItems.length === 0 ? (
        <FilterEmptyState
          title="Nema troškova za izabrane filtere"
          onReset={() => {
            setSearchQuery("");
            setStatusFilter("all");
            setCategoryFilter("all");
            setVendorFilter("all");
          }}
        />
      ) : (
        <div className="columns-1 gap-4 md:columns-2 xl:columns-4">
          {filteredItems.map((item) => (
            <BudgetItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Finansije;
