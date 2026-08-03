// lib/client/getCurrentClient.ts

import { createClient } from "@/lib/supabase/server";

export async function getCurrentClient() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  if (clientError || !client) {
    return null;
  }

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", client.id)
    .order("created_at", { ascending: false });

  if (projectsError) {
    return null;
  }

  return {
    user,
    client,
    projects: projects ?? [],
  };
}
