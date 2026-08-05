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
  CreatePlannerCategoryDto,
  CreatePlannerTaskDto,
  PlannerCategory,
  PlannerTask,
  UpdatePlannerTaskDto,
} from "../types";
import {
  createPlannerCategoriesBulkService,
  createPlannerCategoryService,
  createPlannerTaskService,
  createPlannerTasksBulkService,
  deletePlannerTaskService,
  getPlannerCategoriesByProjectService,
  getPlannerTasksByProjectService,
  updatePlannerTaskService,
} from "../services/planner.service";
import {
  getPlannerCategoriesForEvent,
  getPlannerTasksForEvent,
} from "../PlanerZadataka/defaultTasks";
import { resolveEventType } from "@/helpers/eventType";

type PlannerContextType = {
  categories: PlannerCategory[];
  tasks: PlannerTask[];
  loading: boolean;
  refresh: () => Promise<void>;
  createCategory: (category: CreatePlannerCategoryDto) => Promise<void>;
  createTask: (task: CreatePlannerTaskDto) => Promise<void>;
  updateTask: (id: string, updates: UpdatePlannerTaskDto) => Promise<void>;
  toggleTaskCompleted: (id: string, completed: boolean) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
};

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export const PlannerProvider = ({ children }: { children: ReactNode }) => {
  const { activeProject } = useDashboard();
  const [categories, setCategories] = useState<PlannerCategory[]>([]);
  const [tasks, setTasks] = useState<PlannerTask[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!activeProject?.id) {
      setCategories([]);
      setTasks([]);
      return;
    }

    setLoading(true);
    try {
      let nextCategories = await getPlannerCategoriesByProjectService(
        activeProject.id,
      );
      let seededCategories = false;

      if (nextCategories.length === 0) {
        const eventType = resolveEventType(activeProject.config_json);
        nextCategories = await createPlannerCategoriesBulkService(
          activeProject.id,
          getPlannerCategoriesForEvent(eventType).map((name, index) => ({
            name,
            sort_order: index + 1,
          })),
        );
        seededCategories = true;
      }

      let nextTasks = await getPlannerTasksByProjectService(activeProject.id);

      if (seededCategories && nextTasks.length === 0) {
        const eventType = resolveEventType(activeProject.config_json);
        nextTasks = await createPlannerTasksBulkService(
          activeProject.id,
          getPlannerTasksForEvent(eventType).map((task) => ({
            title: task.title,
            category: task.category,
            description: task.description,
            priority: task.priority,
            sort_order: task.sort_order,
            completed: false,
            due_date: null,
          })),
        );
      }

      setCategories(nextCategories);
      setTasks(nextTasks);
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

  const createCategory = async (category: CreatePlannerCategoryDto) => {
    if (!activeProject?.id) return;
    setLoading(true);
    try {
      const created = await createPlannerCategoryService(
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

  const createTask = async (task: CreatePlannerTaskDto) => {
    if (!activeProject?.id) return;
    setLoading(true);
    try {
      const created = await createPlannerTaskService(activeProject.id, task);
      setTasks((prev) => [...prev, created]);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, updates: UpdatePlannerTaskDto) => {
    setLoading(true);
    try {
      const updated = await updatePlannerTaskService(id, updates);
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompleted = async (id: string, completed: boolean) => {
    const previous = tasks.find((task) => task.id === id);
    if (!previous) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed,
              completed_at: completed ? new Date().toISOString() : null,
            }
          : task,
      ),
    );

    try {
      const updated = await updatePlannerTaskService(id, { completed });
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    } catch (error) {
      console.error(error);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? previous : task)),
      );
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    setLoading(true);
    try {
      await deletePlannerTaskService(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlannerContext.Provider
      value={{
        categories,
        tasks,
        loading,
        refresh,
        createCategory,
        createTask,
        updateTask,
        toggleTaskCompleted,
        deleteTask,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
};

export function usePlanner() {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error("usePlanner must be used inside PlannerProvider");
  }
  return context;
}
