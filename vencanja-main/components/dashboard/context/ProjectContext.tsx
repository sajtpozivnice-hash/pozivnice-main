"use client";

import { UniversalProjectConfig } from "@/types/config";
import { Project } from "../types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDashboard } from "./DashboardContext";
import { SectionConfig } from "@/types/sections";
import { getProject, updateConfig } from "../services/project.service";

type ProjectContextType = {
  project: Project | null;
  config: UniversalProjectConfig | null;

  loading: boolean;
  saving: boolean;

  setConfig: Dispatch<SetStateAction<UniversalProjectConfig | null>>;

  saveConfig: (config: UniversalProjectConfig) => Promise<void>;
  reload: () => Promise<void>;

  getSection: <T extends SectionConfig>(type: T["type"]) => T | undefined;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { activeProject } = useDashboard();

  const [project, setProject] = useState<Project | null>(null);
  const [config, setConfig] = useState<UniversalProjectConfig | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!activeProject) {
      setProject(null);
      setConfig(null);
      return;
    }

    applyProject(activeProject);
  }, [activeProject]);

  const applyProject = (updatedProject: Project) => {
    setProject(updatedProject);
    setConfig(updatedProject.config_json);
  };

  const saveConfig = async (newConfig: UniversalProjectConfig) => {
    if (!project) return;

    try {
      setSaving(true);

      const updatedProject = await updateConfig(project.id, newConfig);

      applyProject(updatedProject);
    } finally {
      setSaving(false);
    }
  };

  const reload = async () => {
    if (!project) return;

    try {
      setLoading(true);

      const freshProject = await getProject(project.id);

      applyProject(freshProject);
    } finally {
      setLoading(false);
    }
  };

  function getSection<T extends SectionConfig>(type: T["type"]): T | undefined {
    if (!config) return undefined;

    return config.sections.find(
      (section): section is T => section.type === type,
    );
  }

  return (
    <ProjectContext.Provider
      value={{
        project,
        config,

        loading,
        saving,

        setConfig,

        saveConfig,
        reload,

        getSection,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProject must be used inside ProjectProvider");
  }

  return context;
}
