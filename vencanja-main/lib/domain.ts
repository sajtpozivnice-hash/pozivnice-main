/**
 * Host / subdomain helpers for invitation sites.
 * Works for:
 * - ana-marko.localhost:3000
 * - ana-marko.vasdogadjaj.com
 * - apex: localhost:3000 / vasdogadjaj.com / www.vasdogadjaj.com
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

/** Prefer forwarded host behind proxies (Vercel, nginx). */
export function getRequestHost(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-host");
  if (forwarded) {
    // May be a comma-separated list — first is the original client host
    return forwarded.split(",")[0]?.trim() ?? "";
  }
  return headers.get("host") ?? "";
}

/** Host without port, lowercased. */
export function getHostname(hostHeader: string): string {
  const raw = hostHeader.trim().toLowerCase();
  if (!raw) return "";

  // Strip port; keep IPv6 bracket form untouched enough to fail closed
  if (raw.startsWith("[")) {
    const end = raw.indexOf("]");
    return end === -1 ? raw : raw.slice(0, end + 1);
  }

  return raw.split(":")[0] ?? "";
}

/** Root domain host without port (from env or fallback). */
export function getRootHostname(): string {
  const configured =
    process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim().toLowerCase() ?? "localhost";
  return configured.split(":")[0] ?? "localhost";
}

/**
 * Returns invitation subdomain slug, or null on apex / reserved / invalid.
 * Generic: no hardcoded client names.
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

  // Local dev: *.localhost even when ROOT_DOMAIN is a production host
  if (hostname.endsWith(".localhost")) {
    return normalizeSubdomainLabel(hostname.slice(0, -".localhost".length));
  }

  return null;
}

function normalizeSubdomainLabel(raw: string): string | null {
  const label = raw.trim().toLowerCase();
  if (!label) return null;
  // Only a single DNS label (no nested a.b.root)
  if (label.includes(".")) return null;
  if (RESERVED_SUBDOMAINS.has(label)) return null;
  // Safe slug: letters, numbers, hyphen
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(label)) return null;
  return label;
}

export const INVITATION_SITE_HEADER = "x-invitation-site";
