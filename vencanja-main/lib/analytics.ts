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

/** Parse client_id from `_ga` (GA1.1.XXXXXXXX.YYYYYYYY). */
function getGaClientId(): string {
  const match = document.cookie.match(/(?:^|;\s*)_ga=([^;]+)/);
  if (match?.[1]) {
    const parts = decodeURIComponent(match[1]).split(".");
    if (parts.length >= 4) return `${parts[2]}.${parts[3]}`;
  }
  return `${Date.now()}.${Math.floor(Math.random() * 1e9)}`;
}

/**
 * Session id from `_ga_<MEASUREMENT>` cookie (GS1 / GS2 formats).
 * Without sid, custom collect hits often never join Realtime sessions.
 */
function getGaSessionId(): string {
  if (!GA_ID) return String(Math.floor(Date.now() / 1000));

  const suffix = GA_ID.replace(/^G-/, "");
  const re = new RegExp(`(?:^|;\\s*)_ga_${suffix}=([^;]+)`);
  const match = document.cookie.match(re);
  if (!match?.[1]) return String(Math.floor(Date.now() / 1000));

  const raw = decodeURIComponent(match[1]);

  // GS2.1.sSESSION$o... or GS1.1.SESSION.timestamp...
  const gs2 = raw.match(/\.s(\d+)/);
  if (gs2?.[1]) return gs2[1];

  const parts = raw.split(".");
  if (parts.length >= 3 && /^\d+$/.test(parts[2])) return parts[2];

  return String(Math.floor(Date.now() / 1000));
}

/**
 * Direct hit to GA4 collect — must include session + page fields or Realtime drops it.
 */
function sendCollectBeacon(source: LeadFormSource): void {
  if (!GA_ID || typeof window === "undefined") return;

  const params = new URLSearchParams({
    v: "2",
    tid: GA_ID,
    cid: getGaClientId(),
    sid: getGaSessionId(),
    en: "generate_lead",
    _s: "1",
    seg: "1",
    sct: "1",
    dl: window.location.href,
    dr: document.referrer || "",
    dt: document.title || "",
    cu: "RSD",
    "epn.value": "1",
    "ep.form_source": source,
    _et: "1",
    _p: String(Date.now()),
  });

  const url = `https://www.google-analytics.com/g/collect?${params.toString()}`;

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

  sendCollectBeacon(source);
}
