const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "templates");
const packs = fs
  .readdirSync(root)
  .filter((d) => fs.statSync(path.join(root, d)).isDirectory());

const missing = [];
const noIdProp = [];

for (const pack of packs) {
  const secDir = path.join(root, pack, "sections");
  if (!fs.existsSync(secDir)) continue;

  for (const file of fs.readdirSync(secDir).filter((f) => f.endsWith(".tsx"))) {
    const full = path.join(secDir, file);
    const src = fs.readFileSync(full, "utf8");
    const head = src.slice(0, src.indexOf("return"));

    const destructuresId =
      /\bid\b/.test(head) &&
      (/\(\s*\{\s*[^}]*\bid\b/.test(head) ||
        /SectionRenderer|props\.id|: Section/.test(head));

    const assignsDomId =
      /id=\{id\}/.test(src) ||
      /id=\{id\s*\|\|/.test(src) ||
      /id=\{[^}]*\.id\}/.test(src);

    const passesToShell =
      /<(SceneFrame|SceneShell|Scene)\b[^>]*\bid=/.test(src) ||
      /<(SceneFrame|SceneShell|Scene)\b[^>]*\n[^>]*\bid=/.test(src);

    if (!destructuresId && !assignsDomId) {
      noIdProp.push(`${pack}/sections/${file}`);
      continue;
    }

    if (destructuresId && !assignsDomId && !passesToShell) {
      missing.push(`${pack}/sections/${file}`);
    }
  }
}

console.log("Missing id={id} on root (has id prop):", missing.length);
missing.forEach((m) => console.log(" ", m));
console.log("\nNo id in props at all:", noIdProp.length);
noIdProp.forEach((m) => console.log(" ", m));
