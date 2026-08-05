"use client";

import { useMemo } from "react";
import { useBudget } from "../context/BudgetContext";
import {
  daysUntil,
  formatMoney,
  upcomingLabel,
} from "./budgetHelpers";
import { CalendarClock } from "lucide-react";

const BudgetTimeline = () => {
  const { items } = useBudget();

  const upcoming = useMemo(() => {
    return items
      .filter((item) => item.due_date)
      .map((item) => ({
        id: item.id,
        title: item.title,
        vendor: item.vendor_name,
        due_date: item.due_date as string,
        amount: Number(item.planned_amount),
        currency: item.currency,
        days: daysUntil(item.due_date) ?? 0,
      }))
      .filter((item) => item.days >= 0)
      .sort((a, b) => a.days - b.days)
      .slice(0, 6);
  }, [items]);

  if (upcoming.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
        Nema predstojećih rokova plaćanja.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-sky-50/40 via-white to-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <CalendarClock className="h-4 w-4 text-sky-600" />
        Predstojeća plaćanja
      </div>
      <div className="space-y-3">
        {upcoming.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">
                {upcomingLabel(item.days)}
              </p>
              <p className="truncate text-sm font-semibold text-foreground">
                {item.title}
              </p>
              {item.vendor ? (
                <p className="truncate text-xs text-muted-foreground">
                  {item.vendor}
                </p>
              ) : null}
            </div>
            <p className="shrink-0 text-sm font-medium text-foreground">
              {formatMoney(item.amount, item.currency)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetTimeline;
