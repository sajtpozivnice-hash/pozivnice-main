import GuestUploadPage from "@/components/invitation/GuestUploadPage";
import {
  invitationDisplayNames,
  loadInvitationProject,
} from "@/lib/loadInvitationProject";

export default async function InvitationPathUploadPage({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  const project = await loadInvitationProject(site, {
    requireTenantHeader: false,
  });

  return (
    <GuestUploadPage
      projectId={project.id}
      title={invitationDisplayNames(project)}
      eventDate={project.config_json.event?.date}
    />
  );
}
