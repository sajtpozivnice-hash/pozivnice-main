import { getHostname, getRequestHost, getRootHostname } from "@/lib/domain";

/** Best-effort client IP behind proxies. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Allow browser calls from apex, www, invitation subdomains, localhost, and Vercel previews.
 * Reject missing Origin+Referer (typical non-browser spam).
 */
export function isAllowedBrowserOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const candidate = origin || (referer ? safeOrigin(referer) : null);
  if (!candidate) return false;

  let hostname: string;
  try {
    hostname = new URL(candidate).hostname.toLowerCase();
  } catch {
    return false;
  }

  const roots = new Set<string>([getRootHostname()]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (siteUrl) {
    try {
      const siteHost = new URL(siteUrl).hostname.toLowerCase();
      roots.add(siteHost.startsWith("www.") ? siteHost.slice(4) : siteHost);
    } catch {
      /* ignore bad SITE_URL */
    }
  }

  for (const root of roots) {
    if (!root) continue;
    if (hostname === root || hostname === `www.${root}`) return true;
    if (hostname.endsWith(`.${root}`)) return true;
  }

  if (hostname === "localhost" || hostname.endsWith(".localhost")) return true;
  if (hostname.endsWith(".vercel.app")) return true;

  // Same host as this request (covers custom preview hosts)
  const requestHost = getHostname(getRequestHost(req.headers));
  if (requestHost && hostname === requestHost) return true;

  return false;
}

function safeOrigin(url: string): string | null {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

type RateBucket = { count: number; resetAt: number };

const rateBuckets = new Map<string, RateBucket>();

/**
 * Simple in-memory rate limit (best-effort on serverless).
 * Returns true if the request is allowed.
 */
export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const existing = rateBuckets.get(key);

  if (!existing || existing.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (existing.count >= limit) return false;
  existing.count += 1;
  return true;
}

/** Keep under Vercel ~4.5MB function body (JSON + base64 overhead). */
export const MAX_UPLOAD_DATA_URL_CHARS = 3_500_000;

export const MAX_CONTACT_FORM_TEXT = 4_000;
export const MAX_CONTACT_CONFIG_CHARS = 150_000;
