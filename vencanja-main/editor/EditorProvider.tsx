"use client";

import {
  EventConfig,
  ThemeConfig,
  UniversalProjectConfig,
} from "@/types/config";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { pruneUnusedEditorFields } from "@/helpers/pruneUnusedEditorFields";
import {
  syncMetaWithEvent,
  withSyncedMeta,
} from "@/helpers/syncMetaWithEvent";

type EditorContextType = {
  config: UniversalProjectConfig;
  setConfig: React.Dispatch<React.SetStateAction<any>>;
  updateSection: (id: string, data: any) => void;
  moveSection: (id: string, direction: "up" | "down") => void;
  updateEvent: (changes: Partial<EventConfig>) => void;
  updateTheme: (changes: Partial<ThemeConfig>) => void;
  activePanel: string | null;
  setActivePanel: Dispatch<SetStateAction<string | null>>;
  /** Last content section opened in sidebar — used to restore preview scroll on mobile. */
  previewFocusId: string | null;
  setPreviewFocusId: Dispatch<SetStateAction<string | null>>;
  /** Desktop: section currently in view in the preview canvas (sidebar highlight only). */
  scrollHighlightId: string | null;
  setScrollHighlightId: Dispatch<SetStateAction<string | null>>;
  viewMode: "preview" | "edit";
  setViewMode: Dispatch<SetStateAction<"preview" | "edit">>;
};

const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({
  initialConfig,
  children,
}: {
  initialConfig: UniversalProjectConfig;
  children: ReactNode;
}) {
  const [config, setConfig] = useState(() =>
    withSyncedMeta(pruneUnusedEditorFields(initialConfig)),
  );
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [previewFocusId, setPreviewFocusId] = useState<string | null>(null);
  const [scrollHighlightId, setScrollHighlightId] = useState<string | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"preview" | "edit">("preview");
  const updateSection = (id: string, changes: any) => {
    setConfig((prev: any) => ({
      ...prev,
      sections: prev.sections.map((s: any) =>
        s.id === id ? { ...s, ...changes } : s,
      ),
    }));
  };

  const updateEvent = (changes: Partial<EventConfig>) => {
    setConfig((prev: UniversalProjectConfig) => {
      const previousNames = prev.event.names;
      const event = {
        ...prev.event,
        ...changes,
      };
      const meta =
        changes.names !== undefined
          ? syncMetaWithEvent(prev.meta, event, previousNames)
          : prev.meta;

      return {
        ...prev,
        event,
        meta,
      };
    });
  };

  const updateTheme = (changes: Partial<ThemeConfig>) => {
    setConfig((prev: any) => ({
      ...prev,
      theme: {
        ...prev.theme,
        fonts: {
          ...prev.theme.fonts,
          ...(changes.fonts || {}),
        },
        colors: {
          ...prev.theme.colors,
          ...(changes.colors || {}),
          base: {
            ...prev.theme.colors?.base,
            ...(changes.colors?.base || {}),
          },
        },
        ...(changes.backgroundImage !== undefined
          ? { backgroundImage: changes.backgroundImage }
          : {}),
      },
    }));
  };

  const moveSection = (id: string, direction: "up" | "down") => {
    setConfig((prev: any) => {
      const sorted = [...prev.sections].sort((a, b) => a.order - b.order);

      const index = sorted.findIndex((s) => s.id === id);
      if (index === -1) return prev;

      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= sorted.length) {
        return prev;
      }

      const current = sorted[index];
      const target = sorted[targetIndex];

      const updatedSections = prev.sections.map((s: any) => {
        if (s.id === current.id) {
          return { ...s, order: target.order };
        }
        if (s.id === target.id) {
          return { ...s, order: current.order };
        }
        return s;
      });

      return {
        ...prev,
        sections: updatedSections,
      };
    });
  };

  return (
    <EditorContext.Provider
      value={{
        config,
        setConfig,
        updateSection,
        moveSection,
        updateEvent,
        activePanel,
        setActivePanel,
        previewFocusId,
        setPreviewFocusId,
        scrollHighlightId,
        setScrollHighlightId,
        viewMode,
        setViewMode,
        updateTheme,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used inside EditorProvider");
  }
  return context;
}
