import { supabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * Tables that may reference projects without ON DELETE CASCADE
 * (legacy schema: tables, guests, seating, project_media).
 * Budget/planner/guest_photos already CASCADE in newer migrations.
 */
async function deleteByProjectIds(
  table: string,
  projectIds: string[],
): Promise<void> {
  if (projectIds.length === 0) return;
  const { error } = await supabaseAdmin
    .from(table)
    .delete()
    .in("project_id", projectIds);

  // Ignore missing-table / unknown relation — schema varies by env
  if (error && !isIgnorableSchemaError(error.message)) {
    throw new Error(`${table}: ${error.message}`);
  }
}

function isIgnorableSchemaError(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes("does not exist") ||
    m.includes("could not find") ||
    m.includes("schema cache")
  );
}

/**
 * Remove child rows that block project delete (esp. tables / guests FKs).
 */
export async function purgeProjectDependencies(
  projectIds: string[],
): Promise<void> {
  const ids = [...new Set(projectIds.filter(Boolean))];
  if (ids.length === 0) return;

  // Break guests → tables FK first (table_id)
  const { error: clearError } = await supabaseAdmin
    .from("guests")
    .update({ table_id: null })
    .in("project_id", ids);

  if (clearError && !isIgnorableSchemaError(clearError.message)) {
    // Some schemas may not have table_id — continue to deletes
    if (!clearError.message.toLowerCase().includes("table_id")) {
      throw new Error(`guests clear table_id: ${clearError.message}`);
    }
  }

  await deleteByProjectIds("tables", ids);
  await deleteByProjectIds("guests", ids);
  await deleteByProjectIds("seating", ids);
  await deleteByProjectIds("project_media", ids);
}

export async function deleteProjectsByIds(projectIds: string[]): Promise<void> {
  const ids = [...new Set(projectIds.filter(Boolean))];
  if (ids.length === 0) return;

  await purgeProjectDependencies(ids);

  const { error } = await supabaseAdmin.from("projects").delete().in("id", ids);
  if (error) throw new Error(error.message);
}
