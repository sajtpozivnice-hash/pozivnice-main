import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/db";
import { INVITATION_SITE_HEADER } from "@/lib/domain";
import { TemplateRenderer } from "@/engine/TemplateRenderer";

export default async function SitePage({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  const slug = site.trim().toLowerCase();

  const headerStore = await headers();
  const invitationSite = headerStore.get(INVITATION_SITE_HEADER)?.toLowerCase();

  if (!invitationSite || invitationSite !== slug) {
    notFound();
  }

  const project = await getProjectBySlug(slug);

  if (!project?.config_json) {
    notFound();
  }

  return (
    <TemplateRenderer config={project.config_json} projectId={project.id} />
  );
}
