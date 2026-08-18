"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, SelectField, TextAreaField } from "@/components/ui/Field";
import { PageHeader, Spinner } from "@/components/ui/Page";
import { adminFetch } from "@/lib/adminFetch";
import { getInvitationUrl } from "@/lib/urls";
import type { Client } from "@/types/project";

type TemplateMeta = {
  id: "payment" | "subdomain_ready";
  title: string;
  description: string;
  fields: {
    key: string;
    label: string;
    placeholder?: string;
    multiline?: boolean;
    required?: boolean;
  }[];
  defaultValues: Record<string, string>;
};

type ProjectOption = {
  id: string;
  title: string;
  subdomain: string;
  client_id: string;
  client_name: string;
};

type Preview = {
  subject: string;
  text: string;
  html: string;
};

export default function AdminEmailsPage() {
  const [templates, setTemplates] = useState<TemplateMeta[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [templateId, setTemplateId] = useState<"payment" | "subdomain_ready">(
    "payment",
  );
  const [clientId, setClientId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<Preview | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [sending, setSending] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  const activeTemplate = useMemo(
    () => templates.find((t) => t.id === templateId) || null,
    [templates, templateId],
  );

  const clientProjects = useMemo(
    () =>
      clientId
        ? projects.filter((p) => p.client_id === clientId)
        : projects,
    [projects, clientId],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [tRes, cRes, pRes] = await Promise.all([
        adminFetch("/api/admin/emails"),
        adminFetch("/api/admin/clients"),
        adminFetch("/api/admin/projects?pageSize=50&sort=created_at&order=desc"),
      ]);
      const tData = await tRes.json();
      const cData = await cRes.json();
      const pData = await pRes.json();

      if (!tRes.ok) throw new Error(tData.error || "Greška template-a");
      if (!cRes.ok) throw new Error(cData.error || "Greška klijenata");
      if (!pRes.ok) throw new Error(pData.error || "Greška projekata");

      setTemplates(Array.isArray(tData) ? tData : []);
      setClients(Array.isArray(cData) ? cData : []);
      setProjects(
        Array.isArray(pData.items)
          ? pData.items.map(
              (p: {
                id: string;
                title: string;
                subdomain: string;
                client_id: string;
                client_name: string;
              }) => ({
                id: p.id,
                title: p.title,
                subdomain: p.subdomain,
                client_id: p.client_id,
                client_name: p.client_name,
              }),
            )
          : [],
      );

      const first = Array.isArray(tData) ? tData[0] : null;
      if (first) {
        setTemplateId(first.id);
        setValues({ ...first.defaultValues });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!activeTemplate) return;
    setValues((prev) => ({
      ...activeTemplate.defaultValues,
      // keep recipient identity when switching templates
      name: prev.name || activeTemplate.defaultValues.name || "",
      email: prev.email || activeTemplate.defaultValues.email || "",
    }));
    setPreview(null);
    setNotice("");
  }, [activeTemplate?.id]);

  const applyClient = (id: string) => {
    setClientId(id);
    setProjectId("");
    const client = clients.find((c) => c.id === id);
    if (!client) return;
    setValues((prev) => ({
      ...prev,
      name: client.name || "",
      email: client.email || "",
      reference: prev.reference || client.name || "",
    }));
  };

  const applyProject = (id: string) => {
    setProjectId(id);
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    const client = clients.find((c) => c.id === project.client_id);
    const invitationUrl = project.subdomain
      ? getInvitationUrl(project.subdomain)
      : "";

    if (project.client_id) {
      setClientId(project.client_id);
    }

    setValues((prev) => ({
      ...prev,
      name: client?.name || prev.name || "",
      email: client?.email || prev.email || "",
      project_title: project.title || "",
      subdomain: project.subdomain || "",
      invitation_url: invitationUrl,
      reference: prev.reference || project.title || client?.name || "",
    }));
  };

  const setField = (key: string, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "subdomain" && templateId === "subdomain_ready") {
        next.invitation_url = value ? getInvitationUrl(value) : "";
      }
      return next;
    });
  };

  const runPreview = async () => {
    setPreviewing(true);
    setError("");
    try {
      const res = await adminFetch("/api/admin/emails", {
        method: "POST",
        body: JSON.stringify({
          templateId,
          data: values,
          previewOnly: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Preview nije uspeo");
      setPreview(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
    } finally {
      setPreviewing(false);
    }
  };

  const send = async () => {
    setSending(true);
    setError("");
    setNotice("");
    try {
      const res = await adminFetch("/api/admin/emails", {
        method: "POST",
        body: JSON.stringify({
          templateId,
          data: values,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Slanje nije uspelo");
      setNotice(`Mejl poslat na ${values.email}`);
      setPreview({
        subject: data.subject || preview?.subject || "",
        text: preview?.text || "",
        html: preview?.html || "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
    } finally {
      setSending(false);
    }
  };

  const copyText = async () => {
    if (!preview?.text) {
      await runPreview();
      return;
    }
    await navigator.clipboard.writeText(
      `${preview.subject}\n\n${preview.text}`,
    );
    setNotice("Tekst mejla kopiran u clipboard.");
  };

  if (loading) return <Spinner />;

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-6 sm:py-8">
      <PageHeader
        title="Email template-i"
        description="Popunite podatke, pregledajte i pošaljite klijentu — uplata ili obaveštenje o subdomainu."
      />

      {error ? (
        <div className="mb-4 break-words rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700 sm:px-4">
          {error}
        </div>
      ) : null}
      {notice ? (
        <div className="mb-4 break-words rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-sm text-emerald-800 sm:px-4">
          {notice}
        </div>
      ) : null}

      <div className="grid min-w-0 gap-4 lg:grid-cols-2 lg:gap-6">
        <div className="min-w-0 space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
          <SelectField
            label="Template"
            value={templateId}
            onChange={(v) =>
              setTemplateId(v as "payment" | "subdomain_ready")
            }
            options={templates.map((t) => ({
              value: t.id,
              label: t.title,
            }))}
          />
          {activeTemplate ? (
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              {activeTemplate.description}
            </p>
          ) : null}

          <SelectField
            label="Klijent (auto-popuna)"
            value={clientId}
            onChange={applyClient}
            options={[
              { value: "", label: "Ručno / bez izbora" },
              ...clients.map((c) => ({
                value: c.id,
                label: `${c.name} (${c.email})`,
              })),
            ]}
          />

          <SelectField
            label="Projekat (za subdomain template)"
            value={projectId}
            onChange={applyProject}
            options={[
              { value: "", label: "Bez projekta" },
              ...clientProjects.map((p) => ({
                value: p.id,
                label: `${p.title} — ${p.subdomain || "bez subdomain-a"}`,
              })),
            ]}
          />

          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            {activeTemplate?.fields.map((field) =>
              field.multiline ? (
                <TextAreaField
                  key={field.key}
                  className="sm:col-span-2"
                  label={field.label}
                  value={values[field.key] || ""}
                  onChange={(v) => setField(field.key, v)}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={3}
                />
              ) : (
                <Field
                  key={field.key}
                  label={field.label}
                  value={values[field.key] || ""}
                  onChange={(v) => setField(field.key, v)}
                  placeholder={field.placeholder}
                  required={field.required}
                  type={field.key === "email" ? "email" : "text"}
                />
              ),
            )}
          </div>

          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
            <Button
              type="button"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={runPreview}
              disabled={previewing}
            >
              {previewing ? "Preview…" : "Pregled"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={copyText}
            >
              Kopiraj tekst
            </Button>
            <Button
              type="button"
              className="w-full sm:w-auto"
              onClick={send}
              disabled={sending}
            >
              {sending ? "Šaljem…" : "Pošalji email"}
            </Button>
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
          <h2 className="text-sm font-semibold">Pregled</h2>
          {!preview ? (
            <p className="mt-3 text-sm text-[var(--muted)]">
              Kliknite „Pregled” da vidite subject i sadržaj pre slanja.
            </p>
          ) : (
            <div className="mt-4 min-w-0 space-y-4">
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-[var(--muted)]">
                  Subject
                </div>
                <div className="mt-1 break-words text-sm font-medium">
                  {preview.subject}
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-[var(--muted)]">
                  Tekst
                </div>
                <pre className="mt-1 max-h-[40vh] overflow-auto whitespace-pre-wrap break-words rounded-xl bg-[var(--surface-2)] p-3 text-xs leading-relaxed text-[var(--foreground)] sm:max-h-none">
                  {preview.text}
                </pre>
              </div>
              <div className="min-w-0">
                <div className="mb-1 text-xs uppercase tracking-wide text-[var(--muted)]">
                  HTML preview
                </div>
                <div className="max-h-[50vh] overflow-auto rounded-xl border border-[var(--border)] bg-white p-3 sm:max-h-none sm:p-4">
                  <div
                    className="max-w-full break-words text-sm text-black [&_a]:break-all [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: preview.html }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
