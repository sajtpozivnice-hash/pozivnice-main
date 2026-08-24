export type EventType =
  | "wedding"
  | "comingOfAge"
  | "kidsBirthday"
  | "baptism";

/** Legacy values that may still exist in stored config_json. */
export type LegacyEventType = EventType | "birthday";

export type TemplateKey =
  | "vencanje-background"
  | "vencanje-dusk"
  | "vencanje-ink"
  | "vencanje-sage"
  | "vencanje-terra"
  | "vencanje-linen"
  | "vencanje-navy"
  | "vencanje-vanguard"
  | "vencanje-deco"
  | "vencanje-boho"
  | "vencanje-opal"
  | "vencanje-atelier"
  | "rodjendan-01"
  | "kids-safari"
  | "kids-space"
  | "kids-candy"
  | "kids-cartoon"
  | "kids-honey"
  | "birthday18"
  | "birthday18-bright"
  | "birthday18-editorial"
  | "birthday18-night"
  | "birthday18-ink"
  | "krstenje-classic"
  | "krstenje-garden"
  | "krstenje-candle";

export type UniversalProjectConfig = {
  template: TemplateKey;
  eventType?: EventType;
  meta: {
    title: string;
    description?: string;
    language?: string;
    ogImage?: string;
  };
  event: {
    date: string;
    rsvpDate: string;
    names: string;
    timezone?: string;
    location?: {
      name?: string;
      address?: string;
      lat?: number;
      lng?: number;
    };
  };
  theme: Record<string, unknown>;
  sections: unknown[];
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  auth_user_id?: string | null;
  created_at?: string;
  updated_at?: string | null;
};

export type Project = {
  id: string;
  client_id: string;
  client_name: string | null;
  title: string;
  subdomain: string;
  published: boolean;
  paid?: boolean;
  config_json: UniversalProjectConfig;
  created_at: string;
  updated_at: string | null;
};

export type ProjectWithClient = Project & {
  clients?: Pick<Client, "id" | "name" | "email" | "phone"> | null;
};

export type ProjectListItem = {
  id: string;
  title: string;
  subdomain: string;
  published: boolean;
  created_at: string;
  updated_at: string | null;
  client_id: string;
  client_name: string;
  client_email: string | null;
  template: string;
  event_type: EventType | "unknown";
  event_date: string | null;
};

export type ProjectSortField =
  | "created_at"
  | "updated_at"
  | "title"
  | "subdomain"
  | "published";

export type ProjectFilters = {
  search?: string;
  eventType?: EventType | "all";
  template?: string | "all";
  published?: "all" | "true" | "false";
  clientId?: string | "all";
  sort?: ProjectSortField;
  order?: "asc" | "desc";
  page?: number;
  pageSize?: number;
};

export type ProjectsListResult = {
  items: ProjectListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type CreateProjectInput = {
  client_id: string;
  title: string;
  subdomain: string;
  template: TemplateKey;
  eventType: EventType;
  eventDate?: string;
  published?: boolean;
  /** Pasted invite-config.json from editor/email. If set, used instead of template seed. */
  config_json?: UniversalProjectConfig;
};

export type UpdateProjectInput = {
  id: string;
  client_id?: string;
  title?: string;
  subdomain?: string;
  template?: TemplateKey;
  eventType?: EventType;
  eventDate?: string;
  published?: boolean;
  /** When true, replace config_json with template default (destructive). */
  resetConfig?: boolean;
  /** Replace entire config_json (e.g. pasted from email). */
  config_json?: UniversalProjectConfig;
};

export type TemplateCatalogItem = {
  key: TemplateKey;
  title: string;
  description: string;
  eventTypes: EventType[];
  style: string;
  imageLink?: string;
};

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  wedding: "Venčanje",
  comingOfAge: "Punoletstvo",
  kidsBirthday: "Dečiji rođendan",
  baptism: "Krštenje",
};

const EVENT_TYPES: EventType[] = [
  "wedding",
  "comingOfAge",
  "kidsBirthday",
  "baptism",
];

const inferEventTypeFromTemplate = (template?: string): EventType | null => {
  if (!template) return null;
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

/** Normalize stored/legacy eventType for admin list/forms. */
export function normalizeEventType(
  value?: string | null,
  template?: string | null,
): EventType | "unknown" {
  if (!value) {
    return inferEventTypeFromTemplate(template ?? undefined) ?? "unknown";
  }
  if (value === "birthday") {
    return inferEventTypeFromTemplate(template ?? undefined) ?? "kidsBirthday";
  }
  if ((EVENT_TYPES as string[]).includes(value)) {
    return value as EventType;
  }
  return inferEventTypeFromTemplate(template ?? undefined) ?? "unknown";
}
