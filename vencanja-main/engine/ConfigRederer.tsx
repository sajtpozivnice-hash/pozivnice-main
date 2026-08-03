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
          const Renderer = renderers[section.type] as React.ComponentType<any>;

          if (!Renderer) return null;

          return (
            <Renderer
              key={section.id}
              section={section}
              event={config.event}
              theme={config.theme}
            />
          );
        })}
    </>
  );
};

export default ConfigRenderer;
