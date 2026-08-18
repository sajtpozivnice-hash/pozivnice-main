"use client";

import { Eye, Settings2 } from "lucide-react";
import Canvas from "./Canvas";
import Sidebar from "./Sidebar";
import OrderCta from "./OrderCta";
import { useEffect, useRef } from "react";
import { useEditor } from "./EditorProvider";
import { scrollEditorCanvasToSection } from "./scrollToSection";

const EditorLayout = () => {
  const { viewMode, setViewMode, previewFocusId } = useEditor();
  const prevMode = useRef(viewMode);

  useEffect(() => {
    const handleSwitch = (e: Event) => {
      const detail = (e as CustomEvent<"preview" | "edit">).detail;
      if (detail === "preview" || detail === "edit") {
        setViewMode(detail);
      }
    };
    window.addEventListener("switch-view", handleSwitch);
    return () => window.removeEventListener("switch-view", handleSwitch);
  }, [setViewMode]);

  // Mobile: after returning to Pregled, scroll to the section last opened in sidebar
  useEffect(() => {
    const switchedToPreview =
      prevMode.current === "edit" && viewMode === "preview";
    prevMode.current = viewMode;

    if (!switchedToPreview || !previewFocusId) return;

    // Wait for canvas to become visible (display:none → flex)
    const t1 = window.setTimeout(() => {
      scrollEditorCanvasToSection(previewFocusId);
      // Second pass after layout/images settle
      window.setTimeout(() => {
        scrollEditorCanvasToSection(previewFocusId);
      }, 120);
    }, 50);

    return () => window.clearTimeout(t1);
  }, [viewMode, previewFocusId]);

  return (
    <div className="relative flex h-[100dvh] overflow-hidden bg-white">
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-center border-b border-black/5 bg-white/95 px-3 py-2.5 backdrop-blur-md lg:hidden safe-area-top">
        <div className="flex w-full max-w-sm rounded-xl bg-black/[0.05] p-1">
          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold transition-all ${
              viewMode === "preview"
                ? "bg-white text-black shadow-sm"
                : "text-black/40"
            }`}
          >
            <Eye size={14} />
            Pregled
          </button>

          <button
            type="button"
            onClick={() => setViewMode("edit")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold transition-all ${
              viewMode === "edit"
                ? "bg-white text-black shadow-sm"
                : "text-black/40"
            }`}
          >
            <Settings2 size={14} />
            Uredi
          </button>
        </div>
      </header>

      <main
        className={`
          min-w-0
          ${
            viewMode === "preview"
              ? "flex h-full w-full flex-1 pt-[3.25rem] pb-28 lg:pt-0 lg:pb-24"
              : "hidden lg:flex lg:h-full lg:flex-1 lg:pt-0 lg:pb-24"
          }
        `}
      >
        <Canvas />
      </main>

      <Sidebar />
      <OrderCta />
    </div>
  );
};

export default EditorLayout;
