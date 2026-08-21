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
import { vencanjeVanguardDefaultConfig } from "./vencanje-vanguard/config";
import { vencanjeVanguardRenderers } from "./vencanje-vanguard/renderers";
import { vencanjeDecoDefaultConfig } from "./vencanje-deco/config";
import { vencanjeDecoRenderers } from "./vencanje-deco/renderers";
import { vencanjeBohoDefaultConfig } from "./vencanje-boho/config";
import { vencanjeBohoRenderers } from "./vencanje-boho/renderers";
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
import { kidsSafariDefaultConfig } from "./kids-safari/config";
import { kidsSafariRenderers } from "./kids-safari/renderers";
import { kidsSpaceDefaultConfig } from "./kids-space/config";
import { kidsSpaceRenderers } from "./kids-space/renderers";
import { kidsCandyDefaultConfig } from "./kids-candy/config";
import { kidsCandyRenderers } from "./kids-candy/renderers";
import { kidsCartoonDefaultConfig } from "./kids-cartoon/config";
import { kidsCartoonRenderers } from "./kids-cartoon/renderers";
import { kidsHoneyDefaultConfig } from "./kids-honey/config";
import { kidsHoneyRenderers } from "./kids-honey/renderers";
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
        "Quiet luxury tipografija — sage i oat, bez fotografija. Asimetrija zamenjena tihim, centriranim ritmom.",
      style: "editorial",
      price: 3999,
      featured: true,
      imageLink:
        "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787226228/ulyana-tim-AbnCRgL2DNs-unsplash_yhvslu.jpg",
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
      imageLink:
        "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1772187509/wedding/qvui0cbpivfwkyiyfpy6.jpg",
    },
  },
  "vencanje-vanguard": {
    renderers: vencanjeVanguardRenderers,
    defaultConfig: {
      ...vencanjeVanguardDefaultConfig,
      eventType: "wedding",
    },
    eventTypes: ["wedding"],
    catalog: {
      title: "Letterpress vanguard",
      description:
        "Wood-type tipografija na papiru — velika imena, oxblood akcent, bez fotografija.",
      style: "premium",
      price: 3999,
      featured: true,
      imageLink:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    },
  },
  "vencanje-deco": {
    renderers: vencanjeDecoRenderers,
    defaultConfig: {
      ...vencanjeDecoDefaultConfig,
      eventType: "wedding",
    },
    eventTypes: ["wedding"],
    catalog: {
      title: "Art Deco zlato",
      description:
        "Geometrijska elegancija Jazz Age-a — italic serif, zlatni okviri, bez fotografija.",
      style: "premium",
      price: 3999,
      featured: true,
      imageLink:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    },
  },
  "vencanje-boho": {
    renderers: vencanjeBohoRenderers,
    defaultConfig: {
      ...vencanjeBohoDefaultConfig,
      eventType: "wedding",
    },
    eventTypes: ["wedding"],
    catalog: {
      title: "Boho terracotta",
      description:
        "Pesak, terracotta i sage — script tipografija, lukovi i talasi, bez fotografija.",
      style: "premium",
      price: 3999,
      featured: true,
      imageLink:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
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
  "kids-cartoon": {
    renderers: kidsCartoonRenderers,
    defaultConfig: {
      ...kidsCartoonDefaultConfig,
      eventType: "kidsBirthday",
    },
    eventTypes: ["kidsBirthday"],
    catalog: {
      title: "1. rođendan — cartoon",
      description:
        "Comic strip stil — speech bubble, oblačići i šarene epizode za prvi rođendan.",
      style: "playful",
      price: 3999,
      featured: true,
      imageLink:
        "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787324323/wang-binghua-zSvkokr_yw0-unsplash_qz1ao3.jpg",
    },
  },
  "kids-honey": {
    renderers: kidsHoneyRenderers,
    defaultConfig: {
      ...kidsHoneyDefaultConfig,
      eventType: "kidsBirthday",
    },
    eventTypes: ["kidsBirthday"],
    catalog: {
      title: "1. rođendan — medeni picnic",
      description:
        "Medena tegla, honeycomb i crveni balon — topao, dečiji picnic za prvi rođendan.",
      style: "playful",
      price: 3999,
      featured: true,
      imageLink:
        "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023931/pexels-junielly-oliveira-2736244-4960960_migtwt.jpg",
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
    console.warn(`Template "${templateKey}" not found, fallback to "vencanje-terra"`);
    return templates["vencanje-terra"].defaultConfig;
  }

  return template.defaultConfig;
}

export function getTemplatesForEventType(eventType: EventType): TemplateKey[] {
  return (Object.keys(templates) as TemplateKey[]).filter((key) =>
    templates[key].eventTypes.includes(eventType),
  );
}

export type { TemplateKey };
