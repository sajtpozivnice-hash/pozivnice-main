import { notFound } from "next/navigation";
import { EditorProvider } from "@/editor/EditorProvider";
import EditorLayout from "@/editor/EditorLayout";
import { getDefaultProject } from "@/templates";

type EditorPageProps = {
  params: Promise<{ site: string }>;
};

export default async function EditorPage({ params }: EditorPageProps) {
  const { site } = await params;
  const config = getDefaultProject(site);

  if (!config) notFound();

  return (
    <EditorProvider key={site} initialConfig={config}>
      <EditorLayout />
    </EditorProvider>
  );
}
