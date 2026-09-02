type LeadEventParams = {
  event_category: string;
  event_label: string;
  form_source: string;
};

type GtagFunction = (
  command: "event" | "config" | "js" | "set",
  targetOrEventName: string | Date,
  params?: LeadEventParams | Record<string, unknown>,
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
 * No-ops when analytics is not loaded.
 */
export function trackGenerateLead(source: LeadFormSource): void {
  if (typeof window === "undefined") return;

  const params: LeadEventParams = {
    event_category: "lead",
    event_label: source,
    form_source: source,
  };

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", params);
    return;
  }

  // Fallback if gtag helper is not on window yet
  window.dataLayer.push({
    event: "generate_lead",
    ...params,
  });
}
