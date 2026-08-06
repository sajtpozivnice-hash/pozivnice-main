"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProjectForm, type ProjectFormValues } from "@/components/projects/ProjectForm";
import { PageHeader, Spinner } from "@/components/ui/Page";
import { Button } from "@/components/ui/Button";
import { adminFetch } from "@/lib/adminFetch";
import type { Client, TemplateCatalogItem } from "@/types/project";

export default function NewProjectPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [templates, setTemplates] = useState<TemplateCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const initial: ProjectFormValues = {
    client_id: "",
    title: "",
    eventType: "wedding",
    template: "",
    subdomain: "",
    eventDate: "",
    published: true,
  };

  useEffect(() => {
    (async () => {
      try {
        const [cRes, tRes] = await Promise.all([
          adminFetch("/api/admin/clients"),
          adminFetch("/api/admin/templates"),
        ]);
        const cData = await cRes.json();
        const tData = await tRes.json();
        if (Array.isArray(cData)) setClients(cData);
        if (Array.isArray(tData)) setTemplates(tData);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (values: ProjectFormValues) => {
    setSubmitting(true);
    setError("");
    try {
      if (!values.template) {
        setError("Izaberite template");
        return;
      }
      const res = await adminFetch("/api/admin/projects", {
        method: "POST",
        body: JSON.stringify({
          client_id: values.client_id,
          title: values.title,
          subdomain: values.subdomain,
          template: values.template,
          eventType: values.eventType,
          eventDate: values.eventDate || undefined,
          published: values.published,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Greška pri kreiranju");
      router.push(`/admin/projects/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Novi projekat"
        description="Kreira se početni config iz template default-a i povezuje sa klijentom."
        actions={
          <Link href="/admin/projects">
            <Button variant="ghost">Nazad</Button>
          </Link>
        }
      />

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <ProjectForm
          mode="create"
          initial={initial}
          clients={clients}
          templates={templates}
          submitting={submitting}
          error={error}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/projects")}
        />
      </div>
    </div>
  );
}
