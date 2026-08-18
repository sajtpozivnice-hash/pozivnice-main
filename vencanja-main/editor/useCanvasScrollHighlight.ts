"use client";

import { useEffect, useMemo } from "react";
import {
  EDITOR_META_PANEL_IDS,
  isCanvasScrollSyncSuppressed,
} from "./scrollToSection";

function isDesktopEditor() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1024px)").matches
  );
}

/**
 * Desktop only: as the preview canvas scrolls, highlight the matching
 * sidebar panel (without opening it).
 */
export function useCanvasScrollHighlight(
  sectionIds: string[],
  setScrollHighlightId: (id: string | null) => void,
) {
  const sectionKey = useMemo(() => sectionIds.join("|"), [sectionIds]);

  useEffect(() => {
    if (!isDesktopEditor()) return;

    const canvas = document.querySelector<HTMLElement>("[data-editor-canvas]");
    if (!canvas) return;

    const ids = sectionKey
      .split("|")
      .filter((id) => id && !EDITOR_META_PANEL_IDS.has(id));
    if (ids.length === 0) return;

    const ratios = new Map<string, number>();
    let frame = 0;

    const pickActive = () => {
      frame = 0;
      if (isCanvasScrollSyncSuppressed()) return;

      let bestId: string | null = null;
      let bestRatio = 0;
      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }
      if (bestId && bestRatio > 0.02) {
        setScrollHighlightId(bestId);
      }
    };

    const schedulePick = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(pickActive);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!id) continue;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        schedulePick();
      },
      {
        root: canvas,
        // Prefer the section occupying the upper/middle band of the preview
        rootMargin: "-12% 0px -48% 0px",
        threshold: [0, 0.08, 0.16, 0.28, 0.4, 0.55, 0.7, 1],
      },
    );

    for (const id of ids) {
      const safeId =
        typeof CSS !== "undefined" && typeof CSS.escape === "function"
          ? CSS.escape(id)
          : id;
      const el = canvas.querySelector<HTMLElement>(`#${safeId}`);
      if (el) observer.observe(el);
    }

    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => {
      if (!mq.matches) {
        setScrollHighlightId(null);
      }
    };
    mq.addEventListener("change", onMq);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, [sectionKey, setScrollHighlightId]);
}
