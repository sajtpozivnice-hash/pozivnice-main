"use client";

import { FC } from "react";
import { useEditor } from "./EditorProvider";
import { TemplateRenderer } from "@/engine/TemplateRenderer";

const Canvas: FC = () => {
  const { config } = useEditor();

  return (
    // transform creates a containing block so the opening overlay
    // (position: fixed) stays inside the canvas and does not cover the sidebar.
    <div className="relative h-full w-full min-w-0 overflow-auto bg-[#120f0e] [transform:translateZ(0)]">
      <TemplateRenderer config={config} enableOpening />
    </div>
  );
};

export default Canvas;
