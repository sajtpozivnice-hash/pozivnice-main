import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const vencanjaMain = path.resolve(__dirname, "../../vencanja-main");

const result = spawnSync(
  "npx",
  ["--yes", "tsx", "scripts/export-admin-template-seeds.ts"],
  { cwd: vencanjaMain, stdio: "inherit", shell: true },
);

process.exit(result.status ?? 1);
