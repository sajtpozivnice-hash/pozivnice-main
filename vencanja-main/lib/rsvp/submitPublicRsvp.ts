import type { PublicRsvpPayload } from "@/components/dashboard/types";

export async function submitPublicRsvp(
  payload: PublicRsvpPayload,
): Promise<void> {
  const response = await fetch("/api/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as {
    error?: string;
    success?: boolean;
    contactId?: string;
  } | null;

  if (!response.ok || !data?.success || !data.contactId) {
    throw new Error(data?.error || "RSVP nije sačuvan.");
  }
}
