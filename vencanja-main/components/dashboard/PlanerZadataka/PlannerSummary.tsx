"use client";

import { useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { usePlanner } from "../context/PlannerContext";
import { getPlannerTaskStatus } from "./plannerHelpers";
import SummaryStats from "../shared/SummaryStats";
import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  ListTodo,
} from "lucide-react";

const PlannerSummary = () => {
  const { tasks } = usePlanner();

  const summary = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const remaining = total - completed;
    const overdue = tasks.filter(
      (task) => getPlannerTaskStatus(task) === "overdue",
    ).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, remaining, overdue, progress };
  }, [tasks]);

  return (
    <div className="space-y-4">
      <SummaryStats
        items={[
          {
            label: "Ukupno zadataka",
            value: String(summary.total),
            icon: ListTodo,
            tone: "orange",
          },
          {
            label: "Završeni",
            value: String(summary.completed),
            icon: CheckCircle2,
            tone: "emerald",
            progress: summary.progress,
          },
          {
            label: "Preostali",
            value: String(summary.remaining),
            icon: CircleDashed,
            tone: "sky",
          },
          {
            label: "Istekao rok",
            value: String(summary.overdue),
            icon: AlertTriangle,
            tone: "rose",
          },
        ]}
      />

      <div className="rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-50/70 to-white px-4 py-3">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="text-muted-foreground">Napredak zadataka</span>
          <span className="font-medium text-orange-700">
            {summary.completed}/{summary.total} · {summary.progress}%
          </span>
        </div>
        <Progress
          value={summary.progress}
          className="gap-0 [&_[data-slot=progress-indicator]]:bg-orange-500"
        />
      </div>
    </div>
  );
};

export default PlannerSummary;
