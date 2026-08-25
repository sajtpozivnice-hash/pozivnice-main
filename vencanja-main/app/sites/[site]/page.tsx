import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug } from "@/lib/db";
import { INVITATION_SITE_HEADER } from "@/lib/domain";
import { buildInvitationMetadata } from "@/lib/invitationOgMetadata";
import { TemplateRenderer } from "@/engine/TemplateRenderer";

type PageProps = {
  params: Promise<{ site: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { site } = await params;
  const slug = site.trim().toLowerCase();
  if (!slug) {
    return { title: "Pozivnica" };
  }

  const project = await getProjectBySlug(slug);
  if (!project?.config_json) {
    return { title: "Pozivnica" };
  }

  return buildInvitationMetadata({
    config: project.config_json,
    subdomain: project.subdomain || slug,
    projectTitle: project.title,
  });
}

export default async function SitePage({ params }: PageProps) {
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
    <TemplateRenderer
      config={project.config_json}
      projectId={project.id}
      showBrandCredit
    />
  );
}
