"use client";

import { UniversalProjectConfig } from "@/types/config";
import ConfigRenderer from "./ConfigRederer";
import { getTemplateRenderers } from "@/templates";
import { useEffect } from "react";
import { fontMap } from "@/helpers/fontMap";
import {
  cormorant,
  inter,
  playfair,
  greatVibes,
  robotoCondensed,
  lora,
  dancingScript,
  parisienne,
} from "@/fonts";
type Props = {
  config: UniversalProjectConfig;
};

export function TemplateRenderer({ config }: Props) {
  const renderers = getTemplateRenderers(config.template);

  useEffect(() => {
    import(`@/templates/${config.template}/index.css`);
  }, [config.template]);

  return (
    <div
      className={`
        ${cormorant.variable}
        ${inter.variable}
        ${playfair.variable}
        ${greatVibes.variable}
        ${robotoCondensed.variable}
        ${lora.variable}
        ${dancingScript.variable}
        ${parisienne.variable}
      `}
      style={
        {
          "--font-primary": fontMap[config.theme.fonts?.primary || "playfair"],
          "--font-secondary": fontMap[config.theme.fonts?.secondary || "lora"],
          "--color-primary": config.theme.colors?.base?.primary?.value,
          "--color-secondary": config.theme.colors?.base?.secondary?.value,
        } as React.CSSProperties
      }
    >
      <ConfigRenderer config={config} renderers={renderers} />
    </div>
  );
}
