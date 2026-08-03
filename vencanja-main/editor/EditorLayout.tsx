"use client";

import { Eye, Settings2 } from "lucide-react";
import Canvas from "./Canvas";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

const EditorLayout = () => {
  const [viewMode, setViewMode] = useState<"preview" | "edit">("preview");

  useEffect(() => {
    const handleSwitch = (e: any) => setViewMode(e.detail);
    window.addEventListener("switch-view", handleSwitch);
    return () => window.removeEventListener("switch-view", handleSwitch);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 min-w-0 h-full">
        <Canvas />
      </main>
      <Sidebar viewMode={viewMode} />
      <header className="absolute top-0 left-0 w-full lg:hidden flex items-center justify-center px-6 py-4 border-b bg-white z-20">
        <div className="flex bg-black/5 p-1 rounded-xl">
          <button
            onClick={() => setViewMode("preview")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold ${
              viewMode === "preview"
                ? "bg-white shadow-sm text-black"
                : "text-black/40"
            }`}
          >
            <Eye size={14} />
            Pregled
          </button>

          <button
            onClick={() => setViewMode("edit")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold ${
              viewMode === "edit"
                ? "bg-white shadow-sm text-black"
                : "text-black/40"
            }`}
          >
            <Settings2 size={14} />
            Uredi
          </button>
        </div>
      </header>
    </div>
  );
};

export default EditorLayout;
