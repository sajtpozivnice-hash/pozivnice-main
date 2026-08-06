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
    title: "Minimal elegance",
    description:
      "Čist raspored sa jakim tipografskim fokusom. Potpuno prilagodljiv, uz praćenje gostiju u vašem nalogu.",
    eventTypes: ["wedding"],
    style: "modern",
    config: { ...vencanje3DefaultConfig, eventType: "wedding" as const },
  },
  {
    key: "vencanje4",
    title: "Cinematic scenes",
    description:
      "Veliki kadrovi preko celog ekrana. Prilagodite sadržaj, a goste i stolove vodite u nalogu.",
    eventTypes: ["wedding"],
    style: "cinematic",
    config: { ...vencanje4DefaultConfig, eventType: "wedding" as const },
  },
  {
    key: "vencanje-premium",
    title: "Premium editorial",
    description:
      "Svečani editorial stil. Boje, fontovi i galerija ostaju promenljivi i kasnije.",
    eventTypes: ["wedding"],
    style: "premium",
    config: { ...vencanjePremiumDefaultConfig, eventType: "wedding" as const },
  },
  {
    key: "vencanje-cinematic",
    title: "Film stills",
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
    title: "Glass on background",
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
    title: "Rođendanska žurka",
    description:
      "Živahan dizajn za rođendan. Menjate sadržaj i pratite goste i pripreme u nalogu.",
    eventTypes: ["birthday"],
    style: "playful",
    config: rodjendan01DefaultConfig,
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
