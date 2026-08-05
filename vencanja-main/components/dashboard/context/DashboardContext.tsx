"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
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
};

const resolveActiveProjectId = (projects: Project[]): string | null => {
  if (projects.length === 0) return null;

  if (typeof window !== "undefined") {
    const savedId = localStorage.getItem(STORAGE_KEY);
    if (savedId && projects.some((project) => project.id === savedId)) {
      return savedId;
    }
  }

  return projects[0]?.id ?? null;
};

export function DashboardProvider({ children, user, client, projects }: Props) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(() =>
    resolveActiveProjectId(projects),
  );
  const [projectsKey, setProjectsKey] = useState(() =>
    projects.map((project) => project.id).join("|"),
  );

  const nextProjectsKey = projects.map((project) => project.id).join("|");
  if (nextProjectsKey !== projectsKey) {
    setProjectsKey(nextProjectsKey);
    const nextId = resolveActiveProjectId(projects);
    setActiveProjectId(nextId);
    if (nextId && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, nextId);
    }
  }

  function setActiveProject(projectId: string) {
    setActiveProjectId(projectId);
    localStorage.setItem(STORAGE_KEY, projectId);
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
