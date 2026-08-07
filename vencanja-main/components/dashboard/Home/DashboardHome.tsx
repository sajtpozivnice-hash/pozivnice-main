"use client";

import { useMemo } from "react";
import { useGuests } from "../context/GuestContext";
import { useTables } from "../context/TableContext";
import { useBudget } from "../context/BudgetContext";
import { usePlanner } from "../context/PlannerContext";
import { useDashboard } from "../context/DashboardContext";
import SummaryStats from "../shared/SummaryStats";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  daysUntilDue,
  getPlannerTaskStatus,
} from "../PlanerZadataka/plannerHelpers";
import {
  formatMoney,
  getPaidAmount,
  upcomingLabel,
} from "../Finansije/budgetHelpers";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Images,
  ListTodo,
  Users,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DASHBOARD_ACCENTS } from "../theme";
import SectionLoader from "../loaders/SectionLoader";
import { getEventCopy } from "@/helpers/eventType";

type DashboardHomeProps = {
  onNavigate: (tab: string) => void;
};

const DashboardHome = ({ onNavigate }: DashboardHomeProps) => {
  const { activeProject } = useDashboard();
  const copy = getEventCopy(activeProject?.config_json);
  const { guests, loading: guestsLoading } = useGuests();
  const { tables, loading: tablesLoading } = useTables();
  const { items, loading: budgetLoading } = useBudget();
  const { tasks, loading: plannerLoading } = usePlanner();

  const loading =
    (guestsLoading && guests.length === 0) ||
    (tablesLoading && tables.length === 0) ||
    (budgetLoading && items.length === 0) ||
    (plannerLoading && tasks.length === 0);

  const stats = useMemo(() => {
    const accepted = guests.filter((g) => g.rsvp_status === "accepted").length;
    const pending = guests.filter((g) => g.rsvp_status === "pending").length;
    const capacity = tables.reduce((sum, t) => sum + t.number_of_guests, 0);
    const seated = guests.filter((g) => Boolean(g.table_id)).length;
    const seatFill = capacity > 0 ? Math.round((seated / capacity) * 100) : 0;
    const planned = items.reduce(
      (sum, item) => sum + Number(item.planned_amount),
      0,
    );
    const paid = items.reduce((sum, item) => sum + getPaidAmount(item), 0);
    const budgetFill = planned > 0 ? Math.round((paid / planned) * 100) : 0;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const taskFill =
      tasks.length > 0
        ? Math.round((completedTasks / tasks.length) * 100)
        : 0;
    const currency = items[0]?.currency ?? "EUR";

    return {
      guests: guests.length,
      accepted,
      pending,
      seatFill,
      seated,
      capacity,
      planned,
      paid,
      budgetFill,
      completedTasks,
      tasksTotal: tasks.length,
      taskFill,
      currency,
    };
  }, [guests, tables, items, tasks]);

  const upcomingTasks = useMemo(() => {
    return tasks
      .filter((task) => !task.completed && task.due_date)
      .map((task) => ({
        id: task.id,
        title: task.title,
        days: daysUntilDue(task.due_date) ?? 0,
        status: getPlannerTaskStatus(task),
      }))
      .filter((task) => task.days >= 0)
      .sort((a, b) => a.days - b.days)
      .slice(0, 5);
  }, [tasks]);

  if (loading) {
    return <SectionLoader rows={3} />;
  }

  return (
    <div className="dashboard-fade-in w-full min-w-0 space-y-5">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-5 text-white shadow-[0_12px_40px_rgb(15_23_42_/_0.18)] sm:p-7">
        <div className="pointer-events-none absolute -top-16 right-0 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-rose-400/20 blur-3xl" />
        <div className="relative space-y-2">
          <p className="text-xs font-medium tracking-[0.18em] text-white/60 uppercase">
            {copy.overviewLabel}
          </p>
          <h2 className="max-w-2xl text-2xl text-white font-semibold tracking-tight sm:text-3xl">
            {activeProject?.title ?? copy.fallbackTitle}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/70">
            Sve što je bitno za organizaciju — gosti, raspored, budžet i zadaci —
            na jednom mestu.
          </p>
        </div>
      </div>

      <SummaryStats
        items={[
          {
            label: "Gosti",
            value: String(stats.guests),
            hint: `${stats.accepted} dolazi · ${stats.pending} čeka`,
            icon: Users,
            tone: "sky",
            progress:
              stats.guests > 0
                ? Math.round((stats.accepted / stats.guests) * 100)
                : 0,
          },
          {
            label: "Raspored",
            value: `${stats.seatFill}%`,
            hint: `${stats.seated}/${stats.capacity || 0} mesta`,
            icon: DASHBOARD_ACCENTS.seating.icon,
            tone: "violet",
            progress: stats.seatFill,
          },
          {
            label: "Budžet",
            value: formatMoney(stats.paid, stats.currency),
            hint: `od ${formatMoney(stats.planned, stats.currency)}`,
            icon: Wallet,
            tone: "emerald",
            progress: stats.budgetFill,
          },
          {
            label: "Zadaci",
            value: `${stats.completedTasks}/${stats.tasksTotal}`,
            hint: `${stats.taskFill}% završeno`,
            icon: ListTodo,
            tone: "orange",
            progress: stats.taskFill,
          },
        ]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-violet-50/80 via-white to-white p-4 shadow-sm sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Popunjenost stolova
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.seated} raspoređenih gostiju
                </p>
              </div>
              <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">
                {stats.seatFill}%
              </span>
            </div>
            <Progress
              value={stats.seatFill}
              className="gap-0 [&_[data-slot=progress-indicator]]:bg-violet-500"
            />
            <Button
              variant="ghost"
              className="mt-3 h-8 cursor-pointer px-0 text-violet-700 hover:bg-transparent hover:text-violet-800"
              onClick={() => onNavigate("seating")}
            >
              Otvori raspored
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-emerald-50/80 via-white to-white p-4 shadow-sm sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Napredak budžeta
                </p>
                <p className="text-xs text-muted-foreground">
                  Plaćeno {formatMoney(stats.paid, stats.currency)}
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                {stats.budgetFill}%
              </span>
            </div>
            <Progress
              value={stats.budgetFill}
              className="gap-0 [&_[data-slot=progress-indicator]]:bg-emerald-500"
            />
            <Button
              variant="ghost"
              className="mt-3 h-8 cursor-pointer px-0 text-emerald-700 hover:bg-transparent hover:text-emerald-800"
              onClick={() => onNavigate("finansije")}
            >
              Otvori finansije
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-orange-50/80 via-white to-white p-4 shadow-sm sm:p-5 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
              <CalendarClock className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Predstojeći zadaci
              </p>
              <p className="text-xs text-muted-foreground">Sledeći rokovi</p>
            </div>
          </div>

          {upcomingTasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-orange-200 bg-white/70 px-3 py-8 text-center">
              <CheckCircle2 className="mx-auto mb-2 h-6 w-6 text-orange-500" />
              <p className="text-sm text-muted-foreground">
                Nema predstojećih rokova.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-orange-100/80 bg-white/80 px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {task.title}
                    </p>
                    <p
                      className={cn(
                        "text-xs",
                        task.status === "overdue"
                          ? "text-destructive"
                          : "text-muted-foreground",
                      )}
                    >
                      {upcomingLabel(task.days)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button
            variant="ghost"
            className="mt-3 h-8 cursor-pointer px-0 text-orange-700 hover:bg-transparent hover:text-orange-800"
            onClick={() => onNavigate("planer")}
          >
            Otvori planer
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            tab: "coming",
            accent: DASHBOARD_ACCENTS.guests,
            title: "Gosti",
            desc: "Potvrde i spisak",
            icon: Users,
          },
          {
            tab: "seating",
            accent: DASHBOARD_ACCENTS.seating,
            title: "Raspored",
            desc: "Stolovi i mesta",
            icon: DASHBOARD_ACCENTS.seating.icon,
          },
          {
            tab: "finansije",
            accent: DASHBOARD_ACCENTS.budget,
            title: "Finansije",
            desc: "Budžet i uplate",
            icon: Wallet,
          },
          {
            tab: "images",
            accent: DASHBOARD_ACCENTS.gallery,
            title: "Slike",
            desc: "Fotografije gostiju",
            icon: Images,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.tab}
              type="button"
              onClick={() => onNavigate(item.tab)}
              className={cn(
                "group flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                item.accent.border,
                `bg-gradient-to-br ${item.accent.gradient}`,
              )}
            >
              <span
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
                  item.accent.chip,
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-foreground">
                  {item.title}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {item.desc}
                </span>
              </span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHome;
