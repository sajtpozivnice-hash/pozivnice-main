/**
 * Apply distinct themes + Serbian seed copy to newly cloned packs.
 * Run: node scripts/apply-new-template-themes.cjs
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "templates");

function patchFile(file, replacer) {
  const full = path.join(ROOT, file);
  const raw = fs.readFileSync(full, "utf8");
  const next = replacer(raw);
  if (next === raw) {
    console.warn("no change", file);
    return;
  }
  fs.writeFileSync(full, next);
  console.log("patched", file);
}

function replaceBetween(src, startMarker, endMarker, replacement) {
  const start = src.indexOf(startMarker);
  const end = src.indexOf(endMarker, start + startMarker.length);
  if (start === -1 || end === -1) return src;
  return src.slice(0, start) + replacement + src.slice(end);
}

/** Kids packs: rewrite @theme block colors + page background */
const kidsThemes = {
  "kids-safari": {
    themeCss: `@theme {
  --color-ksaf-coral: #d97706;
  --color-ksaf-sky: #6b8f71;
  --color-ksaf-mint: #a3b18a;
  --color-ksaf-sun: #e9c46a;
  --color-ksaf-violet: #8d6e63;
  --color-ksaf-ink: #3d2c1e;
  --color-ksaf-cream: #f7f1e8;
  --color-ksaf-cloud: #efe6d8;
}`,
    bg: `background:
      radial-gradient(ellipse at 10% 0%, rgba(217, 119, 6, 0.14), transparent 42%),
      radial-gradient(ellipse at 90% 8%, rgba(107, 143, 113, 0.16), transparent 40%),
      linear-gradient(180deg, #f7f1e8 0%, #efe6d8 50%, #e7dcc8 100%);`,
    primary: "#d97706",
    secondary: "#3d2c1e",
    ternary: "#6b8f71",
    background: "#f7f1e8",
    backgroundSecondary: "#efe6d8",
    names: "Luka",
    title: "Luka — safari avantura",
    metaDesc: "Safari pozivnica za dečiji rođendan",
  },
  "kids-space": {
    themeCss: `@theme {
  --color-kspc-coral: #7c5cff;
  --color-kspc-sky: #3d8bff;
  --color-kspc-mint: #5ce1e6;
  --color-kspc-sun: #fbbf24;
  --color-kspc-violet: #a78bfa;
  --color-kspc-ink: #e8eefc;
  --color-kspc-cream: #0b1020;
  --color-kspc-cloud: #141a2e;
}`,
    bg: `background:
      radial-gradient(ellipse at 20% 0%, rgba(124, 92, 255, 0.28), transparent 45%),
      radial-gradient(ellipse at 80% 20%, rgba(61, 139, 255, 0.22), transparent 40%),
      radial-gradient(ellipse at 50% 100%, rgba(92, 225, 230, 0.12), transparent 50%),
      linear-gradient(180deg, #0b1020 0%, #10182c 55%, #0b1020 100%);`,
    primary: "#7c5cff",
    secondary: "#e8eefc",
    ternary: "#5ce1e6",
    background: "#0b1020",
    backgroundSecondary: "#141a2e",
    names: "Mateja",
    title: "Mateja — svemirska misija",
    metaDesc: "Svemirska pozivnica za dečiji rođendan",
  },
  "kids-candy": {
    themeCss: `@theme {
  --color-kcan-coral: #ff4d6d;
  --color-kcan-sky: #4cc9f0;
  --color-kcan-mint: #80ed99;
  --color-kcan-sun: #ffd60a;
  --color-kcan-violet: #c77dff;
  --color-kcan-ink: #2b1a3a;
  --color-kcan-cream: #fff5fb;
  --color-kcan-cloud: #ffe8f5;
}`,
    bg: `background:
      radial-gradient(ellipse at 8% 0%, rgba(255, 77, 109, 0.18), transparent 42%),
      radial-gradient(ellipse at 92% 5%, rgba(76, 201, 240, 0.16), transparent 40%),
      radial-gradient(ellipse at 50% 100%, rgba(255, 214, 10, 0.14), transparent 45%),
      linear-gradient(180deg, #fff5fb 0%, #ffe8f5 40%, #e8f9ff 100%);`,
    primary: "#ff4d6d",
    secondary: "#2b1a3a",
    ternary: "#4cc9f0",
    background: "#fff5fb",
    backgroundSecondary: "#ffe8f5",
    names: "Mila",
    title: "Mila — candy party",
    metaDesc: "Šarena candy pozivnica za dečiji rođendan",
  },
};

for (const [key, t] of Object.entries(kidsThemes)) {
  patchFile(`${key}/index.css`, (raw) => {
    let next = raw.replace(/@theme \{[\s\S]*?\n\}/, t.themeCss);
    next = next.replace(/background:\s*[\s\S]*?;\n\s*font-family:/, `${t.bg}\n    font-family:`);
    return next;
  });

  patchFile(`${key}/config.ts`, (raw) => {
    let next = raw;
    next = next.replace(/names: "[^"]+"/, `names: "${t.names}"`);
    next = next.replace(/title: "[^"]+",\n    description: "[^"]+"/, `title: "${t.title}",\n    description: "${t.metaDesc}"`);
    // theme colors if present
    next = next.replace(/value: "#[0-9a-fA-F]{3,8}"/, `value: "${t.primary}"`); // first only rough
    return next;
  });
}

/** birthday18-gold palette */
patchFile("birthday18-gold/index.css", (raw) =>
  raw
    .replace(/#ff5c7a/g, "#c4a574")
    .replace(/#ffb08a/g, "#e2c59a")
    .replace(/#a78bfa/g, "#8b7355")
    .replace(/#1f1630/g, "#2a2118")
    .replace(/#fff7f2/g, "#faf6f0")
    .replace(/#ffe8ef/g, "#f3e8d8")
    .replace(/#6ee7c5/g, "#d4b896")
    .replace(/#ffd56a/g, "#e8c98a"),
);

patchFile("birthday18-gold/config.ts", (raw) =>
  raw
    .replace(/title: "[^"]+"/, 'title: "Sofija — 18 · Zlatno izdanje"')
    .replace(
      /description: "[^"]+"/,
      'description: "Elegantna champagne/gold pozivnica za punoletstvo"',
    )
    .replace(/names: "[^"]+"/, 'names: "Sofija"')
    .replace(/#ff5c7a/g, "#c4a574")
    .replace(/#1f1630/g, "#2a2118")
    .replace(/#a78bfa/g, "#8b7355")
    .replace(/#fff7f2/g, "#faf6f0")
    .replace(/#ffe8ef/g, "#f3e8d8"),
);

/** Baptism packs: theme CSS + Serbian seed identity */
const baptism = {
  "krstenje-classic": {
    ink: "#141210",
    ivory: "#faf7f2",
    sand: "#f0ebe3",
    accent: "#b8956c",
    accentSoft: "#d4c0a5",
    muted: "#7a736a",
    names: "Mina",
    title: "Mina — Krštenje",
    heroTitle: "Sa verom i radošću",
    heroSubtitle: "Pozivamo vas na krštenje",
    invite:
      "Sa velikom radošću pozivamo vas da budete uz nas na dan krštenja naše male Mine. Biće nam čast da podelite taj poseban trenutak sa nama.",
    countdown: "Do dana krštenja",
    storyTitle: "O našoj radosti",
    quote: "Jer gde je ljubav, tu je i Bog.",
  },
  "krstenje-soft": {
    ink: "#4a3f45",
    ivory: "#fff8f6",
    sand: "#f8ece8",
    accent: "#d4a5a5",
    accentSoft: "#e8cfcf",
    muted: "#8a7a80",
    names: "Tara",
    title: "Tara — nežno krštenje",
    heroTitle: "Blagoslovljen početak",
    heroSubtitle: "Pozivamo vas na krštenje",
    invite:
      "Sa ljubavlju vas pozivamo na krštenje naše ćerke Tare. Podelite sa nama tihi, svečani dan pun topline.",
    countdown: "Do krštenja",
    storyTitle: "Naša zahvalnost",
    quote: "Najveći dar je ljubav koju delimo.",
  },
  "krstenje-garden": {
    ink: "#243028",
    ivory: "#f5f7f2",
    sand: "#e8efe4",
    accent: "#6b8f71",
    accentSoft: "#a3b18a",
    muted: "#6b756e",
    names: "Vuk",
    title: "Vuk — krštenje u bašti",
    heroTitle: "Pod otvorenim nebom",
    heroSubtitle: "Krštenje i porodična proslava",
    invite:
      "Pozivamo vas na krštenje našeg sina Vuka, a zatim na druženje u zelenilu i miru bašte.",
    countdown: "Do proslave",
    storyTitle: "Porodični krug",
    quote: "Neka raste u miru, radosti i ljubavi.",
  },
  "krstenje-modern": {
    ink: "#1a1a1a",
    ivory: "#ffffff",
    sand: "#f4f4f5",
    accent: "#5b6cff",
    accentSoft: "#a5b0ff",
    muted: "#71717a",
    names: "Una",
    title: "Una — moderno krštenje",
    heroTitle: "Čist početak",
    heroSubtitle: "Pozivnica za krštenje",
    invite:
      "Sa radošću vas pozivamo na krštenje naše Une — jednostavno, toplo i u krugu najbližih.",
    countdown: "Do datuma",
    storyTitle: "Zašto nam je važno",
    quote: "Početak ispunjen ljubavlju.",
  },
  "krstenje-candle": {
    ink: "#f3e9d7",
    ivory: "#1a1510",
    sand: "#241c14",
    accent: "#d4a574",
    accentSoft: "#e2c59a",
    muted: "#b8a690",
    names: "Teodor",
    title: "Teodor — svečano krštenje",
    heroTitle: "U svetlosti sveće",
    heroSubtitle: "Pozivamo vas na krštenje",
    invite:
      "U toploj atmosferi i uz najbliže, pozivamo vas na krštenje našeg sina Teodora.",
    countdown: "Do svečanog dana",
    storyTitle: "Naša molitva",
    quote: "Neka svetlost vodi njegov put.",
  },
};

for (const [key, t] of Object.entries(baptism)) {
  const prefix = {
    "krstenje-classic": "kc",
    "krstenje-soft": "ks",
    "krstenje-garden": "kg",
    "krstenje-modern": "km",
    "krstenje-candle": "kd",
  }[key];

  patchFile(`${key}/index.css`, (raw) => {
    return raw.replace(
      /@theme \{[\s\S]*?\n\}/,
      `@theme {
  --color-${prefix}-ink: ${t.ink};
  --color-${prefix}-ink-soft: ${t.ink};
  --color-${prefix}-ivory: ${t.ivory};
  --color-${prefix}-sand: ${t.sand};
  --color-${prefix}-champagne: ${t.accent};
  --color-${prefix}-champagne-soft: ${t.accentSoft};
  --color-${prefix}-muted: ${t.muted};
}`,
    );
  });

  patchFile(`${key}/config.ts`, (raw) => {
    let next = raw;
    next = next.replace(/eventType: "wedding"/g, 'eventType: "baptism"');
    // insert eventType if missing after template line
    if (!next.includes("eventType:")) {
      next = next.replace(
        `template: "${key}",`,
        `template: "${key}",\n  eventType: "baptism",`,
      );
    }
    next = next.replace(/title: "Nevena & Jovan — Venčanje"/, `title: "${t.title}"`);
    next = next.replace(
      /description: "Elektronska pozivnica"/,
      'description: "Pozivnica za krštenje"',
    );
    next = next.replace(/names: "Nevena & Jovan"/, `names: "${t.names}"`);
    next = next.replace(/value: "#b8956c"/, `value: "${t.accent}"`);
    next = next.replace(/value: "#141210"/, `value: "${t.ink}"`);
    next = next.replace(
      /title: "Naša priča počinje ovde"/,
      `title: "${t.heroTitle}"`,
    );
    next = next.replace(
      /subtitle: "Sa ljubavlju Vas pozivamo"/,
      `subtitle: "${t.heroSubtitle}"`,
    );
    next = next.replace(/title: "Do našeg dana"/, `title: "${t.countdown}"`);
    next = next.replace(
      /Sa velikom radošću Vas pozivamo da zajedno sa nama proslavite početak našeg zajedničkog života\. Biće nam čast da tog dana budete uz nas\./,
      t.invite,
    );
    next = next.replace(/title: "Naša priča"/, `title: "${t.storyTitle}"`);
    // love quote if present
    next = next.replace(
      /text: "[^"]{10,120}"/,
      `text: "${t.quote}"`,
    );
    return next;
  });
}

console.log("theme apply done");
