"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Field, SelectField } from "@/components/ui/Field";
import {
  EmptyState,
  PageHeader,
  Spinner,
} from "@/components/ui/Page";
import {
  ProjectCard,
  ProjectTable,
} from "@/components/projects/ProjectList";
import { adminFetch } from "@/lib/adminFetch";
import type {
  Client,
  EventType,
  ProjectListItem,
  ProjectsListResult,
  ProjectSortField,
  TemplateCatalogItem,
} from "@/types/project";
import { EVENT_TYPE_LABELS } from "@/types/project";

export default function AdminProjectsPage() {
  const [result, setResult] = useState<ProjectsListResult | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [templates, setTemplates] = useState<TemplateCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState<EventType | "all">("all");
  const [template, setTemplate] = useState("all");
  const [published, setPublished] = useState<"all" | "true" | "false">("all");
  const [clientId, setClientId] = useState("all");
  const [sort, setSort] = useState<ProjectSortField>("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const loadMeta = useCallback(async () => {
    const [clientsRes, templatesRes] = await Promise.all([
      adminFetch("/api/admin/clients"),
      adminFetch("/api/admin/templates"),
    ]);
    const clientsData = await clientsRes.json();
    const templatesData = await templatesRes.json();
    if (Array.isArray(clientsData)) setClients(clientsData);
    if (Array.isArray(templatesData)) setTemplates(templatesData);
  }, []);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        search,
        eventType,
        template,
        published,
        clientId,
        sort,
        order,
        page: String(page),
        pageSize: "12",
      });
      const res = await adminFetch(`/api/admin/projects?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Greška pri učitavanju");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [search, eventType, template, published, clientId, sort, order, page]);

  useEffect(() => {
    loadMeta();
  }, [loadMeta]);

  useEffect(() => {
    const t = setTimeout(loadProjects, 200);
    return () => clearTimeout(t);
  }, [loadProjects]);

  const items: ProjectListItem[] = result?.items || [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Projekti"
        description="Upravljajte pozivnicama, subdomain-ima i aktivacijom."
        actions={
          <Link href="/admin/projects/new">
            <Button>Novi projekat</Button>
          </Link>
        }
      />

      <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <Field
            label="Pretraga"
            value={search}
            onChange={(v) => {
              setPage(1);
              setSearch(v);
            }}
            placeholder="Naziv, klijent, subdomain…"
            className="xl:col-span-2"
          />
          <SelectField
            label="Tip događaja"
            value={eventType}
            onChange={(v) => {
              setPage(1);
              setEventType(v as EventType | "all");
            }}
            options={[
              { value: "all", label: "Svi tipovi" },
              ...(Object.keys(EVENT_TYPE_LABELS) as EventType[]).map((k) => ({
                value: k,
                label: EVENT_TYPE_LABELS[k],
              })),
            ]}
          />
          <SelectField
            label="Template"
            value={template}
            onChange={(v) => {
              setPage(1);
              setTemplate(v);
            }}
            options={[
              { value: "all", label: "Svi template-i" },
              ...templates.map((t) => ({ value: t.key, label: t.title })),
            ]}
          />
          <SelectField
            label="Status"
            value={published}
            onChange={(v) => {
              setPage(1);
              setPublished(v as "all" | "true" | "false");
            }}
            options={[
              { value: "all", label: "Svi statusi" },
              { value: "true", label: "Aktivan" },
              { value: "false", label: "Neaktivan" },
            ]}
          />
          <SelectField
            label="Klijent"
            value={clientId}
            onChange={(v) => {
              setPage(1);
              setClientId(v);
            }}
            options={[
              { value: "all", label: "Svi klijenti" },
              ...clients.map((c) => ({ value: c.id, label: c.name })),
            ]}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-end gap-3">
          <SelectField
            label="Sortiraj po"
            value={sort}
            onChange={(v) => setSort(v as ProjectSortField)}
            options={[
              { value: "created_at", label: "Datum kreiranja" },
              { value: "updated_at", label: "Poslednja izmena" },
              { value: "title", label: "Naziv" },
              { value: "subdomain", label: "Subdomain" },
              { value: "published", label: "Status" },
            ]}
            className="min-w-[180px]"
          />
          <SelectField
            label="Redosled"
            value={order}
            onChange={(v) => setOrder(v as "asc" | "desc")}
            options={[
              { value: "desc", label: "Opadajuće" },
              { value: "asc", label: "Rastuće" },
            ]}
            className="min-w-[140px]"
          />
          {result ? (
            <p className="ml-auto pb-2 text-sm text-[var(--muted)]">
              {result.total} projekata
            </p>
          ) : null}
        </div>
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? <Spinner /> : null}

      {!loading && items.length === 0 ? (
        <EmptyState
          title="Nema projekata"
          description="Kreirajte prvi projekat ili promenite filtere."
          action={
            <Link href="/admin/projects/new">
              <Button>Novi projekat</Button>
            </Link>
          }
        />
      ) : null}

      {!loading && items.length > 0 ? (
        <>
          <div className="grid gap-4 md:hidden">
            {items.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <ProjectTable projects={items} />

          {result && result.totalPages > 1 ? (
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prethodna
              </Button>
              <span className="text-sm text-[var(--muted)]">
                {result.page} / {result.totalPages}
              </span>
              <Button
                variant="outline"
                disabled={page >= result.totalPages}
                onClick={() =>
                  setPage((p) => Math.min(result.totalPages, p + 1))
                }
              >
                Sledeća
              </Button>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
