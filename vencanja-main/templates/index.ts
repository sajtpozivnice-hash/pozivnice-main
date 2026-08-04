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

export const templates = {
  vencanje: {
    renderers: vencanjeRenderers,
    defaultConfig: vencanjeDefaultConfig,
  },
  vencanje3: {
    renderers: vencanje3Renderers,
    defaultConfig: vencanje3DefaultConfig,
  },
  vencanje4: {
    renderers: vencanje4Renderers,
    defaultConfig: vencanje4DefaultConfig,
  },
  "vencanje-premium": {
    renderers: vencanjePremiumRenderers,
    defaultConfig: vencanjePremiumDefaultConfig,
  },
  "vencanje-cinematic": {
    renderers: vencanjeCinematicRenderers,
    defaultConfig: vencanjeCinematicDefaultConfig,
  },
  "vencanje-background": {
    renderers: vencanjeBackgroundRenderers,
    defaultConfig: vencanjeBackgroundDefaultConfig,
  },
};

export type TemplateKey = keyof typeof templates;

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
    return templates["vencanje"].defaultConfig;
  }

  return template.defaultConfig;
}
