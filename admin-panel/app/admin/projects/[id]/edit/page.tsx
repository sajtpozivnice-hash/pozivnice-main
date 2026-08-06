"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ProjectForm,
  type ProjectFormValues,
} from "@/components/projects/ProjectForm";
import { Button } from "@/components/ui/Button";
import { EmptyState, PageHeader, Spinner } from "@/components/ui/Page";
import { adminFetch } from "@/lib/adminFetch";
import type {
  Client,
  EventType,
  ProjectWithClient,
  TemplateCatalogItem,
  TemplateKey,
  UniversalProjectConfig,
} from "@/types/project";

export default function EditProjectPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<ProjectWithClient | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [templates, setTemplates] = useState<TemplateCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [pRes, cRes, tRes] = await Promise.all([
          adminFetch(`/api/admin/projects/${params.id}`),
          adminFetch("/api/admin/clients"),
          adminFetch("/api/admin/templates"),
        ]);
        const pData = await pRes.json();
        const cData = await cRes.json();
        const tData = await tRes.json();
        if (!pRes.ok) throw new Error(pData.error || "Nije pronađen");
        setProject(pData);
        if (Array.isArray(cData)) setClients(cData);
        if (Array.isArray(tData)) setTemplates(tData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Greška");
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  const initial = useMemo<ProjectFormValues | null>(() => {
    if (!project) return null;
    const config = project.config_json as UniversalProjectConfig;
    return {
      client_id: project.client_id,
      title: project.title,
      eventType: (config?.eventType || "wedding") as EventType,
      template: (config?.template || "") as TemplateKey | "",
      subdomain: project.subdomain || "",
      eventDate: config?.event?.date || "",
      published: project.published === true,
    };
  }, [project]);

  const handleSubmit = async (
    values: ProjectFormValues,
    extras?: { resetConfig?: boolean },
  ) => {
    if (!project) return;
    setSubmitting(true);
    setError("");
    try {
      if (!values.template) {
        setError("Izaberite template");
        return;
      }
      const res = await adminFetch(`/api/admin/projects/${project.id}`, {
        method: "PUT",
        body: JSON.stringify({
          client_id: values.client_id,
          title: values.title,
          subdomain: values.subdomain,
          template: values.template,
          eventType: values.eventType,
          eventDate: values.eventDate || undefined,
          published: values.published,
          resetConfig: extras?.resetConfig,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Čuvanje nije uspelo");
      router.push(`/admin/projects/${project.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

  if (!project || !initial) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <EmptyState
          title="Projekat nije pronađen"
          description={error}
          action={
            <Link href="/admin/projects">
              <Button>Nazad</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Izmena projekta"
        description={project.title}
        actions={
          <Link href={`/admin/projects/${project.id}`}>
            <Button variant="ghost">Nazad</Button>
          </Link>
        }
      />

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <ProjectForm
          mode="edit"
          initial={initial}
          clients={clients}
          templates={templates}
          submitting={submitting}
          error={error}
          onSubmit={handleSubmit}
          onCancel={() => router.push(`/admin/projects/${project.id}`)}
        />
      </div>
    </div>
  );
}
