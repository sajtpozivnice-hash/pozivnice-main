import { getRootHostname } from "@/lib/domain";

/** Prod: https://{slug}.vasdogadjaj.com — subdomain only, no www, no /i/ */
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

export function getGuestUploadUrl(subdomain: string): string {
  return `${getInvitationSiteUrl(subdomain)}/upload`;
}
