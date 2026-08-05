import {
  PlannerPriority,
  PlannerTask,
  PlannerTaskStatus,
} from "@/components/dashboard/types";

export const getPlannerTaskStatus = (task: PlannerTask): PlannerTaskStatus => {
  if (task.completed) return "completed";
  if (task.due_date) {
    const today = startOfDay(new Date());
    const due = startOfDay(new Date(task.due_date));
    if (due.getTime() < today.getTime()) return "overdue";
  }
  return "in_progress";
};

export const plannerStatusLabel = (status: PlannerTaskStatus): string => {
  switch (status) {
    case "completed":
      return "Završeno";
    case "overdue":
      return "Kasni";
    case "in_progress":
    default:
      return "U toku";
  }
};

export const priorityLabel = (priority: PlannerPriority): string => {
  switch (priority) {
    case "high":
      return "Visok";
    case "low":
      return "Nizak";
    case "medium":
    default:
      return "Srednji";
  }
};

export const formatPlannerDate = (value?: string | null): string => {
  if (!value) return "Bez roka";
  return new Date(value).toLocaleDateString("sr-RS");
};

export const startOfDay = (date: Date): Date => {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
};

export const daysUntilDue = (dueDate?: string | null): number | null => {
  if (!dueDate) return null;
  const today = startOfDay(new Date());
  const due = startOfDay(new Date(dueDate));
  return Math.round(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
};

export const dueDateHint = (task: PlannerTask): string | null => {
  if (task.completed || !task.due_date) return null;
  const days = daysUntilDue(task.due_date);
  if (days === null) return null;
  if (days < 0) return `Kasni ${Math.abs(days)} dana`;
  if (days === 0) return "Rok je danas";
  if (days === 1) return "Rok je sutra";
  if (days <= 7) return `Rok za ${days} dana`;
  return null;
};

export const isDueToday = (dueDate?: string | null): boolean =>
  daysUntilDue(dueDate) === 0;

export const isDueThisWeek = (dueDate?: string | null): boolean => {
  const days = daysUntilDue(dueDate);
  return days !== null && days >= 0 && days <= 7;
};

export const isDueSoon = (task: PlannerTask): boolean => {
  if (task.completed || !task.due_date) return false;
  const days = daysUntilDue(task.due_date);
  return days !== null && days >= 0 && days <= 3;
};
