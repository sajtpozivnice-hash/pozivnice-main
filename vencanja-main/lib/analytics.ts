type GtagFunction = (
  command: "event" | "config" | "js" | "set",
  ...args: unknown[]
) => void;

declare global {
  interface Window {
    gtag?: GtagFunction;
    dataLayer?: unknown[];
  }
}

export type LeadFormSource = "editor" | "contact";

/**
 * GA4 recommended event for lead forms — import into Google Ads as a conversion.
 * No-ops when gtag is missing (no measurement ID / blocked).
 */
export function trackGenerateLead(source: LeadFormSource): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "generate_lead", {
    event_category: "lead",
    event_label: source,
    form_source: source,
  });
}
