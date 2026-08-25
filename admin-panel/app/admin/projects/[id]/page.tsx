"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  Badge,
  EmptyState,
  PageHeader,
  Spinner,
  formatDate,
  formatDateTime,
} from "@/components/ui/Page";
import { getEditorUrl, getInvitationUrl, getInvitationSubdomainUrl } from "@/lib/urls";
import { adminFetch } from "@/lib/adminFetch";
import {
  EVENT_TYPE_LABELS,
  normalizeEventType,
  type EventType,
  type ProjectWithClient,
  type UniversalProjectConfig,
} from "@/types/project";

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<ProjectWithClient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminFetch(`/api/admin/projects/${params.id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Projekat nije pronađen");
      setProject(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
      setProject(null);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async () => {
    if (!project) return;
    setDeleting(true);
    try {
      const res = await adminFetch(`/api/admin/projects/${project.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Brisanje nije uspelo");
      router.push("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
      setDeleteOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Spinner />;

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <EmptyState
          title="Projekat nije pronađen"
          description={error || "Proverite ID ili se vratite na listu."}
          action={
            <Link href="/admin/projects">
              <Button>Nazad na projekte</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const config = project.config_json as UniversalProjectConfig;
  const normalized = normalizeEventType(config?.eventType, config?.template);
  const eventType = (
    normalized === "unknown" ? "wedding" : normalized
  ) as EventType;
  const inviteUrl = getInvitationUrl(project.subdomain);
  const subdomainUrl = getInvitationSubdomainUrl(project.subdomain);
  const editorUrl = getEditorUrl(config?.template || "vencanje-terra");
  const clientName = project.clients?.name || project.client_name || "—";
  const clientEmail = project.clients?.email || "—";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <PageHeader
        title={project.title}
        description="Pregled projekta i brze akcije."
        actions={
          <>
            <Link href="/admin/projects">
              <Button variant="ghost">Lista</Button>
            </Link>
            <Link href={`/admin/projects/${project.id}/edit`}>
              <Button variant="secondary">Izmeni</Button>
            </Link>
          </>
        }
      />

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mb-6 flex flex-wrap gap-2">
        <Badge tone={project.published ? "success" : "warning"}>
          {project.published ? "Aktivan" : "Neaktivan"}
        </Badge>
        <Badge tone="accent">{EVENT_TYPE_LABELS[eventType]}</Badge>
        <Badge>{config?.template || "—"}</Badge>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <a href={inviteUrl} target="_blank" rel="noreferrer">
          <Button>Otvori pozivnicu</Button>
        </a>
        <a href={editorUrl} target="_blank" rel="noreferrer">
          <Button variant="outline">Otvori editor</Button>
        </a>
        <Link href={`/admin/projects/${project.id}/edit`}>
          <Button variant="secondary">Izmeni projekat</Button>
        </Link>
        <Button variant="danger" onClick={() => setDeleteOpen(true)}>
          Obriši projekat
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard label="Naziv" value={project.title} />
        <InfoCard label="Klijent" value={clientName} />
        <InfoCard label="Email" value={clientEmail} />
        <InfoCard label="Subdomain" value={project.subdomain} mono />
        <InfoCard label="Link za slanje (www OK)" value={inviteUrl} link />
        <InfoCard
          label="Subdomain (samo bez www)"
          value={subdomainUrl}
          link
        />
        <InfoCard
          label="Datum događaja"
          value={formatDate(config?.event?.date)}
        />
        <InfoCard label="Kreiran" value={formatDateTime(project.created_at)} />
        <InfoCard
          label="Poslednja izmena"
          value={formatDateTime(project.updated_at)}
        />
      </div>

      <Modal
        open={deleteOpen}
        title="Obriši projekat?"
        description="Ova akcija je trajna. Briše se projekat, a povezani podaci (gosti, stolovi, budžet…) mogu biti obrisani kaskadno ako postoje FK veze."
        confirmLabel="Trajno obriši"
        danger
        loading={deleting}
        confirmDisabled={confirmText.trim() !== project.title}
        onClose={() => {
          setDeleteOpen(false);
          setConfirmText("");
        }}
        onConfirm={handleDelete}
      >
        <p className="text-sm text-[var(--muted)]">
          Unesite tačan naziv projekta da potvrdite:{" "}
          <strong className="text-[var(--foreground)]">{project.title}</strong>
        </p>
        <input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="mt-3 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          placeholder="Naziv projekta"
        />
        <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-[var(--muted)]">
          <li>Subdomain: {project.subdomain}</li>
          <li>Klijent: {clientName}</li>
          <li>Template / config se gubi</li>
        </ul>
      </Modal>
    </div>
  );
}

function InfoCard({
  label,
  value,
  mono,
  link,
}: {
  label: string;
  value: string;
  mono?: boolean;
  link?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="text-xs uppercase tracking-wide text-[var(--muted)]">
        {label}
      </div>
      {link ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="mt-1 block break-all text-sm font-medium text-[var(--accent)] hover:underline"
        >
          {value}
        </a>
      ) : (
        <div
          className={`mt-1 text-sm font-medium text-[var(--foreground)] ${
            mono ? "font-mono" : ""
          }`}
        >
          {value}
        </div>
      )}
    </div>
  );
}
