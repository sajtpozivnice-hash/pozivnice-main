/**
 * One-off: reset admin password via service role.
 * Usage: node scripts/reset-admin-password.mjs [email] [newPassword]
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  const raw = readFileSync(resolve(process.cwd(), ".env"), "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (!m) continue;
    const key = m[1].trim();
    const value = m[2].trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const email =
  process.argv[2] ||
  (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",")[0]?.trim();
const password = process.argv[3] || "AdminTemp123!";

if (!email) {
  console.error("Missing admin email");
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}

const supabase = createClient(url, key);

const { data: list, error: listError } = await supabase.auth.admin.listUsers({
  page: 1,
  perPage: 200,
});

if (listError) {
  console.error(listError.message);
  process.exit(1);
}

const user = list.users.find(
  (u) => u.email?.toLowerCase() === email.toLowerCase(),
);

if (!user) {
  console.error(`User not found: ${email}`);
  process.exit(1);
}

const { error } = await supabase.auth.admin.updateUserById(user.id, {
  password,
  email_confirm: true,
});

if (error) {
  console.error(error.message);
  process.exit(1);
}

console.log(`Password reset OK for ${email}`);
console.log(`Temporary password: ${password}`);
console.log("Log in at /login then change it if you want.");
