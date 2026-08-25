import { getRootHostname } from "@/lib/domain";

/**
 * Public invitation site base URL for a subdomain slug.
 * Local: http://{slug}.localhost:3000
 * Prod:  https://{ROOT}/i/{slug}  (apex path — works with www via redirect)
 *
 * Subdomain hosts `{slug}.{ROOT}` still work as an alias via middleware.
 */
export function getInvitationSiteUrl(subdomain: string): string {
  const slug = subdomain.trim().toLowerCase();
  const root = getRootHostname();
  const isLocal = root === "localhost" || root.endsWith(".localhost");
  const port = process.env.NEXT_PUBLIC_INVITE_PORT || "3000";

  if (isLocal) {
    return `http://${slug}.localhost:${port}`;
  }

  return `https://${root}/i/${slug}`;
}

/** Dedicated guest photo upload page (QR target). */
export function getGuestUploadUrl(subdomain: string): string {
  return `${getInvitationSiteUrl(subdomain)}/upload`;
}
