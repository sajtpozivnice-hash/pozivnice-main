/**
 * Exports template default configs as JSON for admin-panel.
 * Imports config modules only (avoids renderer/React/Supabase side effects).
 * Run: npx tsx scripts/export-admin-template-seeds.ts  (from vencanja-main)
 *
 * Keep packs in sync with templates/index.ts + types/config TemplateKey.
 */
import fs from "fs";
import path from "path";
import type { EventType } from "../types/config";
import { vencanjeBackgroundDefaultConfig } from "../templates/vencanje-background/config";
import { vencanjeSageDefaultConfig } from "../templates/vencanje-sage/config";
import { vencanjeInkDefaultConfig } from "../templates/vencanje-ink/config";
import { vencanjeDuskDefaultConfig } from "../templates/vencanje-dusk/config";
import { vencanjeTerraDefaultConfig } from "../templates/vencanje-terra/config";
import { vencanjeLinenDefaultConfig } from "../templates/vencanje-linen/config";
import { vencanjeNavyDefaultConfig } from "../templates/vencanje-navy/config";
import { vencanjeVanguardDefaultConfig } from "../templates/vencanje-vanguard/config";
import { vencanjeDecoDefaultConfig } from "../templates/vencanje-deco/config";
import { vencanjeBohoDefaultConfig } from "../templates/vencanje-boho/config";
import { vencanjeOpalDefaultConfig } from "../templates/vencanje-opal/config";
import { vencanjeAtelierDefaultConfig } from "../templates/vencanje-atelier/config";
import { rodjendan01DefaultConfig } from "../templates/rodjendan-01/config";
import { birthday18DefaultConfig } from "../templates/birthday18/config";
import { birthday18BrightDefaultConfig } from "../templates/birthday18-bright/config";
import { birthday18EditorialDefaultConfig } from "../templates/birthday18-editorial/config";
import { birthday18NightDefaultConfig } from "../templates/birthday18-night/config";
import { birthday18InkDefaultConfig } from "../templates/birthday18-ink/config";
import { kidsSafariDefaultConfig } from "../templates/kids-safari/config";
import { kidsSpaceDefaultConfig } from "../templates/kids-space/config";
import { kidsCandyDefaultConfig } from "../templates/kids-candy/config";
import { kidsCartoonDefaultConfig } from "../templates/kids-cartoon/config";
import { kidsHoneyDefaultConfig } from "../templates/kids-honey/config";
import { krstenjeClassicDefaultConfig } from "../templates/krstenje-classic/config";
import { krstenjeGardenDefaultConfig } from "../templates/krstenje-garden/config";
import { krstenjeCandleDefaultConfig } from "../templates/krstenje-candle/config";

type Pack = {
  key: string;
  title: string;
  description: string;
  eventTypes: EventType[];
  style: string;
  imageLink?: string;
  config: Record<string, unknown>;
};

const packs: Pack[] = [
  {
    key: "vencanje-background",
    title: "Staklo na pozadini",
    description:
      "Prozirni paneli preko jedne pozadine. Menjajte sadržaj i pošaljite link gostima.",
    eventTypes: ["wedding"],
    style: "modern",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787067139/alvin-mahmudov-NSVJAAXOYHs-unsplash_szart3.jpg",
    config: { ...vencanjeBackgroundDefaultConfig, eventType: "wedding" },
  },
  {
    key: "vencanje-sage",
    title: "Tiha kadulja",
    description:
      "Quiet luxury tipografija — sage i oat, bez fotografija. Asimetrija zamenjena tihim, centriranim ritmom.",
    eventTypes: ["wedding"],
    style: "editorial",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787226228/ulyana-tim-AbnCRgL2DNs-unsplash_yhvslu.jpg",
    config: { ...vencanjeSageDefaultConfig, eventType: "wedding" },
  },
  {
    key: "vencanje-ink",
    title: "Editorial mastilo",
    description:
      "Tipografski fokus kao u magazinu. Krema i crno, veliki naslovi, tanak hairline ritam.",
    eventTypes: ["wedding"],
    style: "editorial",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787150836/beatriz-perez-moya-M2T1j-6Fn8w-unsplash_rc0b1t.jpg",
    config: { ...vencanjeInkDefaultConfig, eventType: "wedding" },
  },
  {
    key: "vencanje-dusk",
    title: "Večernji bakar",
    description:
      "Tamni cinematic pejzaž sa bakarnim akcentom. Filmski kadar za večernja venčanja.",
    eventTypes: ["wedding"],
    style: "cinematic",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787300802/veikko-venemies-RtFSn0I2zi8-unsplash_f7rdgt.jpg",
    config: { ...vencanjeDuskDefaultConfig, eventType: "wedding" },
  },
  {
    key: "vencanje-terra",
    title: "Mediteranska terakota",
    description:
      "Topla zemljana paleta — terakota, pesak i maslina. Lučni kadar i organski raspored.",
    eventTypes: ["wedding"],
    style: "modern",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787146696/photo-1721635513009-4bd5d277c437_zhohbj.avif",
    config: { ...vencanjeTerraDefaultConfig, eventType: "wedding" },
  },
  {
    key: "vencanje-linen",
    title: "Šampanjac lan",
    description:
      "Quiet luxury stationery — krem lan, šampanjac i monogram. Izgleda kao skup papir, digitalno.",
    eventTypes: ["wedding"],
    style: "premium",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787087127/photo-1522673607200-164d1b6ce486_esxvqd.avif",
    config: { ...vencanjeLinenDefaultConfig, eventType: "wedding" },
  },
  {
    key: "vencanje-navy",
    title: "Formalni navy",
    description:
      "Navy i mesing za black-tie večeri. Monogram, ceremonijalni ton, jak kontrast.",
    eventTypes: ["wedding"],
    style: "premium",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1772187509/wedding/qvui0cbpivfwkyiyfpy6.jpg",
    config: { ...vencanjeNavyDefaultConfig, eventType: "wedding" },
  },
  {
    key: "vencanje-vanguard",
    title: "Letterpress vanguard",
    description:
      "Wood-type tipografija na papiru — velika imena, oxblood akcent, bez fotografija.",
    eventTypes: ["wedding"],
    style: "premium",
    imageLink:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    config: { ...vencanjeVanguardDefaultConfig, eventType: "wedding" },
  },
  {
    key: "vencanje-deco",
    title: "Art Deco zlato",
    description:
      "Geometrijska elegancija Jazz Age-a — italic serif, zlatni okviri, bez fotografija.",
    eventTypes: ["wedding"],
    style: "premium",
    imageLink:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    config: { ...vencanjeDecoDefaultConfig, eventType: "wedding" },
  },
  {
    key: "vencanje-boho",
    title: "Boho terracotta",
    description:
      "Pesak, terracotta i sage — script tipografija, lukovi i talasi, bez fotografija.",
    eventTypes: ["wedding"],
    style: "premium",
    imageLink:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    config: { ...vencanjeBohoDefaultConfig, eventType: "wedding" },
  },
  {
    key: "vencanje-opal",
    title: "Biserasti vellum",
    description:
      "Pearl i blush slojevi kao vellum. Mekani frosted paneli — premium mixed-materials osećaj.",
    eventTypes: ["wedding"],
    style: "editorial",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787146485/hisu-lee-FTW8ADj5igs-unsplash_vwsxdb.jpg",
    config: { ...vencanjeOpalDefaultConfig, eventType: "wedding" },
  },
  {
    key: "vencanje-atelier",
    title: "Atelje tišina",
    description:
      "The Row quiet luxury — kamen, topli crni, ogromni belina. Najskuplji utisak kroz redukciju.",
    eventTypes: ["wedding"],
    style: "editorial",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787150836/beatriz-perez-moya-M2T1j-6Fn8w-unsplash_rc0b1t.jpg",
    config: { ...vencanjeAtelierDefaultConfig, eventType: "wedding" },
  },
  {
    key: "rodjendan-01",
    title: "1. rođendan — klasik",
    description:
      "Živahan dizajn za dečiji rođendan. Menjate sadržaj i pratite goste i pripreme u nalogu.",
    eventTypes: ["kidsBirthday"],
    style: "playful",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787343638/shayna-douglas-9ou4URp__0s-unsplash_helzyu.jpg",
    config: { ...rodjendan01DefaultConfig, eventType: "kidsBirthday" },
  },
  {
    key: "birthday18",
    title: "18 — Noćno izdanje",
    description:
      "Tamna premium pozivnica za punoletstvo: jak tipografski hero, odbrojavanje, plan večeri i potvrda prisustva.",
    eventTypes: ["comingOfAge"],
    style: "premium",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787344571/photo-1514525253161-7a46d19cd819_nwm8cf.avif",
    config: { ...birthday18DefaultConfig, eventType: "comingOfAge" },
  },
  {
    key: "birthday18-bright",
    title: "18 — Svetlo izdanje",
    description:
      "Svetla, vesela i moderna pozivnica za 18. rođendan: kolor blokovi, gradienti, plan večeri i potvrda prisustva.",
    eventTypes: ["comingOfAge"],
    style: "playful",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787344853/photo-1529626455594-4ff0802cfb7e_knhxfx.avif",
    config: { ...birthday18BrightDefaultConfig, eventType: "comingOfAge" },
  },
  {
    key: "birthday18-editorial",
    title: "18 — Glavni junak",
    description:
      "Editorial / Y2K magazin pozivnica za punoletstvo: kolaž raspored, jaka tipografija i modni utisak.",
    eventTypes: ["comingOfAge"],
    style: "editorial",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787345123/photo-1534528741775-53994a69daeb_sfbdns.avif",
    config: { ...birthday18EditorialDefaultConfig, eventType: "comingOfAge" },
  },
  {
    key: "birthday18-night",
    title: "18 — Noć počinje",
    description:
      "Tamna cinematic nightlife pozivnica za 18. rođendan: jak tipografski hero, editorial detalji i premium potvrda prisustva.",
    eventTypes: ["comingOfAge"],
    style: "premium",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787345364/fidel-fernando-249DzAuJTqQ-unsplash_n7asm2.jpg",
    config: { ...birthday18NightDefaultConfig, eventType: "comingOfAge" },
  },
  {
    key: "birthday18-ink",
    title: "18 — Novinsko izdanje",
    description:
      "Monohromatska broadsheet pozivnica za punoletstvo: masthead ime, novinske kolone i horizontalne linije.",
    eventTypes: ["comingOfAge"],
    style: "editorial",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787347709/rishabh-sharma-R-js25Pv1LQ-unsplash_k1l2w2.jpg",
    config: { ...birthday18InkDefaultConfig, eventType: "comingOfAge" },
  },
  {
    key: "kids-safari",
    title: "1. rođendan — safari",
    description:
      "Topli safari tonovi i avanturistički osećaj za prvi dečiji rođendan.",
    eventTypes: ["kidsBirthday"],
    style: "playful",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787326450/behnam-mohsenzadeh-3q_47uOolcw-unsplash_jonnnu.jpg",
    config: { ...kidsSafariDefaultConfig, eventType: "kidsBirthday" },
  },
  {
    key: "kids-space",
    title: "1. rođendan — svemir",
    description:
      "Tamna svemirska pozivnica za prvi rođendan malih istraživača.",
    eventTypes: ["kidsBirthday"],
    style: "playful",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023489/photo-1530103862676-de8c9debad1d_rxuitz.avif",
    config: { ...kidsSpaceDefaultConfig, eventType: "kidsBirthday" },
  },
  {
    key: "kids-candy",
    title: "1. rođendan — candy",
    description:
      "Šarena candy estetika za veseli prvi dečiji rođendan pun boja.",
    eventTypes: ["kidsBirthday"],
    style: "playful",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787327398/katie-rainbow-U21WOE0jB0E-unsplash_n9pimf.jpg",
    config: { ...kidsCandyDefaultConfig, eventType: "kidsBirthday" },
  },
  {
    key: "kids-cartoon",
    title: "1. rođendan — cartoon",
    description:
      "Comic strip stil — speech bubble, oblačići i šarene epizode za prvi rođendan.",
    eventTypes: ["kidsBirthday"],
    style: "playful",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787324323/wang-binghua-zSvkokr_yw0-unsplash_qz1ao3.jpg",
    config: { ...kidsCartoonDefaultConfig, eventType: "kidsBirthday" },
  },
  {
    key: "kids-honey",
    title: "1. rođendan — medeni picnic",
    description:
      "Medena tegla, honeycomb i crveni balon — topao, dečiji picnic za prvi rođendan.",
    eventTypes: ["kidsBirthday"],
    style: "playful",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023931/pexels-junielly-oliveira-2736244-4960960_migtwt.jpg",
    config: { ...kidsHoneyDefaultConfig, eventType: "kidsBirthday" },
  },
  {
    key: "krstenje-classic",
    title: "Klasično krštenje",
    description:
      "Svečana klasična pozivnica za krštenje — lako se prilagodi i za dečiji rođendan.",
    eventTypes: ["baptism", "kidsBirthday"],
    style: "classic",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787348109/2026-04-08-07-23-30-960x640_hmlazn.jpg",
    config: { ...krstenjeClassicDefaultConfig, eventType: "baptism" },
  },
  {
    key: "krstenje-garden",
    title: "Krštenje u bašti",
    description:
      "Zeleni tonovi za krštenje ili porodični rođendan na otvorenom.",
    eventTypes: ["baptism", "kidsBirthday"],
    style: "modern",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787350317/2026-01-17-04-45-55-960x640_eed5a3.jpg",
    config: { ...krstenjeGardenDefaultConfig, eventType: "baptism" },
  },
  {
    key: "krstenje-candle",
    title: "Svečano krštenje",
    description:
      "Topla candlelight atmosfera za krštenje ili svečani dečiji rođendan.",
    eventTypes: ["baptism", "kidsBirthday"],
    style: "premium",
    imageLink:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787348109/2026-04-08-07-23-30-960x640_hmlazn.jpg",
    config: { ...krstenjeCandleDefaultConfig, eventType: "baptism" },
  },
];

const outDir = path.resolve(process.cwd(), "../admin-panel/lib/templates/seeds");
fs.mkdirSync(outDir, { recursive: true });

const activeKeys = new Set(packs.map((p) => p.key));

// Remove stale seed files (deleted packs)
for (const file of fs.readdirSync(outDir)) {
  if (!file.endsWith(".json") || file === "catalog.json") continue;
  const key = file.replace(/\.json$/, "");
  if (!activeKeys.has(key)) {
    fs.unlinkSync(path.join(outDir, file));
    console.log("removed stale", key);
  }
}

const catalog = packs.map(
  ({ key, title, description, eventTypes, style, imageLink }) => ({
    key,
    title,
    description,
    eventTypes,
    style,
    ...(imageLink ? { imageLink } : {}),
  }),
);

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
