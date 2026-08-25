import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/db";
import { INVITATION_SITE_HEADER } from "@/lib/domain";
import GuestUploadPage from "@/components/invitation/GuestUploadPage";

export default async function SiteUploadPage({
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

  const names =
    project.config_json.event?.names ||
    project.config_json.meta?.title ||
    project.title ||
    "Naša proslava";

  return (
    <GuestUploadPage
      projectId={project.id}
      title={names}
      eventDate={project.config_json.event?.date}
    />
  );
}
