/**
 * Audit which migration objects already exist on hosted Supabase.
 * Does NOT print secrets. Uses service role + PostgREST / RPC probes.
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env.local"),
});

const { createClient } = require("@supabase/supabase-js");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "MISSING env: NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY",
  );
  process.exit(1);
}

const host = url.replace(/^https?:\/\//, "").split("/")[0];
console.log("target:", host);
console.log("serviceRole: SET");

const sb = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function tableExists(name) {
  const { error } = await sb.from(name).select("*").limit(0);
  if (!error) return true;
  if (String(error.message).includes("does not exist") || error.code === "42P01")
    return false;
  // permission / empty is still "exists"
  if (error.code === "PGRST205") return false;
  // relation missing in schema cache
  if (/Could not find the table/i.test(error.message)) return false;
  return { exists: "unknown", error: error.message, code: error.code };
}

async function columnProbe(table, column) {
  const { error } = await sb.from(table).select(column).limit(0);
  if (!error) return true;
  if (/column|Could not find/i.test(error.message)) return false;
  return { ok: "unknown", error: error.message };
}

async function rpcExists(fn, args) {
  const { error } = await sb.rpc(fn, args);
  if (!error) return true;
  if (/Could not find the function/i.test(error.message)) return false;
  // function exists but args/logic failed
  return { exists: true, note: error.message };
}

(async () => {
  const checks = {
    budget_categories: await tableExists("budget_categories"),
    budget_items: await tableExists("budget_items"),
    planner_tasks: await tableExists("planner_tasks"),
    guest_photos: await tableExists("guest_photos"),
    guests: await tableExists("guests"),
    projects: await tableExists("projects"),
    tables: await tableExists("tables"),
  };

  console.log("\nTables:");
  for (const [k, v] of Object.entries(checks)) {
    console.log(" ", k + ":", v === true ? "OK" : JSON.stringify(v));
  }

  console.log("\nProjects.published:");
  console.log(" ", await columnProbe("projects", "published"));

  console.log("\nGuests party columns:");
  for (const col of [
    "party_size",
    "is_child",
    "age",
    "parent_guest_id",
    "name_pending",
  ]) {
    console.log(" ", col + ":", await columnProbe("guests", col));
  }

  console.log("\nRPCs:");
  console.log(
    "  get_published_project_by_subdomain:",
    await rpcExists("get_published_project_by_subdomain", {
      p_subdomain: "__audit__",
    }),
  );
  console.log(
    "  can_submit_rsvp:",
    await rpcExists("can_submit_rsvp", {
      p_project_id: "00000000-0000-0000-0000-000000000000",
    }),
  );
  console.log(
    "  is_project_owner:",
    await rpcExists("is_project_owner", {
      p_project_id: "00000000-0000-0000-0000-000000000000",
    }),
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
