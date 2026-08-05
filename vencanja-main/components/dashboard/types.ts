import { UniversalProjectConfig } from "@/types/config";
export type RSVPStatus = "pending" | "accepted" | "declined" | "";

export type Guest = {
  id: string;
  project_id: string;
  name: string;
  email?: string | null;
  rsvp_status: RSVPStatus;
  message?: string | null;
  notes?: string | null;
  table_id?: string | null;
  created_at: string;
  updated_at: string;
  tables?: {
    id: string;
    name: string;
  } | null;
};

export type CreateGuestDto = {
  name: string;
  email?: string | null;
  rsvp_status?: RSVPStatus;
  message?: string | null;
  notes?: string | null;
  table_id?: string | null;
};

export type Table = {
  id: string;
  name: string;
  project_id: string;
  number_of_guests: number;
};

export type CreateTableDto = {
  name: string;
  number_of_guests: number;
};

export type User = {
  id: string;
  email: string | undefined;
};
export type Client = {
  id: string;
  auth_user_id: string;
  name: string;
  email: string;
  phone: string;
};
export type Project = {
  paid: boolean;
  published: boolean;
  client_id: string;
  id: string;
  title: string;
  config_json: UniversalProjectConfig;
  subdomain: string;
  created_at: string;
  updated_at: string | null;
};

export type BudgetPaymentMethod = "cash" | "card" | "transfer" | "other";

export type BudgetAttachmentType =
  | "contract"
  | "invoice"
  | "offer"
  | "receipt"
  | "other";

export type BudgetItemStatus = "unpaid" | "partial" | "paid";

export type BudgetCategory = {
  id: string;
  project_id: string;
  name: string;
  icon: string;
  color: string;
  sort_order: number;
  created_at: string;
};

export type CreateBudgetCategoryDto = {
  name: string;
  icon?: string;
  color?: string;
  sort_order?: number;
};

export type BudgetPayment = {
  id: string;
  budget_item_id: string;
  amount: number;
  payment_date: string;
  method: BudgetPaymentMethod;
  note?: string | null;
  created_at: string;
};

export type CreateBudgetPaymentDto = {
  amount: number;
  payment_date: string;
  method: BudgetPaymentMethod;
  note?: string | null;
};

export type BudgetAttachment = {
  id: string;
  budget_item_id: string;
  file_url: string;
  file_name: string;
  type: BudgetAttachmentType;
  created_at: string;
};

export type CreateBudgetAttachmentDto = {
  file_url: string;
  file_name: string;
  type: BudgetAttachmentType;
};

export type BudgetItem = {
  id: string;
  project_id: string;
  category_id: string;
  title: string;
  vendor_name?: string | null;
  planned_amount: number;
  currency: string;
  due_date?: string | null;
  payment_date?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  budget_categories?: Pick<
    BudgetCategory,
    "id" | "name" | "icon" | "color"
  > | null;
  budget_payments?: BudgetPayment[];
  budget_attachments?: BudgetAttachment[];
};

export type CreateBudgetItemDto = {
  category_id: string;
  title: string;
  vendor_name?: string | null;
  planned_amount: number;
  currency: string;
  due_date?: string | null;
  payment_date?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  notes?: string | null;
};

export type UpdateBudgetItemDto = Partial<CreateBudgetItemDto>;

export type PlannerPriority = "low" | "medium" | "high";

export type PlannerTaskStatus = "completed" | "in_progress" | "overdue";

export type PlannerCategory = {
  id: string;
  project_id: string;
  name: string;
  sort_order: number;
  created_at: string;
};

export type CreatePlannerCategoryDto = {
  name: string;
  sort_order?: number;
};

export type PlannerTask = {
  id: string;
  project_id: string;
  category: string;
  title: string;
  description?: string | null;
  priority: PlannerPriority;
  due_date?: string | null;
  completed: boolean;
  completed_at?: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type CreatePlannerTaskDto = {
  category: string;
  title: string;
  description?: string | null;
  priority: PlannerPriority;
  due_date?: string | null;
  completed?: boolean;
  sort_order?: number;
};

export type UpdatePlannerTaskDto = Partial<CreatePlannerTaskDto> & {
  completed_at?: string | null;
};

export type GuestPhoto = {
  id: string;
  project_id: string;
  public_id: string;
  secure_url: string;
  file_name: string | null;
  guest_name: string | null;
  width: number | null;
  height: number | null;
  bytes: number | null;
  format: string | null;
  created_at: string;
};

export type CreateGuestPhotoDto = {
  public_id: string;
  secure_url: string;
  file_name?: string | null;
  guest_name?: string | null;
  width?: number | null;
  height?: number | null;
  bytes?: number | null;
  format?: string | null;
};

