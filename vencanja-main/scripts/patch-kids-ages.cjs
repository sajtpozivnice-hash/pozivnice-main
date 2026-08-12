/**
 * Assign distinct ages + age-appropriate Serbian copy to kids birthday packs.
 * Run: node scripts/patch-kids-ages.cjs
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "templates");

const SPECS = {
  "rodjendan-01": {
    age: 1,
    ordinal: "1.",
    names: "Mila",
    title: "Mila — 1. rođendan",
    metaDesc: "Nežna pozivnica za prvi rođendan",
    heroTitle: "Prvi rođendan!",
    heroSub: "Pozivamo vas na",
    heroDesc:
      "Mali koraci, velika radost. Dođite da zajedno proslavimo Milinu prvu godinu.",
    invite:
      "Dragi prijatelji i porodico, sa velikom ljubavlju vas pozivamo na Milin 1. rođendan — topao popodnevni skup uz tortu, pesmu i osmijehe.",
    program: [
      ["11:00", "Dolazak i druženje", "Mirna atmosfera za bebe i roditelje."],
      ["11:30", "Igre na mekanoj podlozi", "Blage senzorne igre i baloni."],
      ["12:00", "Torta i pevanje", "Prva svećica i zajedničke fotografije."],
      ["12:30", "Slatki sto i oproštaj", "Voće, kolačići i polako rastajanje."],
    ],
    activities: "Senzorne igračke, mekane kocke i mirne pesmice.",
  },
  "kids-pastel": {
    age: 3,
    ordinal: "3.",
    names: "Lena",
    title: "Lena — 3. rođendan",
    metaDesc: "Storybook pozivnica za treći rođendan",
    heroTitle: "Tri godine magije",
    heroSub: "Pozivamo te na",
    heroDesc:
      "Priče, boje i mala avantura. Dođi da proslavimo Lenine treće godine.",
    invite:
      "Dragi prijatelji, pozivamo vas na Lenin 3. rođendan — popodne puno priča, crtanja i slatkih iznenađenja.",
    program: [
      ["16:00", "Dobrodošlica", "Nalepnice i kratko upoznavanje."],
      ["16:20", "Priča i crtanje", "Čitamo zajedno i bojimo stranice."],
      ["17:00", "Torta", "Tri svećice i želja."],
      ["17:30", "Igre u bašti", "Blage trke i loptice."],
    ],
    activities: "Crtanje, nalepnice i male poklon-kese.",
  },
  "kids-safari": {
    age: 5,
    ordinal: "5.",
    names: "Luka",
    title: "Luka — 5. rođendan · safari",
    metaDesc: "Safari ekspedicija za peti rođendan",
    heroTitle: "Safari misija",
    heroSub: "Pozivnica za istraživače",
    heroDesc:
      "Pet godina avanture! Spremi mapu, šešir i dobar apetit.",
    invite:
      "Dragi istraživači, pozivamo vas na Lukin 5. rođendan — safari staza, tragovi i potraga za blagom.",
    program: [
      ["15:00", "Start ekspedicije", "Pasoš avanture i pečati."],
      ["15:30", "Potraga za tragovima", "Zagonetke po bašti."],
      ["16:15", "Kamp užina", "Voće, sok i „kamp“ sto."],
      ["16:45", "Torta kod vatre", "Pet svećica i ples."],
    ],
    activities: "Mapa, pečati, potraga i maske životinja.",
  },
  "kids-space": {
    age: 8,
    ordinal: "8.",
    names: "Mateja",
    title: "Mateja — 8. rođendan · svemir",
    metaDesc: "Svemirska misija za osmi rođendan",
    heroTitle: "Misija: 8",
    heroSub: "Poziv za posadu",
    heroDesc:
      "Osma orbita oko Sunca. Spremi se za noćnu misiju, zvezde i tortu u nultoj gravitaciji.",
    invite:
      "Pozivamo posadu na Matejin 8. rođendan — svemirska žurka sa misijama, kodovima i zvezdanoj torti.",
    program: [
      ["18:00", "Ulazak u bazu", "Bedževi i brifing misije."],
      ["18:25", "Kodovi i zadaci", "Timovi rešavaju svemirske zagonetke."],
      ["19:10", "Lansiranje torte", "Osam svećica."],
      ["19:40", "Disco u orbiti", "Ples i foto-kabina."],
    ],
    activities: "Bedževi, šifre, laserske igre (bezbedne) i foto-pozadina.",
  },
  "kids-candy": {
    age: 10,
    ordinal: "10.",
    names: "Mila",
    title: "Mila — 10. rođendan · candy",
    metaDesc: "Candy party za deseti rođendan",
    heroTitle: "Double digits!",
    heroSub: "Candy magazine party",
    heroDesc:
      "Deset godina stila. Šareno, glasno i sa puno slavnog osećaja.",
    invite:
      "Pozivamo te na Milin 10. rođendan — candy žurka, muzika, photo corner i torta kao naslovnica magazina.",
    program: [
      ["17:00", "Red carpet ulaz", "Photo corner i nalepnice."],
      ["17:30", "Igre i playlist", "Timski izazovi i karaoke."],
      ["18:15", "Naslovna torta", "Deset svećica."],
      ["18:45", "After party", "Ples do kraja."],
    ],
    activities: "Photo corner, playlist glasovi i candy bar.",
  },
};

function patchConfig(key, spec) {
  const file = path.join(ROOT, key, "config.ts");
  let src = fs.readFileSync(file, "utf8");

  src = src.replace(/title: "[^"]+",\n    description: "[^"]+"/, `title: "${spec.title}",\n    description: "${spec.metaDesc}"`);
  src = src.replace(/names: "[^"]+"/, `names: "${spec.names}"`);
  src = src.replace(/badge: "[^"]+"/, `badge: "${spec.age} godina"`);
  src = src.replace(
    /title: "Rođendanska žurka!"/,
    `title: "${spec.heroTitle}"`,
  );
  src = src.replace(/subtitle: "Pozivamo te na"/, `subtitle: "${spec.heroSub}"`);
  // hero description (first long description in hero block is tricky) — replace common pattern
  src = src.replace(
    /description:\s*\n\s*"Igre, torta, muzika[^"]*"/,
    `description:\n          "${spec.heroDesc}"`,
  );
  src = src.replace(
    /description:\s*\n\s*"Mali koraci[^"]*"/,
    `description:\n          "${spec.heroDesc}"`,
  );
  // invite paragraph — replace first invite-like block after inviteText
  src = src.replace(
    /Dragi prijatelji[^"]{20,400}/,
    spec.invite.replace(/"/g, '\\"'),
  );

  // Replace schedule items if present as structured block — simpler: replace badge and titles already done
  // Program titles
  const titles = spec.program.map((p) => p[1]);
  const oldTitles = [
    "Dolazak i igre",
    "Kreativna radionica",
    "Torta i pevanje",
    "Ples i veselje",
    "Start ekspedicije",
    "Potraga za tragovima",
  ];
  // Replace schedule item titles in order by matching title: "..." after time fields
  let progIdx = 0;
  src = src.replace(
    /(time: "[^"]+",\s*\n\s*title: ")([^"]+)(")/g,
    (m, a, _t, c) => {
      if (progIdx < spec.program.length) {
        const title = spec.program[progIdx][1];
        progIdx += 1;
        return `${a}${title}${c}`;
      }
      return m;
    },
  );
  progIdx = 0;
  src = src.replace(
    /(time: "[^"]+",\s*\n\s*title: "[^"]+",\s*\n\s*description: ")([^"]*)(")/g,
    (m, a, _d, c) => {
      if (progIdx < spec.program.length) {
        const desc = spec.program[progIdx][2];
        const time = spec.program[progIdx][0];
        progIdx += 1;
        // also need time — do separate
        return `${a}${desc}${c}`;
      }
      return m;
    },
  );

  // times
  let tIdx = 0;
  src = src.replace(/time: "[^"]+"/g, (m) => {
    // only first 4 schedule times roughly — skip if too many
    if (tIdx < spec.program.length) {
      const time = spec.program[tIdx][0];
      tIdx += 1;
      return `time: "${time}"`;
    }
    return m;
  });

  src = src.replace(
    /description:\s*\n\s*"Senzorne igračke[^"]*"/,
    `description:\n              "${spec.activities}"`,
  );
  src = src.replace(
    /description:\s*\n\s*"Crtanje[^"]*"/,
    `description:\n              "${spec.activities}"`,
  );

  // Fix ordinal mentions like 7. rođendan
  src = src.replace(/\d+\.\s*rođendan/g, `${spec.ordinal} rođendan`);
  src = src.replace(/Milin \d+\./g, `${spec.names}in ${spec.ordinal}`);
  src = src.replace(/Lenin \d+\./g, `${spec.names}in ${spec.ordinal}`);
  src = src.replace(/Lukin \d+\./g, `${spec.names}in ${spec.ordinal}`);
  src = src.replace(/Matejin \d+\./g, `${spec.names}in ${spec.ordinal}`);

  fs.writeFileSync(file, src);
  console.log("patched", key, spec.ordinal);
}

for (const [key, spec] of Object.entries(SPECS)) {
  patchConfig(key, spec);
}

// catalog titles in templates/index.ts
const indexFile = path.join(ROOT, "index.ts");
let index = fs.readFileSync(indexFile, "utf8");
index = index.replace(
  /"rodjendan-01": \{[\s\S]*?catalog: \{\s*title: "[^"]+"/,
  (m) => m.replace(/title: "[^"]+"/, 'title: "1. rođendan — klasik"'),
);
index = index.replace(
  /"kids-pastel": \{[\s\S]*?catalog: \{\s*title: "[^"]+"/,
  (m) => m.replace(/title: "[^"]+"/, 'title: "3. rođendan — pastel"'),
);
index = index.replace(
  /"kids-safari": \{[\s\S]*?catalog: \{\s*title: "[^"]+"/,
  (m) => m.replace(/title: "[^"]+"/, 'title: "5. rođendan — safari"'),
);
index = index.replace(
  /"kids-space": \{[\s\S]*?catalog: \{\s*title: "[^"]+"/,
  (m) => m.replace(/title: "[^"]+"/, 'title: "8. rođendan — svemir"'),
);
index = index.replace(
  /"kids-candy": \{[\s\S]*?catalog: \{\s*title: "[^"]+"/,
  (m) => m.replace(/title: "[^"]+"/, 'title: "10. rođendan — candy"'),
);
fs.writeFileSync(indexFile, index);
console.log("catalog titles updated");
