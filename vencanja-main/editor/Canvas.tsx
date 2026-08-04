"use client";

import { FC } from "react";
import { useEditor } from "./EditorProvider";
import { TemplateRenderer } from "@/engine/TemplateRenderer";

const Canvas: FC = () => {
  const { config } = useEditor();

  return (
    <div className="h-full w-full min-w-0 overflow-auto bg-[#120f0e]">
      <TemplateRenderer config={config} />
    </div>
  );
};

export default Canvas;
