import { Project } from "@/components/dashboard/types";
import { createClient } from "@/lib/supabase/client";
import { UniversalProjectConfig } from "@/types/config";

const supabase = createClient();

export const getProject = async (projectId: string): Promise<Project> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) throw error;

  return data;
};

export const getProjects = async (clientId: string): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const updateProject = async (
  projectId: string,
  updates: Partial<Project>,
): Promise<Project> => {
  const { data, error } = await supabase
    .from("projects")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateConfig = async (
  projectId: string,
  config: UniversalProjectConfig,
): Promise<Project> => {
  return updateProject(projectId, {
    config_json: config,
  });
};
