"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useDashboard } from "./DashboardContext";
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
} from "../types";
import {
  createBudgetAttachmentService,
  createBudgetCategoriesBulkService,
  createBudgetCategoryService,
  createBudgetItemService,
  createBudgetPaymentService,
  deleteBudgetAttachmentService,
  deleteBudgetItemService,
  deleteBudgetPaymentService,
  getBudgetCategoriesByProjectService,
  getBudgetItemsByProjectService,
  updateBudgetItemService,
} from "../services/budget.service";
import { getBudgetCategoriesForEvent } from "../Finansije/defaultCategories";
import { resolveEventType } from "@/helpers/eventType";

type BudgetContextType = {
  categories: BudgetCategory[];
  items: BudgetItem[];
  loading: boolean;
  refresh: () => Promise<void>;
  createCategory: (category: CreateBudgetCategoryDto) => Promise<void>;
  createItem: (item: CreateBudgetItemDto) => Promise<void>;
  updateItem: (id: string, updates: UpdateBudgetItemDto) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  addPayment: (
    budgetItemId: string,
    payment: CreateBudgetPaymentDto,
  ) => Promise<void>;
  removePayment: (budgetItemId: string, paymentId: string) => Promise<void>;
  addAttachment: (
    budgetItemId: string,
    attachment: CreateBudgetAttachmentDto,
  ) => Promise<void>;
  removeAttachment: (
    budgetItemId: string,
    attachmentId: string,
  ) => Promise<void>;
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

const mergeItemRelations = (
  item: BudgetItem,
  patch: Partial<Pick<BudgetItem, "budget_payments" | "budget_attachments">>,
): BudgetItem => ({
  ...item,
  ...patch,
});

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const { activeProject } = useDashboard();
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!activeProject?.id) {
      setCategories([]);
      setItems([]);
      return;
    }

    setLoading(true);
    try {
      let nextCategories = await getBudgetCategoriesByProjectService(
        activeProject.id,
      );

      if (nextCategories.length === 0) {
        const eventType = resolveEventType(activeProject.config_json);
        nextCategories = await createBudgetCategoriesBulkService(
          activeProject.id,
          getBudgetCategoriesForEvent(eventType),
        );
      }

      const nextItems = await getBudgetItemsByProjectService(activeProject.id);
      setCategories(nextCategories);
      setItems(nextItems);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [activeProject?.id, activeProject?.config_json]);

  useEffect(() => {
    void refresh().catch(() => undefined);
  }, [refresh]);

  const createCategory = async (category: CreateBudgetCategoryDto) => {
    if (!activeProject?.id) return;
    setLoading(true);
    try {
      const created = await createBudgetCategoryService(
        activeProject.id,
        category,
      );
      setCategories((prev) => [...prev, created]);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (item: CreateBudgetItemDto) => {
    if (!activeProject?.id) return;
    setLoading(true);
    try {
      const created = await createBudgetItemService(activeProject.id, item);
      setItems((prev) => [created, ...prev]);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: string, updates: UpdateBudgetItemDto) => {
    setLoading(true);
    try {
      const updated = await updateBudgetItemService(id, updates);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? updated : item)),
      );
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      await deleteBudgetItemService(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addPayment = async (
    budgetItemId: string,
    payment: CreateBudgetPaymentDto,
  ) => {
    setLoading(true);
    try {
      const created: BudgetPayment = await createBudgetPaymentService(
        budgetItemId,
        payment,
      );
      setItems((prev) =>
        prev.map((item) =>
          item.id === budgetItemId
            ? mergeItemRelations(item, {
                budget_payments: [...(item.budget_payments ?? []), created],
              })
            : item,
        ),
      );
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removePayment = async (budgetItemId: string, paymentId: string) => {
    setLoading(true);
    try {
      await deleteBudgetPaymentService(paymentId);
      setItems((prev) =>
        prev.map((item) =>
          item.id === budgetItemId
            ? mergeItemRelations(item, {
                budget_payments: (item.budget_payments ?? []).filter(
                  (payment) => payment.id !== paymentId,
                ),
              })
            : item,
        ),
      );
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addAttachment = async (
    budgetItemId: string,
    attachment: CreateBudgetAttachmentDto,
  ) => {
    setLoading(true);
    try {
      const created: BudgetAttachment = await createBudgetAttachmentService(
        budgetItemId,
        attachment,
      );
      setItems((prev) =>
        prev.map((item) =>
          item.id === budgetItemId
            ? mergeItemRelations(item, {
                budget_attachments: [
                  ...(item.budget_attachments ?? []),
                  created,
                ],
              })
            : item,
        ),
      );
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeAttachment = async (
    budgetItemId: string,
    attachmentId: string,
  ) => {
    setLoading(true);
    try {
      await deleteBudgetAttachmentService(attachmentId);
      setItems((prev) =>
        prev.map((item) =>
          item.id === budgetItemId
            ? mergeItemRelations(item, {
                budget_attachments: (item.budget_attachments ?? []).filter(
                  (attachment) => attachment.id !== attachmentId,
                ),
              })
            : item,
        ),
      );
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <BudgetContext.Provider
      value={{
        categories,
        items,
        loading,
        refresh,
        createCategory,
        createItem,
        updateItem,
        deleteItem,
        addPayment,
        removePayment,
        addAttachment,
        removeAttachment,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used inside BudgetProvider");
  }
  return context;
}
