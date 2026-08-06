import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { deleteProjectsByIds } from "@/services/cascadeDelete.service";
import type { Client } from "@/types/project";

export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabaseAdmin
    .from("clients")
    .select("id, name, email, phone, auth_user_id, created_at, updated_at")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return (data || []) as Client[];
}

export async function getClientById(id: string): Promise<Client> {
  const { data, error } = await supabaseAdmin
    .from("clients")
    .select("id, name, email, phone, auth_user_id, created_at, updated_at")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data as Client;
}

/**
 * Deletes client projects (and blocking child rows), then the client row.
 * Also removes auth user when present.
 */
export async function deleteClient(id: string): Promise<void> {
  const client = await getClientById(id);

  const { data: projects, error: projectsError } = await supabaseAdmin
    .from("projects")
    .select("id")
    .eq("client_id", id);

  if (projectsError) throw new Error(projectsError.message);

  const projectIds = (projects || []).map((p) => p.id as string);
  await deleteProjectsByIds(projectIds);

  const { error } = await supabaseAdmin.from("clients").delete().eq("id", id);
  if (error) throw new Error(error.message);

  if (client.auth_user_id) {
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(
      client.auth_user_id,
    );
    if (authError) {
      console.warn(
        `Client deleted but auth user cleanup failed: ${authError.message}`,
      );
    }
  }
}
