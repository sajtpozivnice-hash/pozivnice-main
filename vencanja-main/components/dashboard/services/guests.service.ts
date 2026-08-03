import { createClient } from "@/lib/supabase/client";
import { CreateGuestDto, Guest } from "../types";
const supabase = createClient();

export const getGuestsByProjectService = async (
  projectId: string,
): Promise<Guest[]> => {
  const { data, error } = await supabase
    .from("guests")
    .select(
      `
        *,
        tables(
          id,
          name
        )
      `,
    )
    .eq("project_id", projectId)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const createGuestService = async (
  projectId: string,
  guest: CreateGuestDto,
): Promise<Guest> => {
  const { data, error } = await supabase
    .from("guests")
    .insert({
      project_id: projectId,
      ...guest,
    })
    .select(
      `
      *,
      tables(
        id,
        name
      )
    `,
    )
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateGuestService = async (
  id: string,
  updates: Partial<Guest>,
): Promise<Guest> => {
  const { data, error } = await supabase
    .from("guests")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select(
      `
      *,
      tables(
        id,
        name
      )
    `,
    )
    .single();
  if (error) {
    throw error;
  }

  return data;
};

export const deleteGuestService = async (id: string): Promise<void> => {
  const { error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    throw error;
  }
};
