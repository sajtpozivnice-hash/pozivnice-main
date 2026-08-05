"use client";

import { Progress } from "@/components/ui/progress";
import { useMemo } from "react";
import { useBudget } from "../context/BudgetContext";
import {
  formatMoney,
  getBudgetItemStatus,
  getPaidAmount,
} from "./budgetHelpers";
import SummaryStats from "../shared/SummaryStats";
import {
  BadgeCheck,
  CircleDollarSign,
  Store,
  Wallet,
} from "lucide-react";

const BudgetSummary = () => {
  const { items } = useBudget();

  const summary = useMemo(() => {
    const totalPlanned = items.reduce(
      (sum, item) => sum + Number(item.planned_amount),
      0,
    );
    const totalPaid = items.reduce((sum, item) => sum + getPaidAmount(item), 0);
    const remaining = Math.max(totalPlanned - totalPaid, 0);
    const vendors = new Set(
      items
        .map((item) => item.vendor_name?.trim())
        .filter((name): name is string => Boolean(name)),
    ).size;
    const paidCount = items.filter(
      (item) => getBudgetItemStatus(item) === "paid",
    ).length;
    const progress =
      totalPlanned > 0 ? Math.min((totalPaid / totalPlanned) * 100, 100) : 0;
    const currency = items[0]?.currency ?? "EUR";

    return {
      totalPlanned,
      totalPaid,
      remaining,
      vendors,
      paidCount,
      progress,
      currency,
    };
  }, [items]);

  return (
    <div className="space-y-4">
      <SummaryStats
        items={[
          {
            label: "Ukupan budžet",
            value: formatMoney(summary.totalPlanned, summary.currency),
            icon: Wallet,
            tone: "emerald",
          },
          {
            label: "Ukupno plaćeno",
            value: formatMoney(summary.totalPaid, summary.currency),
            icon: CircleDollarSign,
            tone: "sky",
            progress: summary.progress,
          },
          {
            label: "Preostalo",
            value: formatMoney(summary.remaining, summary.currency),
            icon: BadgeCheck,
            tone: "violet",
          },
          {
            label: "Dobavljači",
            value: String(summary.vendors),
            icon: Store,
            tone: "slate",
            hint: `${summary.paidCount}/${items.length} plaćeno`,
          },
        ]}
      />

      <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/70 to-white px-4 py-3">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="text-muted-foreground">Napredak plaćanja</span>
          <span className="font-medium text-emerald-700">
            {summary.paidCount}/{items.length} plaćeno ·{" "}
            {Math.round(summary.progress)}%
          </span>
        </div>
        <Progress
          value={summary.progress}
          className="gap-0 [&_[data-slot=progress-indicator]]:bg-emerald-500"
        />
      </div>
    </div>
  );
};

export default BudgetSummary;
