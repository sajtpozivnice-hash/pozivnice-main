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
    configSource: "paste",
    configText: "",
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

  const handleSubmit = async (
    values: ProjectFormValues,
    extras?: { config_json?: import("@/types/project").UniversalProjectConfig },
  ) => {
    setSubmitting(true);
    setError("");
    try {
      const template =
        values.template || extras?.config_json?.template || "";
      if (!template) {
        setError("Izaberite template ili ubacite validan config JSON");
        return;
      }
      const res = await adminFetch("/api/admin/projects", {
        method: "POST",
        body: JSON.stringify({
          client_id: values.client_id,
          title: values.title,
          subdomain: values.subdomain,
          template,
          eventType: values.eventType,
          eventDate: values.eventDate || undefined,
          published: values.published,
          config_json: extras?.config_json,
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
        description="Ubaci invite-config.json iz mejla ili koristi template default."
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
