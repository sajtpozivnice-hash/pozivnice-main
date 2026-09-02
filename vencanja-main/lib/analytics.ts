type GtagFunction = (
  command: "event" | "config" | "js" | "set",
  targetOrEventName: string | Date,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFunction;
    dataLayer?: unknown[];
  }
}

export type LeadFormSource = "editor" | "contact";

/**
 * GA4 recommended lead event — mark as Key event in GA4, then import into Google Ads.
 * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead
 */
export function trackGenerateLead(source: LeadFormSource): void {
  if (typeof window === "undefined") return;

  const params: Record<string, unknown> = {
    currency: "RSD",
    value: 1,
    form_source: source,
  };

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", params);
    return;
  }

  window.dataLayer.push(["event", "generate_lead", params]);
}
