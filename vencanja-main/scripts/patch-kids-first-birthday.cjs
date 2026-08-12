/**
 * Force all kids birthday packs to "1. rođendan" copy,
 * while keeping each pack's theme voice.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "templates");

const packs = {
  "rodjendan-01": {
    metaTitle: "Mila — 1. rođendan",
    metaDesc: "Moderna pozivnica za prvi dečiji rođendan",
    heroTitle: "Prvi rođendan!",
    heroSubtitle: "Pozivamo vas na",
    heroDesc:
      "Mali koraci, velika radost. Dođite da zajedno proslavimo Milinu prvu godinu.",
    badge: "1 godina",
    invite:
      "Dragi prijatelji i porodico, sa velikom ljubavlju vas pozivamo na Milin 1. rođendan — topao popodnevni skup uz tortu, pesmu i osmehe.",
    cakeItem: "Torta i jedna svećica",
  },
  "kids-pastel": {
    metaTitle: "Lena — 1. rođendan",
    metaDesc: "Nežna storybook pozivnica za prvi dečiji rođendan",
    heroTitle: "Prva godina magije",
    heroSubtitle: "Pozivamo te na",
    heroDesc:
      "Priče, boje i prva mala avantura. Dođi da proslavimo Leninu prvu godinu.",
    badge: "1 godina",
    invite:
      "Dragi prijatelji, pozivamo vas na Lenin 1. rođendan — popodne puno priča, crtanja i slatkih iznenađenja.",
    cakeItem: "Torta i jedna svećica",
  },
  "kids-safari": {
    metaTitle: "Luka — 1. rođendan ekspedicija",
    metaDesc: "Safari ekspedicija pozivnica za prvi dečiji rođendan",
    heroTitle: "Prva safari misija",
    heroSubtitle: "Pozivnica za istraživače",
    heroDesc:
      "Prva godina avanture! Spremi mapu, šešir i dobar apetit.",
    badge: "1 godina",
    invite:
      "Dragi istraživači, pozivamo vas na Lukin 1. rođendan — safari staza, tragovi i potraga za blagom.",
    cakeItem: "Torta kod vatre — jedna svećica",
  },
  "kids-space": {
    metaTitle: "Mateja — 1. rođendan",
    metaDesc: "Tamna orbitalna pozivnica za prvi dečiji rođendan",
    heroTitle: "Misija: prva orbita",
    heroSubtitle: "Poziv za posadu",
    heroDesc:
      "Prva orbita oko Sunca. Spremi se za misiju, zvezde i tortu u nultoj gravitaciji.",
    badge: "1 godina",
    invite:
      "Pozivamo posadu na Matejin 1. rođendan — svemirska žurka sa misijama, kodovima i zvezdanoj torti.",
    cakeItem: "Zvezdana torta — jedna svećica",
  },
  "kids-candy": {
    metaTitle: "Mila — 1. rođendan candy",
    metaDesc: "Šarena candy pozivnica za prvi dečiji rođendan",
    heroTitle: "Prvi candy cover!",
    heroSubtitle: "Candy magazine party",
    heroDesc:
      "Prva godina stila. Šareno, glasno i sa puno slavnog osećaja.",
    badge: "1 godina",
    invite:
      "Pozivamo te na Milin 1. rođendan — candy žurka, muzika, photo corner i torta kao naslovnica magazina.",
    cakeItem: "Naslovna torta — jedna svećica",
  },
};

function patchFile(file, replacer) {
  const src = fs.readFileSync(file, "utf8");
  const next = replacer(src);
  if (next !== src) fs.writeFileSync(file, next);
}

for (const [key, p] of Object.entries(packs)) {
  const file = path.join(root, key, "config.ts");
  let src = fs.readFileSync(file, "utf8");

  src = src.replace(/title:\s*"[^"]*",\s*\n\s*description:\s*"[^"]*",/, (m) => {
    // only first meta site title/desc inside site block — fragile; do targeted hero instead
    return m;
  });

  // site meta (first title/description in file after export)
  src = src.replace(
    /(export const \w+DefaultConfig[\s\S]*?site:\s*\{[\s\S]*?title:\s*")[^"]*(")/,
    `$1${p.metaTitle}$2`,
  );
  src = src.replace(
    /(export const \w+DefaultConfig[\s\S]*?site:\s*\{[\s\S]*?description:\s*")[^"]*(")/,
    `$1${p.metaDesc}$2`,
  );

  // hero block: first hero data
  src = src.replace(
    /(type:\s*"hero",[\s\S]*?data:\s*\{[\s\S]*?title:\s*")[^"]*(")/,
    `$1${p.heroTitle}$2`,
  );
  src = src.replace(
    /(type:\s*"hero",[\s\S]*?data:\s*\{[\s\S]*?subtitle:\s*")[^"]*(")/,
    `$1${p.heroSubtitle}$2`,
  );
  src = src.replace(
    /(type:\s*"hero",[\s\S]*?data:\s*\{[\s\S]*?description:\s*")[^"]*(")/,
    `$1${p.heroDesc}$2`,
  );
  src = src.replace(
    /(type:\s*"hero",[\s\S]*?data:\s*\{[\s\S]*?badge:\s*")[^"]*(")/,
    `$1${p.badge}$2`,
  );

  // inviteText description
  src = src.replace(
    /(type:\s*"inviteText",[\s\S]*?data:\s*\{[\s\S]*?description:\s*")[^"]*(")/,
    `$1${p.invite}$2`,
  );

  // schedule cake-ish last items mentioning candles / years
  src = src.replace(/Pet svećica[^"]*/g, p.cakeItem.replace(/^Torta[^—]*—\s*/, "").replace(/^Naslovna torta — /, "").replace(/^Zvezdana torta — /, ""));
  src = src.replace(/title:\s*"Torta kod vatre"/g, `title: "${p.cakeItem.split(" — ")[0] || "Torta"}"`);
  src = src.replace(/Pet svećica i ples\./g, "Jedna svećica i ples.");
  src = src.replace(/\d+\. rođendan/g, "1. rođendan");
  src = src.replace(/\b\d+ godina\b/g, "1 godina");
  src = src.replace(/\b\d+ godine\b/g, "1 godina");

  // re-apply exact badge/hero/invite after blanket age replace if needed
  src = src.replace(
    /(type:\s*"hero",[\s\S]*?data:\s*\{[\s\S]*?title:\s*")[^"]*(")/,
    `$1${p.heroTitle}$2`,
  );
  src = src.replace(
    /(type:\s*"hero",[\s\S]*?data:\s*\{[\s\S]*?description:\s*")[^"]*(")/,
    `$1${p.heroDesc}$2`,
  );
  src = src.replace(
    /(type:\s*"hero",[\s\S]*?data:\s*\{[\s\S]*?badge:\s*")[^"]*(")/,
    `$1${p.badge}$2`,
  );
  src = src.replace(
    /(type:\s*"inviteText",[\s\S]*?data:\s*\{[\s\S]*?description:\s*")[^"]*(")/,
    `$1${p.invite}$2`,
  );

  fs.writeFileSync(file, src);
  console.log("patched", key);
}

// catalog titles in templates/index.ts
const indexFile = path.join(__dirname, "..", "templates", "index.ts");
let index = fs.readFileSync(indexFile, "utf8");
index = index
  .replace(/title: "3\. rođendan — pastel"/, 'title: "1. rođendan — pastel"')
  .replace(/title: "5\. rođendan — safari"/, 'title: "1. rođendan — safari"')
  .replace(/title: "8\. rođendan — svemir"/, 'title: "1. rođendan — svemir"')
  .replace(/title: "10\. rođendan — candy"/, 'title: "1. rođendan — candy"')
  .replace(
    /("kids-pastel":[\s\S]*?description:\s*")[^"]*(")/,
    '$1Nežni pastelni tonovi za prvi dečiji rođendan — mek, vedar i topao utisak.$2',
  )
  .replace(
    /("kids-safari":[\s\S]*?description:\s*")[^"]*(")/,
    '$1Topli safari tonovi i avanturistički osećaj za prvi dečiji rođendan.$2',
  )
  .replace(
    /("kids-space":[\s\S]*?description:\s*")[^"]*(")/,
    '$1Tamna svemirska pozivnica za prvi rođendan malih istraživača.$2',
  )
  .replace(
    /("kids-candy":[\s\S]*?description:\s*")[^"]*(")/,
    '$1Šarena candy estetika za veseli prvi dečiji rođendan pun boja.$2',
  );

fs.writeFileSync(indexFile, index);
console.log("catalog titles updated");
