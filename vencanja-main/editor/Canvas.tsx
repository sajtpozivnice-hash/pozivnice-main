"use client";

import { FC, useMemo } from "react";
import { useEditor } from "./EditorProvider";
import { TemplateRenderer } from "@/engine/TemplateRenderer";
import { useCanvasScrollHighlight } from "./useCanvasScrollHighlight";

const Canvas: FC = () => {
  const { config, setScrollHighlightId } = useEditor();

  const sectionIds = useMemo(
    () =>
      config.sections
        .filter((section) => section.visible)
        .map((section) => section.id),
    [config.sections],
  );

  useCanvasScrollHighlight(sectionIds, setScrollHighlightId);

  return (
    // transform creates a containing block so the opening overlay
    // (position: fixed) stays inside the canvas and does not cover the sidebar.
    <div
      data-editor-canvas
      className="relative h-full w-full min-w-0 overflow-auto bg-[#120f0e] [transform:translateZ(0)]"
    >
      <TemplateRenderer config={config} enableOpening />
    </div>
  );
};

export default Canvas;
