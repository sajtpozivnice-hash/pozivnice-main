"use client";

import Link from "next/link";
import { Badge, formatDate, formatDateTime } from "@/components/ui/Page";
import { EVENT_TYPE_LABELS, type ProjectListItem } from "@/types/project";

function StatusBadge({ published }: { published: boolean }) {
  return (
    <Badge tone={published ? "success" : "warning"}>
      {published ? "Aktivan" : "Neaktivan"}
    </Badge>
  );
}

function EventBadge({ type }: { type: ProjectListItem["event_type"] }) {
  if (type === "unknown") return <Badge>Nepoznato</Badge>;
  return <Badge tone="accent">{EVENT_TYPE_LABELS[type]}</Badge>;
}

export function ProjectCard({ project }: { project: ProjectListItem }) {
  return (
    <Link
      href={`/admin/projects/${project.id}`}
      className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)]">
            {project.title}
          </h3>
          <p className="mt-0.5 text-sm text-[var(--muted)]">
            {project.client_name}
          </p>
        </div>
        <StatusBadge published={project.published} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <EventBadge type={project.event_type} />
        <Badge>{project.template}</Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[var(--muted)]">
        <div>
          <div className="uppercase tracking-wide">Subdomain</div>
          <div className="mt-0.5 font-medium text-[var(--foreground)]">
            {project.subdomain || "—"}
          </div>
        </div>
        <div>
          <div className="uppercase tracking-wide">Događaj</div>
          <div className="mt-0.5 font-medium text-[var(--foreground)]">
            {formatDate(project.event_date)}
          </div>
        </div>
        <div>
          <div className="uppercase tracking-wide">Kreiran</div>
          <div className="mt-0.5">{formatDate(project.created_at)}</div>
        </div>
        <div>
          <div className="uppercase tracking-wide">Izmenjen</div>
          <div className="mt-0.5">{formatDateTime(project.updated_at)}</div>
        </div>
      </div>
    </Link>
  );
}

export function ProjectTable({ projects }: { projects: ProjectListItem[] }) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] md:block">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-[var(--border)] bg-[var(--surface-2)]/60 text-xs uppercase tracking-wide text-[var(--muted)]">
          <tr>
            <th className="px-4 py-3 font-medium">Projekat</th>
            <th className="px-4 py-3 font-medium">Klijent</th>
            <th className="px-4 py-3 font-medium">Tip</th>
            <th className="px-4 py-3 font-medium">Template</th>
            <th className="px-4 py-3 font-medium">Subdomain</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Kreiran</th>
            <th className="px-4 py-3 font-medium">Izmenjen</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-b border-[var(--border)] last:border-0 transition hover:bg-[var(--surface-2)]/50"
            >
              <td className="px-4 py-3">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="font-medium text-[var(--foreground)] hover:text-[var(--accent)]"
                >
                  {project.title}
                </Link>
              </td>
              <td className="px-4 py-3 text-[var(--muted)]">
                <div>{project.client_name}</div>
                {project.client_email ? (
                  <div className="text-xs">{project.client_email}</div>
                ) : null}
              </td>
              <td className="px-4 py-3">
                <EventBadge type={project.event_type} />
              </td>
              <td className="px-4 py-3 text-[var(--muted)]">{project.template}</td>
              <td className="px-4 py-3 font-mono text-xs">{project.subdomain}</td>
              <td className="px-4 py-3">
                <StatusBadge published={project.published} />
              </td>
              <td className="px-4 py-3 text-[var(--muted)]">
                {formatDate(project.created_at)}
              </td>
              <td className="px-4 py-3 text-[var(--muted)]">
                {formatDateTime(project.updated_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
