import { JSX } from "react";

export function createSectionRenderers(
  renderers: Record<string, (section: any) => JSX.Element | null>,
) {
  return renderers;
}
