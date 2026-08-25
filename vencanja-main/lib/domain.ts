/**
 * Host / subdomain helpers for invitation sites.
 *
 * Invitation URL (only form we support):
 *   https://jelena-dejan.vasdogadjaj.com
 *
 * Not supported: www.jelena-dejan.vasdogadjaj.com
 * Marketing apex www.vasdogadjaj.com is fine (not an invitation host).
 */

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

export function getRequestHost(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-host");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "";
  }
  return headers.get("host") ?? "";
}

export function getHostname(hostHeader: string): string {
  const raw = hostHeader.trim().toLowerCase();
  if (!raw) return "";

  if (raw.startsWith("[")) {
    const end = raw.indexOf("]");
    return end === -1 ? raw : raw.slice(0, end + 1);
  }

  return raw.split(":")[0] ?? "";
}

/** Apex root without leading www. */
export function getRootHostname(): string {
  const configured =
    process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim().toLowerCase() ?? "localhost";
  const host = configured.split(":")[0] ?? "localhost";
  return host.startsWith("www.") ? host.slice(4) : host;
}

/**
 * Invitation subdomain slug, or null on apex / reserved / nested hosts.
 * Only `{slug}.{root}` — not `www.{slug}.{root}`.
 */
export function getInvitationSubdomain(hostHeader: string): string | null {
  const hostname = getHostname(hostHeader);
  if (!hostname || hostname.startsWith("[")) return null;

  const root = getRootHostname();

  if (hostname === root || hostname === `www.${root}`) {
    return null;
  }

  const rootSuffix = `.${root}`;
  if (hostname.endsWith(rootSuffix)) {
    return normalizeSubdomainLabel(hostname.slice(0, -rootSuffix.length));
  }

  if (hostname.endsWith(".localhost")) {
    return normalizeSubdomainLabel(hostname.slice(0, -".localhost".length));
  }

  return null;
}

function normalizeSubdomainLabel(raw: string): string | null {
  const label = raw.trim().toLowerCase();
  if (!label) return null;
  // Nested hosts (www.jelena-dejan) → invalid
  if (label.includes(".")) return null;
  if (RESERVED_SUBDOMAINS.has(label)) return null;
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(label)) return null;
  return label;
}

export const INVITATION_SITE_HEADER = "x-invitation-site";
