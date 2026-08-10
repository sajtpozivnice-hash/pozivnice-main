import { Project } from "@/components/dashboard/types";
import { createClient } from "@/lib/supabase/client";
import { UniversalProjectConfig } from "@/types/config";
import { isDemoMode } from "@/lib/demo/mode";
import {
  demoGetProject,
  demoGetProjects,
  demoUpdateConfig,
  demoUpdateProject,
} from "@/lib/demo/adapters";

const supabase = createClient();

export const getProject = async (projectId: string): Promise<Project> => {
  if (isDemoMode()) return demoGetProject(projectId);

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) throw error;

  return data;
};

export const getProjects = async (clientId: string): Promise<Project[]> => {
  if (isDemoMode()) return demoGetProjects(clientId);

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
  if (isDemoMode()) return demoUpdateProject(projectId, updates);

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
  if (isDemoMode()) return demoUpdateConfig(projectId, config);

  return updateProject(projectId, {
    config_json: config,
  });
};
