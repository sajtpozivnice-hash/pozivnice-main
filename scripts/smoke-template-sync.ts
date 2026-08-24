/**
 * Smoke check: admin seeds ↔ main TemplateKey ↔ catalog imageLinks.
 * Run from repo root: npx tsx scripts/smoke-template-sync.ts
 * Or: cd vencanja-main && npx tsx ../scripts/smoke-template-sync.ts
 */
import fs from "fs";
import path from "path";

const root = path.resolve(__dirname, "..");
const seedsDir = path.join(root, "admin-panel/lib/templates/seeds");
const mainTypes = path.join(root, "vencanja-main/types/config.ts");
const adminTypes = path.join(root, "admin-panel/types/project.ts");
const indexTs = path.join(root, "vencanja-main/templates/index.ts");

function extractTemplateKeys(src: string): string[] {
  const m = src.match(/export type TemplateKey =([\s\S]*?);/);
  if (!m) throw new Error("TemplateKey not found");
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]).sort();
}

function fail(msg: string): never {
  console.error("FAIL:", msg);
  process.exit(1);
}

const catalog = JSON.parse(
  fs.readFileSync(path.join(seedsDir, "catalog.json"), "utf8"),
) as Array<{ key: string; imageLink?: string; eventTypes: string[] }>;

const catalogKeys = catalog.map((c) => c.key).sort();
const mainKeys = extractTemplateKeys(fs.readFileSync(mainTypes, "utf8"));
const adminKeys = extractTemplateKeys(fs.readFileSync(adminTypes, "utf8"));

if (JSON.stringify(mainKeys) !== JSON.stringify(adminKeys)) {
  fail(`TemplateKey mismatch main vs admin`);
}
if (JSON.stringify(mainKeys) !== JSON.stringify(catalogKeys)) {
  fail(`TemplateKey mismatch vs catalog.json`);
}

for (const item of catalog) {
  if (!item.imageLink) fail(`catalog missing imageLink: ${item.key}`);
  const seedPath = path.join(seedsDir, `${item.key}.json`);
  if (!fs.existsSync(seedPath)) fail(`missing seed: ${item.key}.json`);
  const seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));
  if (seed.template !== item.key) {
    fail(`seed.template !== key for ${item.key}`);
  }
}

const stale = fs
  .readdirSync(seedsDir)
  .filter((f) => f.endsWith(".json") && f !== "catalog.json")
  .map((f) => f.replace(/\.json$/, ""))
  .filter((k) => !catalogKeys.includes(k));
if (stale.length) fail(`stale seeds: ${stale.join(", ")}`);

const indexSrc = fs.readFileSync(indexTs, "utf8");
for (const key of catalogKeys) {
  if (!indexSrc.includes(`"${key}"`) && key !== "birthday18") {
    // birthday18 may be unquoted
    if (key === "birthday18" && !indexSrc.includes("birthday18:")) {
      fail(`index.ts missing pack: ${key}`);
    } else if (key !== "birthday18") {
      fail(`index.ts missing pack: ${key}`);
    }
  }
}

const byEvent: Record<string, string[]> = {};
for (const item of catalog) {
  for (const et of item.eventTypes) {
    (byEvent[et] ??= []).push(item.key);
  }
}

/** Preferred 1-per-type smoke targets (must exist in catalog). */
const SMOKE_PICKS: Record<string, string> = {
  wedding: "vencanje-background",
  comingOfAge: "birthday18",
  kidsBirthday: "kids-safari",
  baptism: "krstenje-classic",
};

function pickForEvent(et: string): string {
  const preferred = SMOKE_PICKS[et];
  if (preferred && byEvent[et]?.includes(preferred)) return preferred;
  return byEvent[et]?.[0] ?? "(none)";
}

console.log("OK —", catalogKeys.length, "templates synced");
console.log("Smoke QA picks (1 per event type):");
console.log("  wedding      →", pickForEvent("wedding"));
console.log("  comingOfAge  →", pickForEvent("comingOfAge"));
console.log("  kidsBirthday →", pickForEvent("kidsBirthday"));
console.log("  baptism      →", pickForEvent("baptism"));
console.log("");
console.log("Manual smoke per pick:");
console.log("  1) /editor/<template> — change font + primary color, save");
console.log("  2) publish / open live subdomain");
console.log("  3) RSVP submit");
console.log("  4) guest photo upload");
console.log("  5) dashboard seating download (PDF/CSV)");
console.log("  6) mobile + desktop viewport");
