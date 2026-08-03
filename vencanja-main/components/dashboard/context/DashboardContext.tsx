"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { Client, Project, User } from "../types";

const STORAGE_KEY = "activeProjectId";

type DashboardContextType = {
  user: User;
  client: Client;
  projects: Project[];

  activeProject: any | null;
  setActiveProject: (project: any) => void;
  activeProjectId: string | null;
};

const DashboardContext = createContext<DashboardContextType | null>(null);

type Props = {
  children: ReactNode;

  user: User;
  client: Client;
  projects: Project[];

  activeProject: Project | null;
  setActiveProject: (project: Project) => void;
};

export function DashboardProvider({ children, user, client, projects }: Props) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  useEffect(() => {
    if (projects.length === 0) {
      setActiveProjectId(null);
      return;
    }

    if (projects.length === 1) {
      setActiveProjectId(projects[0].id);
      localStorage.setItem(STORAGE_KEY, projects[0].id);
      return;
    }

    const savedId = localStorage.getItem(STORAGE_KEY);

    if (savedId && projects.some((p) => p.id === savedId)) {
      setActiveProjectId(savedId);
      return;
    }

    setActiveProjectId(projects[0].id);
    localStorage.setItem(STORAGE_KEY, projects[0].id);
  }, [projects]);

  function setActiveProject(projectId: string) {
    setActiveProjectId(projectId);
    localStorage.setItem(STORAGE_KEY, projectId);
  }

  const activeProject = useMemo(() => {
    if (!activeProjectId) return null;

    return projects.find((project) => project.id === activeProjectId) ?? null;
  }, [projects, activeProjectId]);
  console.log(activeProject, "activeProjekt");
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
