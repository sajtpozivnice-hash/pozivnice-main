import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/db";
import { TemplateRenderer } from "@/engine/TemplateRenderer";
import { vencanjeDefaultConfig } from "@/templates/vencanje/config";

export default async function SitePage({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;

  // const config = await getProjectBySlug(site);
  const config = vencanjeDefaultConfig;
  if (!config) {
    notFound();
  }

  return <TemplateRenderer config={config} />;
}
