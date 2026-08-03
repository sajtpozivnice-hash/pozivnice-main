import { CreateTableDto, Table } from "@/components/dashboard/types";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const getTablesByProjectService = async (
  projectId: string,
): Promise<Table[]> => {
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
  const { error } = await supabase.from("tables").delete().eq("id", id);

  if (error) {
    throw error;
  }
};
