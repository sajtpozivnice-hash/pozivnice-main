/** Sidebar-only panels — no matching section in the live preview. */
export const EDITOR_META_PANEL_IDS = new Set([
  "general",
  "fontsColors",
  "structure",
]);

export function scrollEditorCanvasToSection(sectionId: string) {
  if (!sectionId || EDITOR_META_PANEL_IDS.has(sectionId)) return false;

  const canvas = document.querySelector<HTMLElement>("[data-editor-canvas]");
  if (!canvas) return false;

  const safeId =
    typeof CSS !== "undefined" && typeof CSS.escape === "function"
      ? CSS.escape(sectionId)
      : sectionId;
  const target = canvas.querySelector<HTMLElement>(`#${safeId}`);
  if (!target) return false;

  const top =
    target.getBoundingClientRect().top -
    canvas.getBoundingClientRect().top +
    canvas.scrollTop;

  canvas.scrollTo({
    top: Math.max(0, top - 12),
    behavior: "smooth",
  });

  target.classList.add("editor-section-flash");
  window.setTimeout(() => {
    target.classList.remove("editor-section-flash");
  }, 1200);

  return true;
}
