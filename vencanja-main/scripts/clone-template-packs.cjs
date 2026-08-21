/**
 * Clone invitation template packs with renamed keys/prefixes.
 * Run: node scripts/clone-template-packs.mjs
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "templates");

/** @type {Array<{
 *  source: string,
 *  key: string,
 *  exportFrom: string,
 *  exportTo: string,
 *  classFrom: string,
 *  classTo: string,
 *  cssVarFrom?: string,
 *  cssVarTo?: string,
 * }>} */
const PACKS = [
  // comingOfAge (+1)
  {
    source: "birthday18-bright",
    key: "birthday18-gold",
    exportFrom: "birthday18Bright",
    exportTo: "birthday18Gold",
    classFrom: "b18b-",
    classTo: "b18g-",
    cssVarFrom: "--b18b-",
    cssVarTo: "--b18g-",
  },
  // kidsBirthday (+4)
  {
    source: "rodjendan-01",
    key: "kids-pastel",
    exportFrom: "rodjendan01",
    exportTo: "kidsPastel",
    classFrom: "bday-",
    classTo: "kpas-",
    cssVarFrom: "--color-bday-",
    cssVarTo: "--color-kpas-",
  },
  {
    source: "rodjendan-01",
    key: "kids-safari",
    exportFrom: "rodjendan01",
    exportTo: "kidsSafari",
    classFrom: "bday-",
    classTo: "ksaf-",
    cssVarFrom: "--color-bday-",
    cssVarTo: "--color-ksaf-",
  },
  {
    source: "rodjendan-01",
    key: "kids-space",
    exportFrom: "rodjendan01",
    exportTo: "kidsSpace",
    classFrom: "bday-",
    classTo: "kspc-",
    cssVarFrom: "--color-bday-",
    cssVarTo: "--color-kspc-",
  },
  {
    source: "rodjendan-01",
    key: "kids-candy",
    exportFrom: "rodjendan01",
    exportTo: "kidsCandy",
    classFrom: "bday-",
    classTo: "kcan-",
    cssVarFrom: "--color-bday-",
    cssVarTo: "--color-kcan-",
  },
];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function transformContent(content, pack) {
  let next = content;
  // template key string
  next = next.split(pack.source).join(pack.key);
  // export identifiers (longer first)
  next = next.split(`${pack.exportFrom}DefaultConfig`).join(
    `${pack.exportTo}DefaultConfig`,
  );
  next = next.split(`${pack.exportFrom}Renderers`).join(
    `${pack.exportTo}Renderers`,
  );
  next = next.split(pack.exportFrom).join(pack.exportTo);
  if (pack.cssVarFrom && pack.cssVarTo) {
    next = next.split(pack.cssVarFrom).join(pack.cssVarTo);
  }
  next = next.split(pack.classFrom).join(pack.classTo);
  // Tailwind color utilities for kids base: text-bday-ink → text-kpas-ink etc.
  if (pack.source === "rodjendan-01") {
    const fromUtil = pack.classFrom.replace(/-$/, ""); // bday
    const toUtil = pack.classTo.replace(/-$/, ""); // kpas
    next = next.split(`text-${fromUtil}-`).join(`text-${toUtil}-`);
    next = next.split(`bg-${fromUtil}-`).join(`bg-${toUtil}-`);
    next = next.split(`border-${fromUtil}-`).join(`border-${toUtil}-`);
    next = next.split(`from-${fromUtil}-`).join(`from-${toUtil}-`);
    next = next.split(`to-${fromUtil}-`).join(`to-${toUtil}-`);
    next = next.split(`via-${fromUtil}-`).join(`via-${toUtil}-`);
  }
  return next;
}

for (const pack of PACKS) {
  const src = path.join(ROOT, pack.source);
  const dest = path.join(ROOT, pack.key);
  if (!fs.existsSync(src)) {
    console.error("Missing source", pack.source);
    process.exit(1);
  }
  if (fs.existsSync(dest)) {
    console.log("skip existing", pack.key);
    continue;
  }
  copyDir(src, dest);
  for (const file of walk(dest)) {
    if (!/\.(tsx?|css|json)$/.test(file)) continue;
    const raw = fs.readFileSync(file, "utf8");
    const next = transformContent(raw, pack);
    if (next !== raw) fs.writeFileSync(file, next);
  }
  console.log("created", pack.key);
}

console.log("done", PACKS.length);
