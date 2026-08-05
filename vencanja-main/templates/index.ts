import { vencanjeDefaultConfig } from "./vencanje/config";
import { vencanjeRenderers } from "./vencanje/renderers";
import { vencanje3DefaultConfig } from "./vencanje3/config";
import { vencanje3Renderers } from "./vencanje3/renderers";
import { vencanje4DefaultConfig } from "./vencanje4/config";
import { vencanje4Renderers } from "./vencanje4/renderers";
import { vencanjePremiumDefaultConfig } from "./vencanje-premium/config";
import { vencanjePremiumRenderers } from "./vencanje-premium/renderers";
import { vencanjeCinematicDefaultConfig } from "./vencanje-cinematic/config";
import { vencanjeCinematicRenderers } from "./vencanje-cinematic/renderers";
import { vencanjeBackgroundDefaultConfig } from "./vencanje-background/config";
import { vencanjeBackgroundRenderers } from "./vencanje-background/renderers";
import { rodjendan01DefaultConfig } from "./rodjendan-01/config";
import { rodjendan01Renderers } from "./rodjendan-01/renderers";
import { EventType, TemplateKey } from "@/types/config";

export const templates = {
  vencanje: {
    renderers: vencanjeRenderers,
    defaultConfig: { ...vencanjeDefaultConfig, eventType: "wedding" as const },
    eventTypes: ["wedding"] as EventType[],
  },
  vencanje3: {
    renderers: vencanje3Renderers,
    defaultConfig: { ...vencanje3DefaultConfig, eventType: "wedding" as const },
    eventTypes: ["wedding"] as EventType[],
  },
  vencanje4: {
    renderers: vencanje4Renderers,
    defaultConfig: { ...vencanje4DefaultConfig, eventType: "wedding" as const },
    eventTypes: ["wedding"] as EventType[],
  },
  "vencanje-premium": {
    renderers: vencanjePremiumRenderers,
    defaultConfig: {
      ...vencanjePremiumDefaultConfig,
      eventType: "wedding" as const,
    },
    eventTypes: ["wedding"] as EventType[],
  },
  "vencanje-cinematic": {
    renderers: vencanjeCinematicRenderers,
    defaultConfig: {
      ...vencanjeCinematicDefaultConfig,
      eventType: "wedding" as const,
    },
    eventTypes: ["wedding"] as EventType[],
  },
  "vencanje-background": {
    renderers: vencanjeBackgroundRenderers,
    defaultConfig: {
      ...vencanjeBackgroundDefaultConfig,
      eventType: "wedding" as const,
    },
    eventTypes: ["wedding"] as EventType[],
  },
  "rodjendan-01": {
    renderers: rodjendan01Renderers,
    defaultConfig: rodjendan01DefaultConfig,
    eventTypes: ["birthday"] as EventType[],
  },
};

export function getTemplateRenderers(templateKey: string) {
  const template = templates[templateKey as TemplateKey];

  if (!template) {
    throw new Error(`Unknown template: ${templateKey}`);
  }

  return template.renderers;
}

export function getDefaultProject(templateKey: string) {
  const template = templates[templateKey as TemplateKey];

  if (!(templateKey in templates)) {
    return null;
  }

  if (!template) {
    console.warn(`Template "${templateKey}" not found, fallback to "vencanje"`);
    return templates.vencanje.defaultConfig;
  }

  return template.defaultConfig;
}

export function getTemplatesForEventType(eventType: EventType): TemplateKey[] {
  return (Object.keys(templates) as TemplateKey[]).filter((key) =>
    templates[key].eventTypes.includes(eventType),
  );
}

export type { TemplateKey };
