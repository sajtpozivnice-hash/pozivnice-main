const rawRoot =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN ||
  process.env.NEXT_PUBLIC_INVITE_ROOT_DOMAIN ||
  "localhost";

/** Apex without www. */
const ROOT_DOMAIN = rawRoot
  .trim()
  .toLowerCase()
  .replace(/^www\./, "");

const INVITE_PORT = process.env.NEXT_PUBLIC_INVITE_PORT || "3000";
const EDITOR_BASE =
  process.env.NEXT_PUBLIC_EDITOR_BASE_URL || `http://localhost:${INVITE_PORT}`;

export function normalizeSubdomain(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function isValidSubdomain(value: string): boolean {
  return /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/.test(value);
}

/**
 * Prod invitation links use apex path `/i/{slug}` so www never breaks.
 * Local keeps `{slug}.localhost`.
 */
export function getInvitationUrl(subdomain: string): string {
  const slug = normalizeSubdomain(subdomain);
  if (ROOT_DOMAIN === "localhost" || ROOT_DOMAIN.endsWith(".localhost")) {
    return `http://${slug}.localhost:${INVITE_PORT}`;
  }
  return `https://${ROOT_DOMAIN}/i/${slug}`;
}

export function getEditorUrl(templateKey: string): string {
  return `${EDITOR_BASE.replace(/\/$/, "")}/editor/${templateKey}`;
}
