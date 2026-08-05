import { EventType, UniversalProjectConfig } from "@/types/config";

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
  birthday: {
    productLabel: "Dashboard",
    fallbackTitle: "Vaš rođendan",
    overviewLabel: "Pregled rođendana",
    budgetBlurb: "Pratite kompletan budžet proslave, uplate i dokumenta.",
    budgetEmpty:
      "Dodajte prvi trošak da biste počeli da pratite budžet proslave.",
    plannerBlurb: "Organizujte sve obaveze do dana proslave na jednom mestu.",
    plannerEmptyHint: "Organizujte obaveze do dana proslave i pratite napredak.",
    plannerTaskHint: "Dodajte obavezu za pripremu proslave.",
    countdownHint: "Uredite tekst iznad brojača do dana proslave.",
    locationPlaceholder: "npr. Restoran / kućna proslava",
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

export const resolveEventType = (
  config?: Pick<UniversalProjectConfig, "eventType" | "template"> | null,
): EventType => {
  if (config?.eventType) return config.eventType;

  const template = config?.template;
  if (typeof template === "string") {
    if (template.startsWith("vencanje")) return "wedding";
    if (
      template.startsWith("rodjendan") ||
      template.startsWith("birthday")
    ) {
      return "birthday";
    }
    if (
      template.startsWith("krstenje") ||
      template.startsWith("baptism")
    ) {
      return "baptism";
    }
  }

  return "wedding";
};

export const getEventCopy = (
  config?: Pick<UniversalProjectConfig, "eventType" | "template"> | null,
): EventCopy => COPY[resolveEventType(config)];
