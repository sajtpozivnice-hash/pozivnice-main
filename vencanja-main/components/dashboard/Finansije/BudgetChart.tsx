"use client";

import { useMemo } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useBudget } from "../context/BudgetContext";
import { formatMoney } from "./budgetHelpers";

const BudgetChart = () => {
  const { items, categories } = useBudget();

  const data = useMemo(() => {
    return categories
      .map((category) => {
        const amount = items
          .filter((item) => item.category_id === category.id)
          .reduce((sum, item) => sum + Number(item.planned_amount), 0);
        return {
          name: category.name,
          value: amount,
          color: category.color,
        };
      })
      .filter((entry) => entry.value > 0);
  }, [categories, items]);

  const currency = items[0]?.currency ?? "EUR";

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/20 px-4 py-10 text-center text-sm text-muted-foreground">
        Dodajte troškove da biste videli raspodelu po kategorijama.
      </div>
    );
  }

  return (
      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-emerald-50/40 via-white to-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-foreground">
        Troškovi po kategorijama
      </h3>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={48}
              outerRadius={80}
              paddingAngle={2}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                formatMoney(typeof value === "number" ? value : Number(value), currency)
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {data.map((entry) => (
          <div
            key={entry.name}
            className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="font-medium text-foreground">
              {formatMoney(entry.value, currency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetChart;
