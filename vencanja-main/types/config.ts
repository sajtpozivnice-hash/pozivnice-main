import { SectionConfig } from "./sections";
import { FontKey } from "@/helpers/fontMap";

/** Keep in sync when registering new packs in templates/index.ts */
export type TemplateKey =
  | "vencanje"
  | "vencanje3"
  | "vencanje4"
  | "vencanje-premium"
  | "vencanje-cinematic"
  | "vencanje-background"
  | "rodjendan-01";

export type MetaConfig = {
  title: string;
  description?: string;
  language?: string;
  ogImage?: string;
};

export type EventConfig = {
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

export type ThemeConfig = {
  fonts?: {
    primary?: FontKey;
    secondary?: FontKey;
  };
  colors?: {
    base?: {
      primary?: {
        name: string;
        value: string;
      };
      secondary?: {
        name: string;
        value: string;
      };
      ternary?: {
        name: string;
        value: string;
      };
    };
    background?: {
      name: string;
      value: string;
    };
    backgroundSecondary?: {
      name: string;
      value: string;
    };
  };
  backgroundImage?: string;
};

export type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "image" | "number";
  condition?: (data: any) => boolean;
};

/** Optional — missing value is treated as "wedding" for backwards compatibility. */
export type EventType = "wedding" | "birthday" | "baptism";

export type UniversalProjectConfig = {
  template: TemplateKey;
  /** Discriminator for copy, seeds and future template packs. Additive; optional. */
  eventType?: EventType;
  meta: MetaConfig;
  event: EventConfig;
  theme: ThemeConfig;
  sections: SectionConfig[];
};
