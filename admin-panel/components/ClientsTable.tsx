"use client";
import { useEffect, useState } from "react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function ClientsTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    const res = await fetch("/api/admin/clients");
    const data = await res.json();
    setClients(data);
    setLoading(false);
  };

  const deleteClient = async (id: string) => {
    await fetch(`/api/admin/clients?id=${id}`, { method: "DELETE" });
    fetchClients();
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <table className="table-auto w-full border">
      <thead>
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Phone</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td className="border p-2">{client.name}</td>
            <td className="border p-2">{client.email}</td>
            <td className="border p-2">{client.phone}</td>
            <td className="border p-2">
              <button
                className="text-red-500"
                onClick={() => deleteClient(client.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
