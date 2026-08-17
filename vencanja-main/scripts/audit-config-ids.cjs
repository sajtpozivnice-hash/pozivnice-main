const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "templates");
const packs = fs
  .readdirSync(root)
  .filter((d) => fs.statSync(path.join(root, d)).isDirectory());

const issues = [];

for (const pack of packs) {
  const configPath = path.join(root, pack, "config.ts");
  if (!fs.existsSync(configPath)) continue;
  const src = fs.readFileSync(configPath, "utf8");

  // extract id: "..." near section objects
  const ids = [...src.matchAll(/^\s*id:\s*"([^"]+)"/gm)].map((m) => m[1]);
  // filter meta-ish: keep likely section ids (appear with type nearby) — use all unique from sections array roughly
  const sectionBlock = src.match(/sections:\s*\[([\s\S]*)\]\s*,\s*theme/);
  const block = sectionBlock ? sectionBlock[1] : src;
  const sectionIds = [...block.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);

  const seen = new Map();
  for (const id of sectionIds) {
    seen.set(id, (seen.get(id) || 0) + 1);
  }
  const dups = [...seen.entries()].filter(([, n]) => n > 1);
  if (dups.length) {
    issues.push({ pack, type: "duplicate", dups });
  }

  // CTA hrefs pointing to anchors
  const hrefs = [...src.matchAll(/#[a-zA-Z0-9_-]+/g)].map((m) => m[0].slice(1));
  const missingAnchors = [...new Set(hrefs)].filter((h) => !seen.has(h));
  if (missingAnchors.length) {
    issues.push({ pack, type: "href-missing-id", missingAnchors, known: [...seen.keys()] });
  }
}

console.log(JSON.stringify(issues, null, 2));
