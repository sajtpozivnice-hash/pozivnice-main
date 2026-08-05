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
import { InvitationProjectProvider } from "@/components/invitation/InvitationProjectContext";

type Props = {
  config: UniversalProjectConfig;
  /** Present on live invitation sites — enables guest photo upload */
  projectId?: string | null;
};

function getPageBackgroundUrl(config: UniversalProjectConfig): string {
  if (config.theme.backgroundImage?.trim()) {
    return config.theme.backgroundImage.trim();
  }

  return "";
}

export function TemplateRenderer({ config, projectId = null }: Props) {
  const renderers = getTemplateRenderers(config.template);
  const pageBackgroundUrl = getPageBackgroundUrl(config);

  useEffect(() => {
    import(`@/templates/${config.template}/index.css`);
  }, [config.template]);

  return (
    <InvitationProjectProvider projectId={projectId}>
      <div
        key={config.template}
        data-template={config.template}
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
            ["--font-primary" as string]:
              fontMap[config.theme.fonts?.primary || "playfair"],
            ["--font-secondary" as string]:
              fontMap[config.theme.fonts?.secondary || "inter"],
            ["--color-primary" as string]:
              config.theme.colors?.base?.primary?.value,
            ["--color-secondary" as string]:
              config.theme.colors?.base?.secondary?.value,
            ...(pageBackgroundUrl
              ? {
                  backgroundColor: "#120f0e",
                  backgroundImage: `linear-gradient(180deg, rgba(8,6,5,0.45) 0%, rgba(8,6,5,0.55) 50%, rgba(8,6,5,0.7) 100%), url("${pageBackgroundUrl}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundAttachment: "fixed",
                }
              : {
                  backgroundColor:
                    config.theme.colors?.background?.value || undefined,
                }),
          } as React.CSSProperties
        }
      >
        <ConfigRenderer config={config} renderers={renderers} />
      </div>
    </InvitationProjectProvider>
  );
}
