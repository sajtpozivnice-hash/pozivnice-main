import { EventType, LegacyEventType, UniversalProjectConfig } from "@/types/config";

export type { EventType };

export type EventCopy = {
  productLabel: string;
  fallbackTitle: string;
  overviewLabel: string;
  budgetBlurb: string;
  budgetEmpty: string;
  plannerBlurb: string;
  plannerEmptyHint: string;
  plannerTaskHint: string;
  countdownHint: string;
  locationPlaceholder: string;
};

const COPY: Record<EventType, EventCopy> = {
  wedding: {
    productLabel: "Dashboard",
    fallbackTitle: "Vaše venčanje",
    overviewLabel: "Pregled venčanja",
    budgetBlurb: "Pratite kompletan budžet venčanja, uplate i dokumenta.",
    budgetEmpty:
      "Dodajte prvi trošak da biste počeli da pratite budžet venčanja.",
    plannerBlurb: "Organizujte sve obaveze do dana venčanja na jednom mestu.",
    plannerEmptyHint: "Organizujte obaveze do dana venčanja i pratite napredak.",
    plannerTaskHint: "Dodajte obavezu za pripremu venčanja.",
    countdownHint: "Uredite tekst iznad brojača do dana venčanja.",
    locationPlaceholder: "npr. Crkveno venčanje",
  },
  comingOfAge: {
    productLabel: "Dashboard",
    fallbackTitle: "Vaše punoletstvo",
    overviewLabel: "Pregled punoletstva",
    budgetBlurb: "Pratite kompletan budžet proslave, uplate i dokumenta.",
    budgetEmpty:
      "Dodajte prvi trošak da biste počeli da pratite budžet proslave.",
    plannerBlurb: "Organizujte sve obaveze do noći punoletstva na jednom mestu.",
    plannerEmptyHint:
      "Organizujte obaveze do noći punoletstva i pratite napredak.",
    plannerTaskHint: "Dodajte obavezu za pripremu proslave.",
    countdownHint: "Uredite tekst iznad brojača do noći proslave.",
    locationPlaceholder: "npr. Club / restoran",
  },
  kidsBirthday: {
    productLabel: "Dashboard",
    fallbackTitle: "Dečiji rođendan",
    overviewLabel: "Pregled rođendana",
    budgetBlurb: "Pratite kompletan budžet proslave, uplate i dokumenta.",
    budgetEmpty:
      "Dodajte prvi trošak da biste počeli da pratite budžet proslave.",
    plannerBlurb: "Organizujte sve obaveze do dana proslave na jednom mestu.",
    plannerEmptyHint: "Organizujte obaveze do dana proslave i pratite napredak.",
    plannerTaskHint: "Dodajte obavezu za pripremu proslave.",
    countdownHint: "Uredite tekst iznad brojača do dana proslave.",
    locationPlaceholder: "npr. Playroom / bašta",
  },
  baptism: {
    productLabel: "Dashboard",
    fallbackTitle: "Vaše krštenje",
    overviewLabel: "Pregled krštenja",
    budgetBlurb: "Pratite kompletan budžet krštenja, uplate i dokumenta.",
    budgetEmpty:
      "Dodajte prvi trošak da biste počeli da pratite budžet krštenja.",
    plannerBlurb: "Organizujte sve obaveze do dana krštenja na jednom mestu.",
    plannerEmptyHint: "Organizujte obaveze do dana krštenja i pratite napredak.",
    plannerTaskHint: "Dodajte obavezu za pripremu krštenja.",
    countdownHint: "Uredite tekst iznad brojača do dana krštenja.",
    locationPlaceholder: "npr. Crkva / svečani ručak",
  },
};

const EVENT_TYPES: EventType[] = [
  "wedding",
  "comingOfAge",
  "kidsBirthday",
  "baptism",
];

const inferFromTemplate = (template?: string): EventType | null => {
  if (typeof template !== "string") return null;
  if (template.startsWith("vencanje")) return "wedding";
  if (template.startsWith("birthday") || template.includes("punoletstvo")) {
    return "comingOfAge";
  }
  if (template.startsWith("rodjendan") || template.includes("kids")) {
    return "kidsBirthday";
  }
  if (template.startsWith("krstenje") || template.startsWith("baptism")) {
    return "baptism";
  }
  return null;
};

/**
 * Normalize stored/legacy eventType values.
 * Legacy `"birthday"` without a template hint maps to kidsBirthday.
 */
export const normalizeEventType = (
  value?: string | null,
  template?: string | null,
): EventType | null => {
  if (!value) return null;
  if (value === "birthday") {
    return inferFromTemplate(template ?? undefined) ?? "kidsBirthday";
  }
  if ((EVENT_TYPES as string[]).includes(value)) {
    return value as EventType;
  }
  return null;
};

export const resolveEventType = (
  config?: Pick<UniversalProjectConfig, "eventType" | "template"> | null,
): EventType => {
  const normalized = normalizeEventType(
    config?.eventType as LegacyEventType | undefined,
    config?.template,
  );
  if (normalized) return normalized;
  return inferFromTemplate(config?.template) ?? "wedding";
};

export const getEventCopy = (
  config?: Pick<UniversalProjectConfig, "eventType" | "template"> | null,
): EventCopy => COPY[resolveEventType(config)];

export const ALL_EVENT_TYPES = EVENT_TYPES;
