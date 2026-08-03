import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/db";
import { EditorProvider } from "@/editor/EditorProvider";
import EditorLayout from "@/editor/EditorLayout";
import { getDefaultProject } from "@/templates";

export default async function EditorPage({ params }: any) {
  const { site } = await params;
  console.log(site, "sirteeeee");
  const config = getDefaultProject(site);

  // fallback ako template key ne postoji
  // if (!config) {
  //   console.warn(`Template for "${site}" not found, showing 404`);
  //   notFound(); // Next.js 404
  // }

  if (!config) notFound();

  return (
    <EditorProvider initialConfig={config}>
      <EditorLayout />
    </EditorProvider>
  );
}
