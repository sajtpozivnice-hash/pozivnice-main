import {
  CreatePlannerCategoryDto,
  CreatePlannerTaskDto,
  PlannerCategory,
  PlannerTask,
  UpdatePlannerTaskDto,
} from "@/components/dashboard/types";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const getPlannerCategoriesByProjectService = async (
  projectId: string,
): Promise<PlannerCategory[]> => {
  const { data, error } = await supabase
    .from("planner_categories")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
};

export const createPlannerCategoriesBulkService = async (
  projectId: string,
  categories: CreatePlannerCategoryDto[],
): Promise<PlannerCategory[]> => {
  const payload = categories.map((category, index) => ({
    project_id: projectId,
    name: category.name.trim(),
    sort_order: category.sort_order ?? index,
  }));

  const { data, error } = await supabase
    .from("planner_categories")
    .insert(payload)
    .select()
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
};

export const createPlannerCategoryService = async (
  projectId: string,
  category: CreatePlannerCategoryDto,
): Promise<PlannerCategory> => {
  const { data, error } = await supabase
    .from("planner_categories")
    .insert({
      project_id: projectId,
      name: category.name.trim(),
      sort_order: category.sort_order ?? 999,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getPlannerTasksByProjectService = async (
  projectId: string,
): Promise<PlannerTask[]> => {
  const { data, error } = await supabase
    .from("planner_tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
};

export const createPlannerTasksBulkService = async (
  projectId: string,
  tasks: CreatePlannerTaskDto[],
): Promise<PlannerTask[]> => {
  const payload = tasks.map((task, index) => ({
    project_id: projectId,
    category: task.category.trim(),
    title: task.title.trim(),
    description: task.description?.trim() || null,
    priority: task.priority,
    due_date: task.due_date || null,
    completed: task.completed ?? false,
    completed_at: null,
    sort_order: task.sort_order ?? index,
  }));

  const { data, error } = await supabase
    .from("planner_tasks")
    .insert(payload)
    .select()
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
};

export const createPlannerTaskService = async (
  projectId: string,
  task: CreatePlannerTaskDto,
): Promise<PlannerTask> => {
  const { data, error } = await supabase
    .from("planner_tasks")
    .insert({
      project_id: projectId,
      category: task.category.trim(),
      title: task.title.trim(),
      description: task.description?.trim() || null,
      priority: task.priority,
      due_date: task.due_date || null,
      completed: task.completed ?? false,
      completed_at: task.completed ? new Date().toISOString() : null,
      sort_order: task.sort_order ?? 999,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updatePlannerTaskService = async (
  id: string,
  updates: UpdatePlannerTaskDto,
): Promise<PlannerTask> => {
  const payload: Record<string, string | number | boolean | null> = {};

  if (updates.category !== undefined) payload.category = updates.category.trim();
  if (updates.title !== undefined) payload.title = updates.title.trim();
  if (updates.description !== undefined) {
    payload.description = updates.description?.trim() || null;
  }
  if (updates.priority !== undefined) payload.priority = updates.priority;
  if (updates.due_date !== undefined) payload.due_date = updates.due_date || null;
  if (updates.sort_order !== undefined) payload.sort_order = updates.sort_order;
  if (updates.completed !== undefined) {
    payload.completed = updates.completed;
    payload.completed_at =
      updates.completed_at !== undefined
        ? updates.completed_at
        : updates.completed
          ? new Date().toISOString()
          : null;
  } else if (updates.completed_at !== undefined) {
    payload.completed_at = updates.completed_at;
  }

  const { data, error } = await supabase
    .from("planner_tasks")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletePlannerTaskService = async (id: string): Promise<void> => {
  const { error } = await supabase.from("planner_tasks").delete().eq("id", id);
  if (error) throw error;
};
