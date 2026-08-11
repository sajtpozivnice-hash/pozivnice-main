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
