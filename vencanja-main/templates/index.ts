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
import { birthday18DefaultConfig } from "./birthday18/config";
import { birthday18Renderers } from "./birthday18/renderers";
import { birthday18BrightDefaultConfig } from "./birthday18-bright/config";
import { birthday18BrightRenderers } from "./birthday18-bright/renderers";
import { birthday18EditorialDefaultConfig } from "./birthday18-editorial/config";
import { birthday18EditorialRenderers } from "./birthday18-editorial/renderers";
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
        "Klasičan venčani dizajn. Menjate tekstove, slike i sadržaj; uz pozivnicu dobijate i nalog za organizaciju.",
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
      title: "Minimalna elegancija",
      description:
        "Čist raspored sa jakim tipografskim fokusom. Potpuno prilagodljiv, uz praćenje gostiju u vašem nalogu.",
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
      title: "Filmski kadrovi",
      description:
        "Veliki kadrovi preko celog ekrana. Prilagodite sadržaj, a goste i stolove vodite u nalogu.",
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
      title: "Premijum editorial",
      description:
        "Svečani editorial stil. Boje, fontovi i galerija ostaju promenljivi i kasnije.",
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
      title: "Filmski kadar",
      description:
        "Filmski utisak sa jakim fotografijama. Otvorite primer i javite nam se ako vam se dopada.",
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
      title: "Staklo na pozadini",
      description:
        "Prozirni paneli preko jedne pozadine. Menjajte sadržaj i pošaljite link gostima.",
      style: "modern",
      price: 40,
    },
  },
  "rodjendan-01": {
    renderers: rodjendan01Renderers,
    defaultConfig: {
      ...rodjendan01DefaultConfig,
      eventType: "kidsBirthday",
    },
    eventTypes: ["kidsBirthday"],
    catalog: {
      title: "Dečiji rođendan",
      description:
        "Živahan dizajn za dečiji rođendan. Menjate sadržaj i pratite goste i pripreme u nalogu.",
      style: "playful",
      price: 40,
      featured: true,
    },
  },
  birthday18: {
    renderers: birthday18Renderers,
    defaultConfig: {
      ...birthday18DefaultConfig,
      eventType: "comingOfAge",
    },
    eventTypes: ["comingOfAge"],
    catalog: {
      title: "18 — Noćno izdanje",
      description:
        "Tamna premium pozivnica za punoletstvo: jak tipografski hero, odbrojavanje, plan večeri i potvrda prisustva.",
      style: "premium",
      price: 40,
      featured: true,
    },
  },
  "birthday18-bright": {
    renderers: birthday18BrightRenderers,
    defaultConfig: {
      ...birthday18BrightDefaultConfig,
      eventType: "comingOfAge",
    },
    eventTypes: ["comingOfAge"],
    catalog: {
      title: "18 — Svetlo izdanje",
      description:
        "Svetla, vesela i moderna pozivnica za 18. rođendan: kolor blokovi, gradienti, plan večeri i potvrda prisustva.",
      style: "playful",
      price: 40,
      featured: true,
    },
  },
  "birthday18-editorial": {
    renderers: birthday18EditorialRenderers,
    defaultConfig: {
      ...birthday18EditorialDefaultConfig,
      eventType: "comingOfAge",
    },
    eventTypes: ["comingOfAge"],
    catalog: {
      title: "18 — Glavni junak",
      description:
        "Editorial / Y2K magazin pozivnica za punoletstvo: kolaž raspored, jaka tipografija i modni utisak.",
      style: "editorial",
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
