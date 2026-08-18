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
import { vencanjeSageDefaultConfig } from "./vencanje-sage/config";
import { vencanjeSageRenderers } from "./vencanje-sage/renderers";
import { vencanjeInkDefaultConfig } from "./vencanje-ink/config";
import { vencanjeInkRenderers } from "./vencanje-ink/renderers";
import { vencanjeDuskDefaultConfig } from "./vencanje-dusk/config";
import { vencanjeDuskRenderers } from "./vencanje-dusk/renderers";
import { vencanjeTerraDefaultConfig } from "./vencanje-terra/config";
import { vencanjeTerraRenderers } from "./vencanje-terra/renderers";
import { vencanjeLinenDefaultConfig } from "./vencanje-linen/config";
import { vencanjeLinenRenderers } from "./vencanje-linen/renderers";
import { vencanjeNavyDefaultConfig } from "./vencanje-navy/config";
import { vencanjeNavyRenderers } from "./vencanje-navy/renderers";
import { vencanjeOpalDefaultConfig } from "./vencanje-opal/config";
import { vencanjeOpalRenderers } from "./vencanje-opal/renderers";
import { vencanjeAtelierDefaultConfig } from "./vencanje-atelier/config";
import { vencanjeAtelierRenderers } from "./vencanje-atelier/renderers";
import { rodjendan01DefaultConfig } from "./rodjendan-01/config";
import { rodjendan01Renderers } from "./rodjendan-01/renderers";
import { birthday18DefaultConfig } from "./birthday18/config";
import { birthday18Renderers } from "./birthday18/renderers";
import { birthday18BrightDefaultConfig } from "./birthday18-bright/config";
import { birthday18BrightRenderers } from "./birthday18-bright/renderers";
import { birthday18EditorialDefaultConfig } from "./birthday18-editorial/config";
import { birthday18EditorialRenderers } from "./birthday18-editorial/renderers";
import { birthday18NightDefaultConfig } from "./birthday18-night/config";
import { birthday18NightRenderers } from "./birthday18-night/renderers";
import { birthday18GoldDefaultConfig } from "./birthday18-gold/config";
import { birthday18GoldRenderers } from "./birthday18-gold/renderers";
import { birthday18InkDefaultConfig } from "./birthday18-ink/config";
import { birthday18InkRenderers } from "./birthday18-ink/renderers";
import { birthday18CoastDefaultConfig } from "./birthday18-coast/config";
import { birthday18CoastRenderers } from "./birthday18-coast/renderers";
import { birthday18AtelierDefaultConfig } from "./birthday18-atelier/config";
import { birthday18AtelierRenderers } from "./birthday18-atelier/renderers";
import { kidsPastelDefaultConfig } from "./kids-pastel/config";
import { kidsPastelRenderers } from "./kids-pastel/renderers";
import { kidsSafariDefaultConfig } from "./kids-safari/config";
import { kidsSafariRenderers } from "./kids-safari/renderers";
import { kidsSpaceDefaultConfig } from "./kids-space/config";
import { kidsSpaceRenderers } from "./kids-space/renderers";
import { kidsCandyDefaultConfig } from "./kids-candy/config";
import { kidsCandyRenderers } from "./kids-candy/renderers";
import { krstenjeClassicDefaultConfig } from "./krstenje-classic/config";
import { krstenjeClassicRenderers } from "./krstenje-classic/renderers";
import { krstenjeSoftDefaultConfig } from "./krstenje-soft/config";
import { krstenjeSoftRenderers } from "./krstenje-soft/renderers";
import { krstenjeGardenDefaultConfig } from "./krstenje-garden/config";
import { krstenjeGardenRenderers } from "./krstenje-garden/renderers";
import { krstenjeModernDefaultConfig } from "./krstenje-modern/config";
import { krstenjeModernRenderers } from "./krstenje-modern/renderers";
import { krstenjeCandleDefaultConfig } from "./krstenje-candle/config";
import { krstenjeCandleRenderers } from "./krstenje-candle/renderers";
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
      price: 3999,
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
      price: 3999,
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
      price: 3999,
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
      price: 3999,
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
      price: 3999,
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
      price: 3999,
    },
  },
  "vencanje-sage": {
    renderers: vencanjeSageRenderers,
    defaultConfig: {
      ...vencanjeSageDefaultConfig,
      eventType: "wedding",
    },
    eventTypes: ["wedding"],
    catalog: {
      title: "Tiha kadulja",
      description:
        "Quiet luxury 2026 — sage, oat i terracotta. Asimetričan raspored i puno belog prostora.",
      style: "editorial",
      price: 3999,
      featured: true,
    },
  },
  "vencanje-ink": {
    renderers: vencanjeInkRenderers,
    defaultConfig: {
      ...vencanjeInkDefaultConfig,
      eventType: "wedding",
    },
    eventTypes: ["wedding"],
    catalog: {
      title: "Editorial mastilo",
      description:
        "Tipografski fokus kao u magazinu. Krema i crno, veliki naslovi, tanak hairline ritam.",
      style: "editorial",
      price: 3999,
      featured: true,
    },
  },
  "vencanje-dusk": {
    renderers: vencanjeDuskRenderers,
    defaultConfig: {
      ...vencanjeDuskDefaultConfig,
      eventType: "wedding",
    },
    eventTypes: ["wedding"],
    catalog: {
      title: "Večernji bakar",
      description:
        "Tamni cinematic pejzaž sa bakarnim akcentom. Filmski kadar za večernja venčanja.",
      style: "cinematic",
      price: 3999,
      featured: true,
    },
  },
  "vencanje-terra": {
    renderers: vencanjeTerraRenderers,
    defaultConfig: {
      ...vencanjeTerraDefaultConfig,
      eventType: "wedding",
    },
    eventTypes: ["wedding"],
    catalog: {
      title: "Mediteranska terakota",
      description:
        "Topla zemljana paleta — terakota, pesak i maslina. Lučni kadar i organski raspored.",
      style: "modern",
      price: 3999,
      featured: true,
    },
  },
  "vencanje-linen": {
    renderers: vencanjeLinenRenderers,
    defaultConfig: {
      ...vencanjeLinenDefaultConfig,
      eventType: "wedding",
    },
    eventTypes: ["wedding"],
    catalog: {
      title: "Šampanjac lan",
      description:
        "Quiet luxury stationery — krem lan, šampanjac i monogram. Izgleda kao skup papir, digitalno.",
      style: "premium",
      price: 3999,
      featured: true,
    },
  },
  "vencanje-navy": {
    renderers: vencanjeNavyRenderers,
    defaultConfig: {
      ...vencanjeNavyDefaultConfig,
      eventType: "wedding",
    },
    eventTypes: ["wedding"],
    catalog: {
      title: "Formalni navy",
      description:
        "Navy i mesing za black-tie večeri. Monogram, ceremonijalni ton, jak kontrast.",
      style: "premium",
      price: 3999,
      featured: true,
    },
  },
  "vencanje-opal": {
    renderers: vencanjeOpalRenderers,
    defaultConfig: {
      ...vencanjeOpalDefaultConfig,
      eventType: "wedding",
    },
    eventTypes: ["wedding"],
    catalog: {
      title: "Biserasti vellum",
      description:
        "Pearl i blush slojevi kao vellum. Mekani frosted paneli — premium mixed-materials osećaj.",
      style: "editorial",
      price: 3999,
      featured: true,
    },
  },
  "vencanje-atelier": {
    renderers: vencanjeAtelierRenderers,
    defaultConfig: {
      ...vencanjeAtelierDefaultConfig,
      eventType: "wedding",
    },
    eventTypes: ["wedding"],
    catalog: {
      title: "Atelje tišina",
      description:
        "The Row quiet luxury — kamen, topli crni, ogromni belina. Najskuplji utisak kroz redukciju.",
      style: "editorial",
      price: 3999,
      featured: true,
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
      title: "1. rođendan — klasik",
      description:
        "Živahan dizajn za dečiji rođendan. Menjate sadržaj i pratite goste i pripreme u nalogu.",
      style: "playful",
      price: 3999,
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
      price: 3999,
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
      price: 3999,
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
      price: 3999,
      featured: true,
    },
  },
  "birthday18-night": {
    renderers: birthday18NightRenderers,
    defaultConfig: {
      ...birthday18NightDefaultConfig,
      eventType: "comingOfAge",
    },
    eventTypes: ["comingOfAge"],
    catalog: {
      title: "18 — Noć počinje",
      description:
        "Tamna cinematic nightlife pozivnica za 18. rođendan: jak tipografski hero, editorial detalji i premium potvrda prisustva.",
      style: "premium",
      price: 3999,
      featured: true,
    },
  },
  "birthday18-gold": {
    renderers: birthday18GoldRenderers,
    defaultConfig: {
      ...birthday18GoldDefaultConfig,
      eventType: "comingOfAge",
    },
    eventTypes: ["comingOfAge"],
    catalog: {
      title: "18 — Zlatno izdanje",
      description:
        "Elegantna champagne/gold pozivnica za punoletstvo: topli tonovi, svečani utisak i jasna potvrda prisustva.",
      style: "premium",
      price: 3999,
      featured: true,
    },
  },
  "birthday18-ink": {
    renderers: birthday18InkRenderers,
    defaultConfig: {
      ...birthday18InkDefaultConfig,
      eventType: "comingOfAge",
    },
    eventTypes: ["comingOfAge"],
    catalog: {
      title: "18 — Novinsko izdanje",
      description:
        "Monohromatska broadsheet pozivnica za punoletstvo: masthead ime, novinske kolone i horizontalne linije.",
      style: "editorial",
      price: 3999,
      featured: true,
    },
  },
  "birthday18-coast": {
    renderers: birthday18CoastRenderers,
    defaultConfig: {
      ...birthday18CoastDefaultConfig,
      eventType: "comingOfAge",
    },
    eventTypes: ["comingOfAge"],
    catalog: {
      title: "18 — Obalsko izdanje",
      description:
        "Vazdušasta dnevna pozivnica za punoletstvo: horizontalni pojasevi, ime kao vodeni žig i raspored kao plima.",
      style: "modern",
      price: 3999,
      featured: true,
    },
  },
  "birthday18-atelier": {
    renderers: birthday18AtelierRenderers,
    defaultConfig: {
      ...birthday18AtelierDefaultConfig,
      eventType: "comingOfAge",
    },
    eventTypes: ["comingOfAge"],
    catalog: {
      title: "18 — Atelje izdanje",
      description:
        "Minimalna fashion lookbook pozivnica za punoletstvo: visoka portretna traka i editorial tipografija.",
      style: "premium",
      price: 3999,
      featured: true,
    },
  },
  "kids-pastel": {
    renderers: kidsPastelRenderers,
    defaultConfig: {
      ...kidsPastelDefaultConfig,
      eventType: "kidsBirthday",
    },
    eventTypes: ["kidsBirthday"],
    catalog: {
      title: "1. rođendan — pastel",
      description:
        "Nežni pastelni tonovi za prvi dečiji rođendan — mek, vedar i topao utisak.",
      style: "playful",
      price: 3999,
      featured: true,
    },
  },
  "kids-safari": {
    renderers: kidsSafariRenderers,
    defaultConfig: {
      ...kidsSafariDefaultConfig,
      eventType: "kidsBirthday",
    },
    eventTypes: ["kidsBirthday"],
    catalog: {
      title: "1. rođendan — safari",
      description:
        "Topli safari tonovi i avanturistički osećaj za prvi dečiji rođendan.",
      style: "playful",
      price: 3999,
      featured: true,
    },
  },
  "kids-space": {
    renderers: kidsSpaceRenderers,
    defaultConfig: {
      ...kidsSpaceDefaultConfig,
      eventType: "kidsBirthday",
    },
    eventTypes: ["kidsBirthday"],
    catalog: {
      title: "1. rođendan — svemir",
      description:
        "Tamna svemirska pozivnica za prvi rođendan malih istraživača.",
      style: "playful",
      price: 3999,
      featured: true,
    },
  },
  "kids-candy": {
    renderers: kidsCandyRenderers,
    defaultConfig: {
      ...kidsCandyDefaultConfig,
      eventType: "kidsBirthday",
    },
    eventTypes: ["kidsBirthday"],
    catalog: {
      title: "1. rođendan — candy",
      description:
        "Šarena candy estetika za veseli prvi dečiji rođendan pun boja.",
      style: "playful",
      price: 3999,
      featured: true,
    },
  },
  "krstenje-classic": {
    renderers: krstenjeClassicRenderers,
    defaultConfig: {
      ...krstenjeClassicDefaultConfig,
      eventType: "baptism",
    },
    eventTypes: ["baptism", "kidsBirthday"],
    catalog: {
      title: "Klasično krštenje",
      description:
        "Svečana klasična pozivnica za krštenje — lako se prilagodi i za dečiji rođendan.",
      style: "classic",
      price: 3999,
      featured: true,
    },
  },
  "krstenje-soft": {
    renderers: krstenjeSoftRenderers,
    defaultConfig: {
      ...krstenjeSoftDefaultConfig,
      eventType: "baptism",
    },
    eventTypes: ["baptism", "kidsBirthday"],
    catalog: {
      title: "Nežno krštenje",
      description:
        "Meki blush tonovi za krštenje ili nežni dečiji rođendan.",
      style: "classic",
      price: 3999,
      featured: true,
    },
  },
  "krstenje-garden": {
    renderers: krstenjeGardenRenderers,
    defaultConfig: {
      ...krstenjeGardenDefaultConfig,
      eventType: "baptism",
    },
    eventTypes: ["baptism", "kidsBirthday"],
    catalog: {
      title: "Krštenje u bašti",
      description:
        "Zeleni tonovi za krštenje ili porodični rođendan na otvorenom.",
      style: "modern",
      price: 3999,
      featured: true,
    },
  },
  "krstenje-modern": {
    renderers: krstenjeModernRenderers,
    defaultConfig: {
      ...krstenjeModernDefaultConfig,
      eventType: "baptism",
    },
    eventTypes: ["baptism", "kidsBirthday"],
    catalog: {
      title: "Moderno krštenje",
      description:
        "Čista moderna pozivnica za krštenje — jednako dobra i za dečiji rođendan.",
      style: "modern",
      price: 3999,
      featured: true,
    },
  },
  "krstenje-candle": {
    renderers: krstenjeCandleRenderers,
    defaultConfig: {
      ...krstenjeCandleDefaultConfig,
      eventType: "baptism",
    },
    eventTypes: ["baptism", "kidsBirthday"],
    catalog: {
      title: "Svečano krštenje",
      description:
        "Topla candlelight atmosfera za krštenje ili svečani dečiji rođendan.",
      style: "premium",
      price: 3999,
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
