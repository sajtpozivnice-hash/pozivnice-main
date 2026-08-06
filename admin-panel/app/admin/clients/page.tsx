"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import {
  EmptyState,
  PageHeader,
  Spinner,
} from "@/components/ui/Page";
import { adminFetch } from "@/lib/adminFetch";

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
};

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadClients = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminFetch("/api/admin/clients");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Greška");
      setClients(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const addClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await adminFetch("/api/admin/clients", {
        method: "POST",
        body: JSON.stringify(newClient),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kreiranje nije uspelo");
      setNewClient({ name: "", email: "", phone: "" });
      await loadClients();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
    } finally {
      setSubmitting(false);
    }
  };

  const updateClient = async (client: Client) => {
    setError("");
    try {
      const res = await adminFetch("/api/admin/clients", {
        method: "PUT",
        body: JSON.stringify(client),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Čuvanje nije uspelo");
      await loadClients();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await adminFetch(`/api/admin/clients?id=${deleteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Brisanje nije uspelo");
      setDeleteId(null);
      await loadClients();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
      setDeleteId(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Klijenti"
        description="Vlasnici projekata i nalozi za dashboard."
      />

      <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="mb-4 text-sm font-semibold">Novi klijent</h2>
        <form
          onSubmit={addClient}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          <Field
            label="Ime"
            value={newClient.name}
            onChange={(v) => setNewClient((p) => ({ ...p, name: v }))}
            required
          />
          <Field
            label="Email"
            type="email"
            value={newClient.email}
            onChange={(v) => setNewClient((p) => ({ ...p, email: v }))}
            required
          />
          <Field
            label="Telefon"
            value={newClient.phone}
            onChange={(v) => setNewClient((p) => ({ ...p, phone: v }))}
          />
          <div className="flex items-end">
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Dodavanje…" : "Dodaj klijenta"}
            </Button>
          </div>
        </form>
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? <Spinner /> : null}

      {!loading && clients.length === 0 ? (
        <EmptyState
          title="Nema klijenata"
          description="Dodajte prvog klijenta da biste kreirali projekte."
        />
      ) : null}

      {!loading && clients.length > 0 ? (
        <>
          <div className="grid gap-3 md:hidden">
            {clients.map((client) => (
              <div
                key={client.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <div className="font-medium">{client.name}</div>
                <div className="text-sm text-[var(--muted)]">{client.email}</div>
                <div className="text-sm text-[var(--muted)]">
                  {client.phone || "—"}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => updateClient(client)}
                  >
                    Sačuvaj
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setDeleteId(client.id)}
                  >
                    Obriši
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-[var(--surface-2)]/60 text-xs uppercase tracking-wide text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3 font-medium">Ime</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Telefon</th>
                  <th className="px-4 py-3 font-medium">Akcije</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-[var(--border)] last:border-0"
                  >
                    <td className="px-4 py-3">
                      <input
                        value={client.name}
                        onChange={(e) =>
                          setClients((prev) =>
                            prev.map((c) =>
                              c.id === client.id
                                ? { ...c, name: e.target.value }
                                : c,
                            ),
                          )
                        }
                        className="w-full rounded-lg border border-[var(--border)] bg-transparent px-2 py-1.5"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={client.email}
                        onChange={(e) =>
                          setClients((prev) =>
                            prev.map((c) =>
                              c.id === client.id
                                ? { ...c, email: e.target.value }
                                : c,
                            ),
                          )
                        }
                        className="w-full rounded-lg border border-[var(--border)] bg-transparent px-2 py-1.5"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={client.phone || ""}
                        onChange={(e) =>
                          setClients((prev) =>
                            prev.map((c) =>
                              c.id === client.id
                                ? { ...c, phone: e.target.value }
                                : c,
                            ),
                          )
                        }
                        className="w-full rounded-lg border border-[var(--border)] bg-transparent px-2 py-1.5"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          onClick={() => updateClient(client)}
                        >
                          Sačuvaj
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => setDeleteId(client.id)}
                        >
                          Obriši
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      <Modal
        open={Boolean(deleteId)}
        title="Obriši klijenta?"
        description="Brišu se i povezani projekti (i zavisni podaci). Ova akcija je trajna."
        confirmLabel="Obriši"
        danger
        loading={deleting}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
