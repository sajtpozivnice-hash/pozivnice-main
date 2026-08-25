import { getPublicSiteOrigin, getRootHostname } from "@/lib/domain";

/**
 * Share / QR / admin link — MUST work with www and without.
 * Uses apex path because www.{subdomain}.{root} is impossible on normal DNS
 * (DreamWeb / single-level wildcard).
 */
export function getInvitationSiteUrl(subdomain: string): string {
  const slug = subdomain.trim().toLowerCase();
  const root = getRootHostname();
  const isLocal = root === "localhost" || root.endsWith(".localhost");
  const port = process.env.NEXT_PUBLIC_INVITE_PORT || "3000";

  if (isLocal) {
    return `http://${slug}.localhost:${port}`;
  }

  return `${getPublicSiteOrigin()}/i/${slug}`;
}

/** Optional pretty host (no www left of the name — DNS cannot support that). */
export function getInvitationSubdomainUrl(subdomain: string): string {
  const slug = subdomain.trim().toLowerCase();
  const root = getRootHostname();
  const isLocal = root === "localhost" || root.endsWith(".localhost");
  const port = process.env.NEXT_PUBLIC_INVITE_PORT || "3000";

  if (isLocal) {
    return `http://${slug}.localhost:${port}`;
  }

  return `https://${slug}.${root}`;
}

export function getGuestUploadUrl(subdomain: string): string {
  return `${getInvitationSiteUrl(subdomain)}/upload`;
}
