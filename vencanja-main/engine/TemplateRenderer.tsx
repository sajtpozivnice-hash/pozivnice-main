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

function getPageBackgroundUrl(config: UniversalProjectConfig): string {
  const hero = config.sections.find((section) => section.type === "hero");

  if (hero && "backgroundImage" in hero.data) {
    const value = hero.data.backgroundImage;
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  if (hero && "image" in hero.data) {
    const value = hero.data.image;
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  if (config.theme.backgroundImage?.trim()) {
    return config.theme.backgroundImage.trim();
  }

  return "";
}

export function TemplateRenderer({ config }: Props) {
  const renderers = getTemplateRenderers(config.template);
  const pageBackgroundUrl = getPageBackgroundUrl(config);

  useEffect(() => {
    import(`@/templates/${config.template}/index.css`);
  }, [config.template]);

  return (
    <div
      key={config.template}
      className={`
        relative min-h-full
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
          "--font-secondary": fontMap[config.theme.fonts?.secondary || "inter"],
          "--color-primary": config.theme.colors?.base?.primary?.value,
          "--color-secondary": config.theme.colors?.base?.secondary?.value,
          ...(pageBackgroundUrl
            ? {
                backgroundColor: "#120f0e",
                backgroundImage: `linear-gradient(180deg, rgba(8,6,5,0.45) 0%, rgba(8,6,5,0.55) 50%, rgba(8,6,5,0.7) 100%), url("${pageBackgroundUrl}")`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
              }
            : {}),
        } as React.CSSProperties
      }
    >
      <ConfigRenderer config={config} renderers={renderers} />
    </div>
  );
}
