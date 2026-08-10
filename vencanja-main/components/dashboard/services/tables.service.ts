import { CreateTableDto, Table } from "@/components/dashboard/types";
import { createClient } from "@/lib/supabase/client";
import { isDemoMode } from "@/lib/demo/mode";
import {
  demoCreateTable,
  demoDeleteTable,
  demoGetTables,
  demoUpdateTable,
} from "@/lib/demo/adapters";

const supabase = createClient();

export const getTablesByProjectService = async (
  projectId: string,
): Promise<Table[]> => {
  if (isDemoMode()) return demoGetTables(projectId);

  const { data, error } = await supabase
    .from("tables")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const createTableService = async (
  projectId: string,
  table: CreateTableDto,
): Promise<Table> => {
  if (isDemoMode()) return demoCreateTable(projectId, table);

  const { data, error } = await supabase
    .from("tables")
    .insert({
      project_id: projectId,
      ...table,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateTableService = async (
  id: string,
  updates: Partial<CreateTableDto>,
): Promise<Table> => {
  if (isDemoMode()) return demoUpdateTable(id, updates);

  const { data, error } = await supabase
    .from("tables")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteTableService = async (id: string): Promise<void> => {
  if (isDemoMode()) {
    demoDeleteTable(id);
    return;
  }

  const { error } = await supabase.from("tables").delete().eq("id", id);

  if (error) {
    throw error;
  }
};
