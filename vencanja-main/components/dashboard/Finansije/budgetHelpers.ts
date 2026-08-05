import {
  BudgetItem,
  BudgetItemStatus,
  BudgetPayment,
} from "@/components/dashboard/types";

export const getPaidAmount = (item: BudgetItem): number => {
  const payments = item.budget_payments ?? [];
  return payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
};

export const getRemainingAmount = (item: BudgetItem): number =>
  Math.max(Number(item.planned_amount) - getPaidAmount(item), 0);

export const getBudgetItemStatus = (item: BudgetItem): BudgetItemStatus => {
  const paid = getPaidAmount(item);
  const planned = Number(item.planned_amount);

  if (paid <= 0) return "unpaid";
  if (paid >= planned) return "paid";
  return "partial";
};

export const budgetStatusLabel = (status: BudgetItemStatus): string => {
  switch (status) {
    case "paid":
      return "Plaćeno";
    case "partial":
      return "Delimično plaćeno";
    case "unpaid":
    default:
      return "Čeka uplatu";
  }
};

export const formatMoney = (amount: number, currency = "EUR"): string => {
  try {
    return new Intl.NumberFormat("sr-RS", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
};

export const formatBudgetDate = (value?: string | null): string => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("sr-RS");
};

export const sortPaymentsByDateDesc = (
  payments: BudgetPayment[],
): BudgetPayment[] =>
  [...payments].sort(
    (a, b) =>
      new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime(),
  );

export const daysUntil = (dateValue?: string | null): number | null => {
  if (!dateValue) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateValue);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

export const upcomingLabel = (days: number): string => {
  if (days < 0) return `Pre ${Math.abs(days)} dana`;
  if (days === 0) return "Danas";
  if (days === 1) return "Sutra";
  return `Za ${days} dana`;
};
