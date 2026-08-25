/**
 * Host / subdomain helpers for invitation sites.
 * Works for:
 * - ana-marko.localhost:3000
 * - ana-marko.vasdogadjaj.com
 * - apex: localhost:3000 / vasdogadjaj.com / www.vasdogadjaj.com
 *
 * Never use www in NEXT_PUBLIC_ROOT_DOMAIN — invitation hosts are
 * `{slug}.{root}`, and `www.{slug}.{root}` is not covered by `*.{root}` DNS.
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

/**
 * Apex root without www — used for `{slug}.{root}` subdomain math.
 */
export function getRootHostname(): string {
  const configured =
    process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim().toLowerCase() ?? "localhost";
  const host = configured.split(":")[0] ?? "localhost";
  return stripLeadingWww(host);
}

/**
 * Public marketing / path-invite origin.
 * Prefer NEXT_PUBLIC_SITE_URL; else www.{root} (matches Vercel "Redirect apex to www").
 */
export function getPublicSiteOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (configured) return configured;

  const root = getRootHostname();
  if (root === "localhost" || root.endsWith(".localhost")) {
    const port = process.env.NEXT_PUBLIC_INVITE_PORT || "3000";
    return `http://localhost:${port}`;
  }

  return `https://www.${root}`;
}

function stripLeadingWww(hostname: string): string {
  return hostname.startsWith("www.") ? hostname.slice(4) : hostname;
}

/**
 * If host is `www.{slug}.{root}`, return canonical `{slug}.{root}`.
 * Apex `www.{root}` is left as-is (marketing site).
 */
export function getCanonicalInvitationHostname(
  hostHeader: string,
): string | null {
  const hostname = getHostname(hostHeader);
  if (!hostname || hostname.startsWith("[")) return null;

  const root = getRootHostname();
  if (hostname === root || hostname === `www.${root}`) return null;

  const rootSuffix = `.${root}`;
  if (!hostname.endsWith(rootSuffix)) return null;

  const label = hostname.slice(0, -rootSuffix.length);
  if (!label.startsWith("www.") || label === "www") return null;

  const slug = label.slice(4);
  if (!slug || slug.includes(".")) return null;

  return `${slug}.${root}`;
}

/**
 * Returns invitation subdomain slug, or null on apex / reserved / invalid.
 * Accepts `www.{slug}.{root}` as `{slug}` (middleware should redirect to canonical).
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
    let label = hostname.slice(0, -rootSuffix.length);
    // www.ana-marko.vasdogadjaj.com → ana-marko
    if (label.startsWith("www.")) {
      label = label.slice(4);
    }
    return normalizeSubdomainLabel(label);
  }

  // Local dev: *.localhost even when ROOT_DOMAIN is a production host
  if (hostname.endsWith(".localhost")) {
    let label = hostname.slice(0, -".localhost".length);
    if (label.startsWith("www.")) {
      label = label.slice(4);
    }
    return normalizeSubdomainLabel(label);
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
