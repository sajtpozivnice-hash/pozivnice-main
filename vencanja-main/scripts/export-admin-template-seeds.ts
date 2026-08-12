/**
 * Exports template default configs as JSON for admin-panel.
 * Imports config modules only (avoids renderer/React/Supabase side effects).
 * Run: npx tsx scripts/export-admin-template-seeds.ts  (from vencanja-main)
 */
import fs from "fs";
import path from "path";
import { vencanjeDefaultConfig } from "../templates/vencanje/config";
import { vencanje3DefaultConfig } from "../templates/vencanje3/config";
import { vencanje4DefaultConfig } from "../templates/vencanje4/config";
import { vencanjePremiumDefaultConfig } from "../templates/vencanje-premium/config";
import { vencanjeCinematicDefaultConfig } from "../templates/vencanje-cinematic/config";
import { vencanjeBackgroundDefaultConfig } from "../templates/vencanje-background/config";
import { rodjendan01DefaultConfig } from "../templates/rodjendan-01/config";
import { birthday18DefaultConfig } from "../templates/birthday18/config";
import { birthday18BrightDefaultConfig } from "../templates/birthday18-bright/config";
import { birthday18EditorialDefaultConfig } from "../templates/birthday18-editorial/config";
import { birthday18NightDefaultConfig } from "../templates/birthday18-night/config";
import { birthday18GoldDefaultConfig } from "../templates/birthday18-gold/config";
import { birthday18InkDefaultConfig } from "../templates/birthday18-ink/config";
import { birthday18CoastDefaultConfig } from "../templates/birthday18-coast/config";
import { birthday18AtelierDefaultConfig } from "../templates/birthday18-atelier/config";
import { kidsPastelDefaultConfig } from "../templates/kids-pastel/config";
import { kidsSafariDefaultConfig } from "../templates/kids-safari/config";
import { kidsSpaceDefaultConfig } from "../templates/kids-space/config";
import { kidsCandyDefaultConfig } from "../templates/kids-candy/config";
import { krstenjeClassicDefaultConfig } from "../templates/krstenje-classic/config";
import { krstenjeSoftDefaultConfig } from "../templates/krstenje-soft/config";
import { krstenjeGardenDefaultConfig } from "../templates/krstenje-garden/config";
import { krstenjeModernDefaultConfig } from "../templates/krstenje-modern/config";
import { krstenjeCandleDefaultConfig } from "../templates/krstenje-candle/config";

const packs = [
  {
    key: "vencanje",
    title: "Večna ljubav",
    description:
      "Klasičan venčani dizajn. Menjate tekstove, slike i sadržaj; uz pozivnicu dobijate i nalog za organizaciju.",
    eventTypes: ["wedding"],
    style: "classic",
    config: { ...vencanjeDefaultConfig, eventType: "wedding" as const },
  },
  {
    key: "vencanje3",
    title: "Minimalna elegancija",
    description:
      "Čist raspored sa jakim tipografskim fokusom. Potpuno prilagodljiv, uz praćenje gostiju u vašem nalogu.",
    eventTypes: ["wedding"],
    style: "modern",
    config: { ...vencanje3DefaultConfig, eventType: "wedding" as const },
  },
  {
    key: "vencanje4",
    title: "Filmski kadrovi",
    description:
      "Veliki kadrovi preko celog ekrana. Prilagodite sadržaj, a goste i stolove vodite u nalogu.",
    eventTypes: ["wedding"],
    style: "cinematic",
    config: { ...vencanje4DefaultConfig, eventType: "wedding" as const },
  },
  {
    key: "vencanje-premium",
    title: "Premijum editorial",
    description:
      "Svečani editorial stil. Boje, fontovi i galerija ostaju promenljivi i kasnije.",
    eventTypes: ["wedding"],
    style: "premium",
    config: { ...vencanjePremiumDefaultConfig, eventType: "wedding" as const },
  },
  {
    key: "vencanje-cinematic",
    title: "Filmski kadar",
    description:
      "Filmski utisak sa jakim fotografijama. Otvorite primer i javite nam se ako vam se dopada.",
    eventTypes: ["wedding"],
    style: "cinematic",
    config: {
      ...vencanjeCinematicDefaultConfig,
      eventType: "wedding" as const,
    },
  },
  {
    key: "vencanje-background",
    title: "Staklo na pozadini",
    description:
      "Prozirni paneli preko jedne pozadine. Menjajte sadržaj i pošaljite link gostima.",
    eventTypes: ["wedding"],
    style: "modern",
    config: {
      ...vencanjeBackgroundDefaultConfig,
      eventType: "wedding" as const,
    },
  },
  {
    key: "rodjendan-01",
    title: "Dečiji rođendan",
    description:
      "Živahan dizajn za dečiji rođendan. Menjate sadržaj i pratite goste i pripreme u nalogu.",
    eventTypes: ["kidsBirthday"],
    style: "playful",
    config: {
      ...rodjendan01DefaultConfig,
      eventType: "kidsBirthday" as const,
    },
  },
  {
    key: "birthday18",
    title: "18 — Noćno izdanje",
    description:
      "Tamna premium pozivnica za punoletstvo: jak tipografski hero, odbrojavanje, plan večeri i potvrda prisustva.",
    eventTypes: ["comingOfAge"],
    style: "premium",
    config: {
      ...birthday18DefaultConfig,
      eventType: "comingOfAge" as const,
    },
  },
  {
    key: "birthday18-bright",
    title: "18 — Svetlo izdanje",
    description:
      "Svetla, vesela i moderna pozivnica za 18. rođendan: kolor blokovi, gradienti, plan večeri i potvrda prisustva.",
    eventTypes: ["comingOfAge"],
    style: "playful",
    config: {
      ...birthday18BrightDefaultConfig,
      eventType: "comingOfAge" as const,
    },
  },
  {
    key: "birthday18-editorial",
    title: "18 — Glavni junak",
    description:
      "Editorial / Y2K magazin pozivnica za punoletstvo: kolaž raspored, jaka tipografija i modni utisak.",
    eventTypes: ["comingOfAge"],
    style: "editorial",
    config: {
      ...birthday18EditorialDefaultConfig,
      eventType: "comingOfAge" as const,
    },
  },
  {
    key: "birthday18-night",
    title: "18 — Noć počinje",
    description:
      "Tamna cinematic nightlife pozivnica za 18. rođendan: jak tipografski hero, editorial detalji i premium potvrda prisustva.",
    eventTypes: ["comingOfAge"],
    style: "premium",
    config: {
      ...birthday18NightDefaultConfig,
      eventType: "comingOfAge" as const,
    },
  },
  {
    key: "birthday18-gold",
    title: "18 — Zlatno izdanje",
    description:
      "Elegantna champagne/gold pozivnica za punoletstvo: topli tonovi, svečani utisak i jasna potvrda prisustva.",
    eventTypes: ["comingOfAge"],
    style: "premium",
    config: {
      ...birthday18GoldDefaultConfig,
      eventType: "comingOfAge" as const,
    },
  },
  {
    key: "birthday18-ink",
    title: "18 — Novinsko izdanje",
    description:
      "Monohromatska broadsheet pozivnica za punoletstvo: masthead ime, novinske kolone i horizontalne linije.",
    eventTypes: ["comingOfAge"],
    style: "editorial",
    config: {
      ...birthday18InkDefaultConfig,
      eventType: "comingOfAge" as const,
    },
  },
  {
    key: "birthday18-coast",
    title: "18 — Obalsko izdanje",
    description:
      "Vazdušasta dnevna pozivnica za punoletstvo: horizontalni pojasevi, ime kao vodeni žig i raspored kao plima.",
    eventTypes: ["comingOfAge"],
    style: "modern",
    config: {
      ...birthday18CoastDefaultConfig,
      eventType: "comingOfAge" as const,
    },
  },
  {
    key: "birthday18-atelier",
    title: "18 — Atelje izdanje",
    description:
      "Minimalna fashion lookbook pozivnica za punoletstvo: visoka portretna traka i editorial tipografija.",
    eventTypes: ["comingOfAge"],
    style: "premium",
    config: {
      ...birthday18AtelierDefaultConfig,
      eventType: "comingOfAge" as const,
    },
  },
  {
    key: "kids-pastel",
    title: "Pastelni rođendan",
    description:
      "Nežni pastelni tonovi za dečiji rođendan — mek, vedar i topao utisak.",
    eventTypes: ["kidsBirthday"],
    style: "playful",
    config: {
      ...kidsPastelDefaultConfig,
      eventType: "kidsBirthday" as const,
    },
  },
  {
    key: "kids-safari",
    title: "Safari avantura",
    description:
      "Topli safari tonovi i avanturistički osećaj za dečiju proslavu.",
    eventTypes: ["kidsBirthday"],
    style: "playful",
    config: {
      ...kidsSafariDefaultConfig,
      eventType: "kidsBirthday" as const,
    },
  },
  {
    key: "kids-space",
    title: "Svemirska misija",
    description:
      "Tamna svemirska pozivnica za male istraživače — zvezde, boje i avantura.",
    eventTypes: ["kidsBirthday"],
    style: "playful",
    config: {
      ...kidsSpaceDefaultConfig,
      eventType: "kidsBirthday" as const,
    },
  },
  {
    key: "kids-candy",
    title: "Candy party",
    description:
      "Šarena candy estetika za veseli dečiji rođendan pun boja.",
    eventTypes: ["kidsBirthday"],
    style: "playful",
    config: {
      ...kidsCandyDefaultConfig,
      eventType: "kidsBirthday" as const,
    },
  },
  {
    key: "krstenje-classic",
    title: "Klasično krštenje",
    description:
      "Svečana klasična pozivnica za krštenje — champagne tonovi i miran ritam.",
    eventTypes: ["baptism", "kidsBirthday"],
    style: "classic",
    config: {
      ...krstenjeClassicDefaultConfig,
      eventType: "baptism" as const,
    },
  },
  {
    key: "krstenje-soft",
    title: "Nežno krštenje",
    description:
      "Meki blush tonovi za nežnu i toplu pozivnicu za krštenje.",
    eventTypes: ["baptism", "kidsBirthday"],
    style: "classic",
    config: {
      ...krstenjeSoftDefaultConfig,
      eventType: "baptism" as const,
    },
  },
  {
    key: "krstenje-garden",
    title: "Krštenje u bašti",
    description:
      "Zeleni, spokojni tonovi za krštenje i porodičnu proslavu na otvorenom.",
    eventTypes: ["baptism", "kidsBirthday"],
    style: "modern",
    config: {
      ...krstenjeGardenDefaultConfig,
      eventType: "baptism" as const,
    },
  },
  {
    key: "krstenje-modern",
    title: "Moderno krštenje",
    description:
      "Čista moderna pozivnica za krštenje — jednostavno, svetlo i jasno.",
    eventTypes: ["baptism", "kidsBirthday"],
    style: "modern",
    config: {
      ...krstenjeModernDefaultConfig,
      eventType: "baptism" as const,
    },
  },
  {
    key: "krstenje-candle",
    title: "Svečano krštenje",
    description:
      "Topla candlelight atmosfera za svečanu pozivnicu za krštenje.",
    eventTypes: ["baptism", "kidsBirthday"],
    style: "premium",
    config: {
      ...krstenjeCandleDefaultConfig,
      eventType: "baptism" as const,
    },
  },
];

const outDir = path.resolve(process.cwd(), "../admin-panel/lib/templates/seeds");
fs.mkdirSync(outDir, { recursive: true });

const catalog = packs.map(({ key, title, description, eventTypes, style }) => ({
  key,
  title,
  description,
  eventTypes,
  style,
}));

fs.writeFileSync(
  path.join(outDir, "catalog.json"),
  JSON.stringify(catalog, null, 2),
);

for (const pack of packs) {
  fs.writeFileSync(
    path.join(outDir, `${pack.key}.json`),
    JSON.stringify(pack.config, null, 2),
  );
  console.log("wrote", pack.key);
}

console.log("done", packs.length, "→", outDir);
