import { createClient } from "@/lib/supabase/server";
import { UniversalProjectConfig } from "@/types/config";

export type PublicSiteProject = {
  id: string;
  title: string;
  subdomain: string;
  published: boolean;
  config_json: UniversalProjectConfig;
};

type RpcProjectRow = {
  id: string;
  title: string;
  subdomain: string;
  published: boolean;
  config_json: UniversalProjectConfig;
};

export async function getProjectBySlug(
  subdomain: string,
): Promise<PublicSiteProject | null> {
  const slug = subdomain.trim().toLowerCase();
  if (!slug) return null;

  const supabase = await createClient();
  const { data, error } = await supabase.rpc(
    "get_published_project_by_subdomain",
    { p_subdomain: slug },
  );

  if (error || !data) {
    return null;
  }

  const row = (Array.isArray(data) ? data[0] : data) as RpcProjectRow | null;
  if (!row?.id || !row.config_json) {
    return null;
  }

  return {
    id: row.id,
    title: row.title,
    subdomain: row.subdomain,
    published: row.published,
    config_json: row.config_json,
  };
}

export const getDefaultProjectBySlug = (param: string) => {
  void param;
  return;
};
