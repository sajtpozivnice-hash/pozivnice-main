"use client";

import { useEffect, useState } from "react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  paid: boolean;
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // ADD CLIENT
  const addClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });

      const data = await res.json();

      if (res.ok) {
        setNewClient({ name: "", email: "", phone: "" });
        fetchClients();
      } else {
        setError(data.error);
      }
    } catch {
      setError("Network error");
    }
  };

  // UPDATE CLIENT
  const updateClient = async (client: Client) => {
    try {
      const res = await fetch("/api/admin/clients", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
      } else {
        fetchClients();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE CLIENT
  const deleteClient = async (id: string) => {
    if (!confirm("Da li zelite da obrisete ovog klijenta?")) return;

    await fetch(`/api/admin/clients?id=${id}`, {
      method: "DELETE",
    });

    fetchClients();
  };

  // TOGGLE PAID
  const togglePaid = (client: Client) => {
    setClients((prev) =>
      prev.map((c) => (c.id === client.id ? { ...c, paid: !c.paid } : c)),
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl mb-6">Admin – Klijenti</h1>

      {/* ADD CLIENT */}
      <form onSubmit={addClient} className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          placeholder="Ime i Prezime"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          className="border p-2 rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={newClient.email}
          onChange={(e) =>
            setNewClient({ ...newClient, email: e.target.value })
          }
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Telefon"
          value={newClient.phone}
          onChange={(e) =>
            setNewClient({ ...newClient, phone: e.target.value })
          }
          className="border p-2 rounded"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button className="bg-blue-600 text-white p-2 rounded">
          Dodaj Klijenta
        </button>
      </form>

      {/* CLIENTS TABLE */}
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border p-2">Ime</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Telefon</th>
            <th className="border p-2">Placeno</th>
            <th className="border p-2">Akcije</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="border p-2">
                <input
                  value={client.name}
                  onChange={(e) =>
                    setClients((prev) =>
                      prev.map((c) =>
                        c.id === client.id ? { ...c, name: e.target.value } : c,
                      ),
                    )
                  }
                  className="border p-1 rounded w-full"
                />
              </td>

              <td className="border p-2">
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
                  className="border p-1 rounded w-full"
                />
              </td>

              <td className="border p-2">
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
                  className="border p-1 rounded w-full"
                />
              </td>

              <td className="border p-2">
                <button
                  className={`p-1 rounded ${
                    client.paid
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                  onClick={() => togglePaid(client)}
                >
                  {client.paid ? "Placeno" : "Nije placeno"}
                </button>
              </td>

              <td className="border p-2 flex gap-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => updateClient(client)}
                >
                  Update
                </button>

                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteClient(client.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
