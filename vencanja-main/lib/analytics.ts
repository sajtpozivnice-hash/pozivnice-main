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

function ensureGtag(): GtagFunction | null {
  if (typeof window === "undefined") return null;

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag === "function") {
    return window.gtag;
  }

  // gtag.js requires the Arguments object (not a plain array) on dataLayer.
  const gtag = function gtag(
    _command: "event" | "config" | "js" | "set",
    _targetOrEventName: string | Date,
    _params?: Record<string, unknown>,
  ) {
    window.dataLayer!.push(arguments as unknown as IArguments);
  } as GtagFunction;

  window.gtag = gtag;
  return gtag;
}

/**
 * GA4 recommended lead event — mark as Key event in GA4, then import into Google Ads.
 * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead
 */
export function trackGenerateLead(source: LeadFormSource): void {
  const gtag = ensureGtag();
  if (!gtag) return;

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  const params: Record<string, unknown> = {
    currency: "RSD",
    value: 1,
    form_source: source,
  };
  if (gaId) {
    params.send_to = gaId;
  }

  gtag("event", "generate_lead", params);
}
