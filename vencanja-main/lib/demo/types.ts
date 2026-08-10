import type {
  BudgetAttachment,
  BudgetCategory,
  BudgetItem,
  BudgetPayment,
  Client,
  Guest,
  GuestPhoto,
  PlannerCategory,
  PlannerTask,
  Project,
  Table,
  User,
} from "@/components/dashboard/types";
import type { UniversalProjectConfig } from "@/types/config";

export type DemoSnapshot = {
  user: User;
  client: Client;
  projects: Project[];
  guests: Guest[];
  tables: Table[];
  budgetCategories: BudgetCategory[];
  budgetItems: BudgetItem[];
  budgetPayments: BudgetPayment[];
  budgetAttachments: BudgetAttachment[];
  plannerCategories: PlannerCategory[];
  plannerTasks: PlannerTask[];
  guestPhotos: GuestPhoto[];
};

export type { UniversalProjectConfig };
