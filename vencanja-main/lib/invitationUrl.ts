import { getRootHostname } from "@/lib/domain";

/**
 * Public invitation site base URL for a subdomain slug.
 * Local: http://{slug}.localhost:3000
 * Prod:  https://{slug}.{ROOT_DOMAIN}
 */
export function getInvitationSiteUrl(subdomain: string): string {
  const slug = subdomain.trim().toLowerCase();
  const root = getRootHostname();
  const isLocal = root === "localhost" || root.endsWith(".localhost");
  const port = process.env.NEXT_PUBLIC_INVITE_PORT || "3000";

  if (isLocal) {
    return `http://${slug}.localhost:${port}`;
  }

  return `https://${slug}.${root}`;
}

/** Dedicated guest photo upload page (QR target). */
export function getGuestUploadUrl(subdomain: string): string {
  return `${getInvitationSiteUrl(subdomain)}/upload`;
}
