import { vencanjeDefaultConfig } from "./vencanje/config";
import { vencanjeRenderers } from "./vencanje/renderers";
import { vencanje2DefaultConfig } from "./vencanje2/defaultConfig";

import { vencanje2Renderers } from "./vencanje2/renderers";

export const templates = {
  vencanje: {
    renderers: vencanjeRenderers,
    defaultConfig: vencanjeDefaultConfig,
  },
  vencanje2: {
    renderers: vencanje2Renderers,
    defaultConfig: vencanje2DefaultConfig,
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
