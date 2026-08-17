const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "templates");
const packs = fs
  .readdirSync(root)
  .filter((d) => fs.statSync(path.join(root, d)).isDirectory());

const missingDomId = [];
const ctaIssues = [];

for (const pack of packs) {
  const secDir = path.join(root, pack, "sections");
  const configPath = path.join(root, pack, "config.ts");

  if (fs.existsSync(secDir)) {
    for (const file of fs.readdirSync(secDir).filter((f) => f.endsWith(".tsx"))) {
      const src = fs.readFileSync(path.join(secDir, file), "utf8");
      if (!/const \{[^}]*\bid\b/.test(src) && !/\bid,\s*data\b/.test(src) && !/\{ id, data \}/.test(src) && !/section\.id/.test(src)) {
        // might still destructure differently
      }
      const usesSectionId =
        /id=\{id\}/.test(src) ||
        /id=\{section\.id\}/.test(src) ||
        /<(SceneFrame|SceneShell)[\s\S]{0,200}?id=\{id\}/.test(src);

      const looksLikeSection =
        /section:\s*\w+Section/.test(src) || /section\.\w+/.test(src.slice(0, 500));

      if (looksLikeSection && !usesSectionId) {
        missingDomId.push(`${pack}/sections/${file}`);
      }
    }
  }

  if (fs.existsSync(configPath)) {
    const src = fs.readFileSync(configPath, "utf8");
    const cta = src.match(/ctaHref:\s*"([^"]+)"/);
    const hasRsvp = /id:\s*"rsvp"/.test(src);
    if (cta && cta[1].startsWith("#")) {
      const target = cta[1].slice(1);
      const hasTarget = new RegExp(`id:\\s*"${target}"`).test(src);
      if (!hasTarget) {
        ctaIssues.push({ pack, ctaHref: cta[1], hasRsvp });
      }
    }
  }
}

console.log("Sections without DOM id={id}:", missingDomId.length);
missingDomId.forEach((m) => console.log(" ", m));
console.log("\nctaHref without matching section id:", ctaIssues.length);
ctaIssues.forEach((m) => console.log(" ", JSON.stringify(m)));
