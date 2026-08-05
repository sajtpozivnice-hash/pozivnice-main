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
import { EventType, TemplateKey, UniversalProjectConfig } from "@/types/config";
import { TemplateCatalogMeta } from "@/types/catalog";
import { SectionRendererMap } from "@/types/sections";

type TemplatePack = {
  renderers: SectionRendererMap;
  defaultConfig: UniversalProjectConfig;
  eventTypes: EventType[];
  catalog: TemplateCatalogMeta;
};

export const templates: Record<TemplateKey, TemplatePack> = {
  vencanje: {
    renderers: vencanjeRenderers,
    defaultConfig: { ...vencanjeDefaultConfig, eventType: "wedding" },
    eventTypes: ["wedding"],
    catalog: {
      title: "Večna ljubav",
      description:
        "Klasičan i sofisticiran dizajn za bezvremensku eleganciju.",
      style: "classic",
      price: 40,
      featured: true,
    },
  },
  vencanje3: {
    renderers: vencanje3Renderers,
    defaultConfig: { ...vencanje3DefaultConfig, eventType: "wedding" },
    eventTypes: ["wedding"],
    catalog: {
      title: "Minimal elegance",
      description: "Čist, moderan raspored sa naglaskom na tipografiju.",
      style: "modern",
      price: 40,
      featured: true,
    },
  },
  vencanje4: {
    renderers: vencanje4Renderers,
    defaultConfig: { ...vencanje4DefaultConfig, eventType: "wedding" },
    eventTypes: ["wedding"],
    catalog: {
      title: "Cinematic scenes",
      description: "Full-screen scene layout za dramatičan utisak.",
      style: "cinematic",
      price: 40,
      featured: true,
    },
  },
  "vencanje-premium": {
    renderers: vencanjePremiumRenderers,
    defaultConfig: {
      ...vencanjePremiumDefaultConfig,
      eventType: "wedding",
    },
    eventTypes: ["wedding"],
    catalog: {
      title: "Premium editorial",
      description: "Luksuzni editorial stil za svečana venčanja.",
      style: "premium",
      price: 40,
      featured: true,
    },
  },
  "vencanje-cinematic": {
    renderers: vencanjeCinematicRenderers,
    defaultConfig: {
      ...vencanjeCinematicDefaultConfig,
      eventType: "wedding",
    },
    eventTypes: ["wedding"],
    catalog: {
      title: "Film stills",
      description: "Filmska estetika sa jakim vizuelnim kadrovima.",
      style: "cinematic",
      price: 40,
    },
  },
  "vencanje-background": {
    renderers: vencanjeBackgroundRenderers,
    defaultConfig: {
      ...vencanjeBackgroundDefaultConfig,
      eventType: "wedding",
    },
    eventTypes: ["wedding"],
    catalog: {
      title: "Glass on background",
      description: "Plutajući glass paneli preko jedne pozadine.",
      style: "modern",
      price: 40,
    },
  },
  "rodjendan-01": {
    renderers: rodjendan01Renderers,
    defaultConfig: rodjendan01DefaultConfig,
    eventTypes: ["birthday"],
    catalog: {
      title: "Rođendanska žurka",
      description: "Živahan, moderni template za dečiji ili odrasli rođendan.",
      style: "playful",
      price: 40,
      featured: true,
    },
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
