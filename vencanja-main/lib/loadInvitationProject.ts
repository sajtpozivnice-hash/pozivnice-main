import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getProjectBySlug, type PublicSiteProject } from "@/lib/db";
import { INVITATION_SITE_HEADER } from "@/lib/domain";

/** Tenant subdomain rewrite sets header; apex `/i/[site]` is public by slug. */
export async function loadInvitationProject(
  siteParam: string,
  options: { requireTenantHeader: boolean },
): Promise<PublicSiteProject> {
  const slug = siteParam.trim().toLowerCase();
  if (!slug) notFound();

  if (options.requireTenantHeader) {
    const headerStore = await headers();
    const invitationSite = headerStore
      .get(INVITATION_SITE_HEADER)
      ?.toLowerCase();
    if (!invitationSite || invitationSite !== slug) {
      notFound();
    }
  }

  const project = await getProjectBySlug(slug);
  if (!project?.config_json) {
    notFound();
  }

  return project;
}

export function invitationDisplayNames(project: PublicSiteProject): string {
  return (
    project.config_json.event?.names ||
    project.config_json.meta?.title ||
    project.title ||
    "Naša proslava"
  );
}
