const rawRoot =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN ||
  process.env.NEXT_PUBLIC_INVITE_ROOT_DOMAIN ||
  "localhost";

const ROOT_DOMAIN = rawRoot
  .trim()
  .toLowerCase()
  .replace(/^www\./, "");

const INVITE_PORT = process.env.NEXT_PUBLIC_INVITE_PORT || "3000";
const EDITOR_BASE =
  process.env.NEXT_PUBLIC_EDITOR_BASE_URL || `http://localhost:${INVITE_PORT}`;

const RESERVED_SUBDOMAINS = new Set([
  "www",
  "app",
  "api",
  "admin",
  "dashboard",
  "mail",
  "ftp",
  "static",
  "assets",
  "cdn",
  "staging",
  "preview",
]);

export function normalizeSubdomain(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function isReservedSubdomain(value: string): boolean {
  return RESERVED_SUBDOMAINS.has(normalizeSubdomain(value));
}

export function isValidSubdomain(value: string): boolean {
  const slug = normalizeSubdomain(value);
  return (
    /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/.test(slug) &&
    !isReservedSubdomain(slug)
  );
}

/** https://jelena-dejan.vasdogadjaj.com */
export function getInvitationUrl(subdomain: string): string {
  const slug = normalizeSubdomain(subdomain);
  if (ROOT_DOMAIN === "localhost" || ROOT_DOMAIN.endsWith(".localhost")) {
    return `http://${slug}.localhost:${INVITE_PORT}`;
  }
  return `https://${slug}.${ROOT_DOMAIN}`;
}

export function getEditorUrl(templateKey: string): string {
  return `${EDITOR_BASE.replace(/\/$/, "")}/editor/${templateKey}`;
}
