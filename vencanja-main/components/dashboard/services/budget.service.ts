import {
  BudgetAttachment,
  BudgetCategory,
  BudgetItem,
  BudgetPayment,
  CreateBudgetAttachmentDto,
  CreateBudgetCategoryDto,
  CreateBudgetItemDto,
  CreateBudgetPaymentDto,
  UpdateBudgetItemDto,
} from "@/components/dashboard/types";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const ITEM_SELECT = `
  *,
  budget_categories(id, name, icon, color),
  budget_payments(*),
  budget_attachments(*)
`;

export const getBudgetCategoriesByProjectService = async (
  projectId: string,
): Promise<BudgetCategory[]> => {
  const { data, error } = await supabase
    .from("budget_categories")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
};

export const createBudgetCategoriesBulkService = async (
  projectId: string,
  categories: CreateBudgetCategoryDto[],
): Promise<BudgetCategory[]> => {
  const payload = categories.map((category, index) => ({
    project_id: projectId,
    name: category.name,
    icon: category.icon ?? "Wallet",
    color: category.color ?? "#64748b",
    sort_order: category.sort_order ?? index,
  }));

  const { data, error } = await supabase
    .from("budget_categories")
    .insert(payload)
    .select()
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
};

export const createBudgetCategoryService = async (
  projectId: string,
  category: CreateBudgetCategoryDto,
): Promise<BudgetCategory> => {
  const { data, error } = await supabase
    .from("budget_categories")
    .insert({
      project_id: projectId,
      name: category.name.trim(),
      icon: category.icon ?? "Wallet",
      color: category.color ?? "#64748b",
      sort_order: category.sort_order ?? 999,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getBudgetItemsByProjectService = async (
  projectId: string,
): Promise<BudgetItem[]> => {
  const { data, error } = await supabase
    .from("budget_items")
    .select(ITEM_SELECT)
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as BudgetItem[] | null) ?? [];
};

export const createBudgetItemService = async (
  projectId: string,
  item: CreateBudgetItemDto,
): Promise<BudgetItem> => {
  const { data, error } = await supabase
    .from("budget_items")
    .insert({
      project_id: projectId,
      category_id: item.category_id,
      title: item.title.trim(),
      vendor_name: item.vendor_name?.trim() || null,
      planned_amount: item.planned_amount,
      currency: item.currency,
      due_date: item.due_date || null,
      payment_date: item.payment_date || null,
      phone: item.phone?.trim() || null,
      email: item.email?.trim() || null,
      website: item.website?.trim() || null,
      notes: item.notes?.trim() || null,
    })
    .select(ITEM_SELECT)
    .single();

  if (error) throw error;
  return data as BudgetItem;
};

export const updateBudgetItemService = async (
  id: string,
  updates: UpdateBudgetItemDto,
): Promise<BudgetItem> => {
  const payload: Record<string, string | number | null> = {};

  if (updates.category_id !== undefined) payload.category_id = updates.category_id;
  if (updates.title !== undefined) payload.title = updates.title.trim();
  if (updates.vendor_name !== undefined) {
    payload.vendor_name = updates.vendor_name?.trim() || null;
  }
  if (updates.planned_amount !== undefined) {
    payload.planned_amount = updates.planned_amount;
  }
  if (updates.currency !== undefined) payload.currency = updates.currency;
  if (updates.due_date !== undefined) payload.due_date = updates.due_date || null;
  if (updates.payment_date !== undefined) {
    payload.payment_date = updates.payment_date || null;
  }
  if (updates.phone !== undefined) payload.phone = updates.phone?.trim() || null;
  if (updates.email !== undefined) payload.email = updates.email?.trim() || null;
  if (updates.website !== undefined) {
    payload.website = updates.website?.trim() || null;
  }
  if (updates.notes !== undefined) payload.notes = updates.notes?.trim() || null;

  const { data, error } = await supabase
    .from("budget_items")
    .update(payload)
    .eq("id", id)
    .select(ITEM_SELECT)
    .single();

  if (error) throw error;
  return data as BudgetItem;
};

export const deleteBudgetItemService = async (id: string): Promise<void> => {
  const { error } = await supabase.from("budget_items").delete().eq("id", id);
  if (error) throw error;
};

export const createBudgetPaymentService = async (
  budgetItemId: string,
  payment: CreateBudgetPaymentDto,
): Promise<BudgetPayment> => {
  const { data, error } = await supabase
    .from("budget_payments")
    .insert({
      budget_item_id: budgetItemId,
      amount: payment.amount,
      payment_date: payment.payment_date,
      method: payment.method,
      note: payment.note?.trim() || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteBudgetPaymentService = async (id: string): Promise<void> => {
  const { error } = await supabase.from("budget_payments").delete().eq("id", id);
  if (error) throw error;
};

export const createBudgetAttachmentService = async (
  budgetItemId: string,
  attachment: CreateBudgetAttachmentDto,
): Promise<BudgetAttachment> => {
  const { data, error } = await supabase
    .from("budget_attachments")
    .insert({
      budget_item_id: budgetItemId,
      file_url: attachment.file_url,
      file_name: attachment.file_name,
      type: attachment.type,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteBudgetAttachmentService = async (
  id: string,
): Promise<void> => {
  const { error } = await supabase
    .from("budget_attachments")
    .delete()
    .eq("id", id);
  if (error) throw error;
};
