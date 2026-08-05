import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/db";
import { TemplateRenderer } from "@/engine/TemplateRenderer";

export default async function SitePage({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  const project = await getProjectBySlug(site);

  if (!project?.config_json) {
    notFound();
  }

  return (
    <TemplateRenderer
      config={project.config_json}
      projectId={project.id}
    />
  );
}
