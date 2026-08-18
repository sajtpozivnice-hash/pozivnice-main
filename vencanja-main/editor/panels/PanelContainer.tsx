"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { FC, ReactNode, useEffect, useRef } from "react";
import { cn } from "./helpers";
import { useEditor } from "../EditorProvider";
import {
  EDITOR_META_PANEL_IDS,
  scrollEditorCanvasToSection,
} from "../scrollToSection";

type PanelContainerProps = {
  id: string;
  title: string;
  icon: any;
  children: ReactNode;
};

function isDesktopEditor() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1024px)").matches
  );
}

function scrollSidebarToPanel(panel: HTMLElement) {
  const sidebar = panel.closest("[data-editor-sidebar]") as HTMLElement | null;
  const scroller =
    (sidebar?.querySelector(".overflow-y-auto") as HTMLElement | null) ??
    sidebar;
  if (!panel || !scroller) return;

  const panelTop =
    panel.getBoundingClientRect().top -
    scroller.getBoundingClientRect().top +
    scroller.scrollTop;

  scroller.scrollTo({
    top: Math.max(0, panelTop - 8),
    behavior: "smooth",
  });
}

const PanelContainer: FC<PanelContainerProps> = ({
  id,
  title,
  icon: Icon,
  children,
}) => {
  const {
    activePanel,
    setActivePanel,
    setPreviewFocusId,
    scrollHighlightId,
    setScrollHighlightId,
  } = useEditor();
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpen = activePanel === id;
  const isScrollHighlight = !isOpen && scrollHighlightId === id;

  // Keep highlighted (closed) panel visible in the sidebar while scrolling preview.
  // Skip while a panel is open so editing fields aren't scrolled away.
  useEffect(() => {
    if (!isScrollHighlight || !panelRef.current || !isDesktopEditor()) return;
    if (activePanel !== null) return;
    panelRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [isScrollHighlight, scrollHighlightId, activePanel]);

  const handleToggle = () => {
    const willOpen = !isOpen;
    setActivePanel(willOpen ? id : null);

    if (!willOpen) return;

    if (!EDITOR_META_PANEL_IDS.has(id)) {
      setPreviewFocusId(id);
      setScrollHighlightId(id);
    }

    requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (panel) scrollSidebarToPanel(panel);

      window.setTimeout(() => {
        if (isDesktopEditor()) {
          scrollEditorCanvasToSection(id);
        }
      }, 40);
    });
  };

  return (
    <div
      ref={panelRef}
      data-panel-id={id}
      className="border-b border-black/5 last:border-0"
    >
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between px-2 py-3.5 text-left transition-all sm:px-3 sm:py-5",
          isOpen
            ? "bg-black/[0.02]"
            : isScrollHighlight
              ? "bg-[var(--color-hot,#e8a0a8)]/15 ring-1 ring-inset ring-[var(--color-hot,#e8a0a8)]/35"
              : "hover:bg-black/[0.01]",
        )}
      >
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
              isOpen
                ? "bg-black text-white"
                : isScrollHighlight
                  ? "bg-[var(--color-hot,#e8a0a8)] text-white"
                  : "bg-black/5 text-black/40",
            )}
          >
            <Icon size={20} className="sm:hidden" />
            <Icon size={24} className="hidden sm:block" />
          </div>

          <span
            className={cn(
              "truncate text-[11px] font-bold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.2em]",
              isScrollHighlight && !isOpen && "text-black/80",
            )}
          >
            {title}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp size={14} className="shrink-0 opacity-40" />
        ) : (
          <ChevronDown size={14} className="shrink-0 opacity-40" />
        )}
      </button>
      {isOpen && (
        <div className="space-y-5 px-2 pb-6 sm:space-y-8 sm:px-6 sm:pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
};

export default PanelContainer;
