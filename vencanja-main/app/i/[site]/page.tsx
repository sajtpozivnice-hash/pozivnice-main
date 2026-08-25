import { TemplateRenderer } from "@/engine/TemplateRenderer";
import { loadInvitationProject } from "@/lib/loadInvitationProject";

/** Works on www.vasdogadjaj.com and vasdogadjaj.com (apex→www). */
export default async function InvitationPathPage({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  const project = await loadInvitationProject(site, {
    requireTenantHeader: false,
  });

  return (
    <TemplateRenderer config={project.config_json} projectId={project.id} />
  );
}
