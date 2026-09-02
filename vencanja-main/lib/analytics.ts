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

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

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

/** Parse client_id from the standard `_ga` cookie (GA1.1.XXXXXXXX.YYYYYYYY). */
function getGaClientId(): string {
  if (typeof document === "undefined") {
    return `${Date.now()}.${Math.floor(Math.random() * 1e9)}`;
  }

  const match = document.cookie.match(/(?:^|;\s*)_ga=([^;]+)/);
  if (match?.[1]) {
    const parts = decodeURIComponent(match[1]).split(".");
    if (parts.length >= 4) {
      return `${parts[2]}.${parts[3]}`;
    }
  }

  return `${Date.now()}.${Math.floor(Math.random() * 1e9)}`;
}

/**
 * Direct hit to GA4 collect — same endpoint gtag uses.
 * Survives broken/missing window.gtag wrappers and still shows in Realtime.
 */
function sendCollectBeacon(source: LeadFormSource): void {
  if (!GA_ID || typeof window === "undefined") return;

  const params = new URLSearchParams({
    v: "2",
    tid: GA_ID,
    cid: getGaClientId(),
    en: "generate_lead",
    _s: "1",
    cu: "RSD",
    "epn.value": "1",
    "ep.form_source": source,
    // Required for some Realtime / engagement processing paths
    _et: "1",
  });

  const url = `https://www.google-analytics.com/g/collect?${params.toString()}`;

  // Prefer GET pixel — same path browsers use; sendBeacon alone is POST/empty-body.
  try {
    const img = new Image();
    img.src = url;
  } catch {
    /* ignore */
  }

  try {
    void fetch(url, { mode: "no-cors", keepalive: true, credentials: "omit" });
  } catch {
    /* ignore */
  }
}

/**
 * GA4 recommended lead event — mark as Key event in GA4, then import into Google Ads.
 * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead
 */
export function trackGenerateLead(source: LeadFormSource): void {
  if (typeof window === "undefined") return;

  const gtag = ensureGtag();
  if (gtag) {
    gtag("event", "generate_lead", {
      currency: "RSD",
      value: 1,
      form_source: source,
      transport_type: "beacon",
    });
  }

  // Always also hit collect directly — do not rely only on gtag queue.
  sendCollectBeacon(source);
}
