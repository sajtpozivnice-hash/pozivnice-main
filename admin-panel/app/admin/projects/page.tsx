"use client";

import { useEffect, useState } from "react";

interface Client {
  id: string;
  name: string;
  email: string;
}

interface Project {
  id: string;
  client_id: string;
  client_name: string;
  title: string;
  config_json: any;
  subdomain: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({
    client_id: "",
    client_name: "",
    title: "",
    config_json: "{}",
    subdomain: "",
  });
  const [error, setError] = useState("");

  // Fetch clients
  const fetchClients = async () => {
    try {
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchProjects();
  }, []);

  // Add new project
  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !newProject.client_id ||
      !newProject.client_name ||
      !newProject.config_json
    ) {
      setError("Client, name and config_json are required");
      return;
    }

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: newProject.client_id,
          client_name: newProject.client_name,
          title: newProject.title,
          config_json: JSON.parse(newProject.config_json),
          subdomain: newProject.subdomain,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewProject({
          client_id: "",
          client_name: "",
          title: "",
          config_json: "{}",
          subdomain: "",
        });
        fetchProjects();
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Invalid JSON in config");
    }
  };

  // Update project
  const updateProject = async (project: Project) => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: project.id,
          client_name: project.client_name,
          title: project.title,
          config_json: project.config_json,
          subdomain: project.subdomain,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.error);
      } else {
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete project
  const deleteProject = async (id: string) => {
    if (!confirm("Da li zelite da obrisete ovaj projekat?")) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) console.error(data.error);
      else fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl mb-6">Admin – Projekti</h1>

      {/* Add Project Form */}
      <form onSubmit={addProject} className="flex flex-col gap-4 mb-8">
        <select
          value={newProject.client_id}
          onChange={(e) => {
            const selectedClient = clients.find((c) => c.id === e.target.value);
            setNewProject({
              ...newProject,
              client_id: e.target.value,
              client_name: selectedClient?.name || "",
            });
          }}
          className="border p-2 rounded bg-black text-white"
          required
        >
          <option value="">Izaberi Klijenta</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id} className="bg-black text-white">
              {c.name} ({c.email})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Naslov Projekta"
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Sub domen"
          value={newProject.subdomain}
          onChange={(e) =>
            setNewProject({ ...newProject, subdomain: e.target.value })
          }
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Konfiguracija JSON"
          value={newProject.config_json}
          onChange={(e) =>
            setNewProject({ ...newProject, config_json: e.target.value })
          }
          className="border p-2 rounded"
          rows={6}
          required
        />

        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Dodaj Projekat
        </button>
      </form>

      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border p-2">Ime Klijenta</th>
            <th className="border p-2">Naslov Projekta</th>
            <th className="border p-2">Sabdomen</th>
            <th className="border p-2">Konfiguracija JSON</th>
            <th className="border p-2">Akcije</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="border p-2">{project.client_name}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((p) =>
                        p.id === project.id
                          ? { ...p, title: e.target.value }
                          : p,
                      ),
                    )
                  }
                  className="border p-1 rounded w-full"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={project.subdomain}
                  onChange={(e) =>
                    setProjects((prev) =>
                      prev.map((p) =>
                        p.id === project.id
                          ? { ...p, subdomain: e.target.value }
                          : p,
                      ),
                    )
                  }
                  className="border p-1 rounded w-full"
                />
              </td>
              <td className="border p-2">
                <textarea
                  value={JSON.stringify(project.config_json, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setProjects((prev) =>
                        prev.map((p) =>
                          p.id === project.id
                            ? { ...p, config_json: parsed }
                            : p,
                        ),
                      );
                    } catch {}
                  }}
                  className="border p-1 rounded w-full"
                  rows={4}
                />
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  className="bg-green-500 text-white p-1 rounded"
                  onClick={() => updateProject(project)}
                >
                  Promeni
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded"
                  onClick={() => deleteProject(project.id)}
                >
                  Obrisi
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
