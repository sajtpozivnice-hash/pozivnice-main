export type EventType = "wedding" | "birthday" | "baptism";

export type TemplateKey =
  | "vencanje"
  | "vencanje3"
  | "vencanje4"
  | "vencanje-premium"
  | "vencanje-cinematic"
  | "vencanje-background"
  | "rodjendan-01";

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
  paid?: boolean;
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
};

export type TemplateCatalogItem = {
  key: TemplateKey;
  title: string;
  description: string;
  eventTypes: EventType[];
  style: string;
};

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  wedding: "Venčanje",
  birthday: "Rođendan",
  baptism: "Krštenje",
};
