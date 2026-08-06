"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageHeader, Spinner } from "@/components/ui/Page";
import { adminFetch } from "@/lib/adminFetch";

export default function AdminDashboard() {
  const [ready, setReady] = useState(false);
  const [stats, setStats] = useState({ clients: 0, projects: 0, published: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [cRes, pRes] = await Promise.all([
          adminFetch("/api/admin/clients"),
          adminFetch("/api/admin/projects?pageSize=50"),
        ]);
        const clients = await cRes.json();
        const projects = await pRes.json();

        if (!cRes.ok) throw new Error(clients.error || "Greška klijenata");
        if (!pRes.ok) throw new Error(projects.error || "Greška projekata");

        setStats({
          clients: Array.isArray(clients) ? clients.length : 0,
          projects: projects?.total ?? 0,
          published:
            projects?.items?.filter(
              (p: { published: boolean }) => p.published,
            ).length ?? 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Greška");
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready) return <Spinner />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Dashboard"
        description="Pregled platforme i brzi linkovi."
        actions={
          <Link href="/admin/projects/new">
            <Button>Novi projekat</Button>
          </Link>
        }
      />

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Klijenti" value={stats.clients} href="/admin/clients" />
        <StatCard
          label="Projekti"
          value={stats.projects}
          href="/admin/projects"
        />
        <StatCard
          label="Aktivni"
          value={stats.published}
          href="/admin/projects"
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]/40 hover:shadow-md"
    >
      <div className="text-sm text-[var(--muted)]">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
    </Link>
  );
}
