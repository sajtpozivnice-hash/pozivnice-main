"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { FC, ReactNode } from "react";
import { cn } from "./helpers";
import { useEditor } from "../EditorProvider";

type PanelContainerProps = {
  id: string;
  title: string;
  icon: any;
  children: ReactNode;
};

const PanelContainer: FC<PanelContainerProps> = ({
  id,
  title,
  icon: Icon,
  children,
}) => {
  const { activePanel, setActivePanel } = useEditor();
  return (
    <div className="border-b border-black/5 last:border-0 ">
      <button
        onClick={() => {
          setActivePanel(activePanel === id ? null : id);
          if (activePanel !== id) {
            const element = document.getElementById(id);
            element?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }}
        className={cn(
          "cursor-pointer w-full flex items-center justify-between py-5 text-left transition-all px-3",
          activePanel === id ? "bg-black/[0.02]" : "hover:bg-black/[0.01]",
        )}
      >
        {/* <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30 mb-4">
          Manage Page Flow
        </p> */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              activePanel === id
                ? "bg-black text-white"
                : "bg-black/5 text-black/40",
            )}
          >
            <Icon size={24} />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.2em]">
            {title}
          </span>
        </div>
        {activePanel === id ? (
          <ChevronUp size={14} className="opacity-40" />
        ) : (
          <ChevronDown size={14} className="opacity-40" />
        )}
      </button>
      {activePanel === id && (
        <div className="px-6 pb-8 space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
};

export default PanelContainer;
