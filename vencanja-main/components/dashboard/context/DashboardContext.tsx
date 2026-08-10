"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  startTransition,
  type ReactNode,
} from "react";
import { Client, Project, User } from "../types";

const STORAGE_KEY = "activeProjectId";

type DashboardContextType = {
  user: User;
  client: Client;
  projects: Project[];
  activeProject: Project | null;
  setActiveProject: (projectId: string) => void;
  activeProjectId: string | null;
};

const DashboardContext = createContext<DashboardContextType | null>(null);

type Props = {
  children: ReactNode;
  user: User;
  client: Client;
  projects: Project[];
  /** When false, active project is not written to localStorage (demo). */
  persistActiveProject?: boolean;
};

export function DashboardProvider({
  children,
  user,
  client,
  projects,
  persistActiveProject = true,
}: Props) {
  // SSR + first client paint always use the first project (no localStorage).
  const [activeProjectId, setActiveProjectId] = useState<string | null>(
    () => projects[0]?.id ?? null,
  );
  const [projectsKey, setProjectsKey] = useState(() =>
    projects.map((project) => project.id).join("|"),
  );

  const nextProjectsKey = projects.map((project) => project.id).join("|");
  if (nextProjectsKey !== projectsKey) {
    setProjectsKey(nextProjectsKey);
    setActiveProjectId(projects[0]?.id ?? null);
  }

  useEffect(() => {
    if (!persistActiveProject || projects.length === 0) return;

    const savedId = localStorage.getItem(STORAGE_KEY);
    if (!savedId || !projects.some((project) => project.id === savedId)) {
      return;
    }

    // Defer so SSR HTML stays matched, then apply stored preference.
    startTransition(() => {
      setActiveProjectId(savedId);
    });
  }, [persistActiveProject, projects]);

  function setActiveProject(projectId: string) {
    setActiveProjectId(projectId);
    if (persistActiveProject) {
      localStorage.setItem(STORAGE_KEY, projectId);
    }
  }

  const activeProject = useMemo(() => {
    if (!activeProjectId) return null;
    return projects.find((project) => project.id === activeProjectId) ?? null;
  }, [projects, activeProjectId]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        client,
        projects,
        activeProject,
        activeProjectId,
        setActiveProject,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used inside DashboardProvider");
  }

  return context;
}
