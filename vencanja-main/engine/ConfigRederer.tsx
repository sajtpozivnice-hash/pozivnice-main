"use client";

import { UniversalProjectConfig } from "@/types/config";
import { SectionRendererMap } from "@/types/sections";
import { FC } from "react";

type Props = {
  config: UniversalProjectConfig;
  renderers: SectionRendererMap;
};

const ConfigRenderer: FC<Props> = ({ config, renderers }) => {
  return (
    <>
      {config.sections
        .filter((s) => s.visible)
        .sort((a, b) => a.order - b.order)
        .map((section) => {
          const Renderer = renderers[section.type] as React.ComponentType<{
            section: (typeof config.sections)[number];
            event: UniversalProjectConfig["event"];
            theme: UniversalProjectConfig["theme"];
          }>;

          if (!Renderer) return null;

          // Guarantee stable DOM id for anchors (CTA #rsvp, scroll, etc.)
          const safeSection =
            section.id?.trim()
              ? section
              : { ...section, id: section.type };

          return (
            <Renderer
              key={safeSection.id}
              section={safeSection}
              event={config.event}
              theme={config.theme}
            />
          );
        })}
    </>
  );
};

export default ConfigRenderer;
