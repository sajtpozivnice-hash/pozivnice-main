import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { Client } from "@/types/project";

export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabaseAdmin
    .from("clients")
    .select("id, name, email, phone, paid, created_at, updated_at")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return (data || []) as Client[];
}

export async function getClientById(id: string): Promise<Client> {
  const { data, error } = await supabaseAdmin
    .from("clients")
    .select("id, name, email, phone, paid, created_at, updated_at")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data as Client;
}
