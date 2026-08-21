import { SectionConfig } from "./sections";
import { FontKey } from "@/helpers/fontMap";

/** Keep in sync when registering new packs in templates/index.ts */
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
  | "kids-pastel"
  | "kids-safari"
  | "kids-space"
  | "kids-candy"
  | "kids-cartoon"
  | "kids-honey"
  | "birthday18"
  | "birthday18-bright"
  | "birthday18-editorial"
  | "birthday18-night"
  | "birthday18-gold"
  | "birthday18-ink"
  | "birthday18-coast"
  | "birthday18-atelier"
  | "krstenje-classic"
  | "krstenje-soft"
  | "krstenje-garden"
  | "krstenje-modern"
  | "krstenje-candle";

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
  /** Age under this value is suggested as child (owner can override per guest). */
  childAgeLimit?: number;
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
export type EventType =
  | "wedding"
  | "comingOfAge"
  | "kidsBirthday"
  | "baptism";

/** Legacy values that may still exist in stored config_json. */
export type LegacyEventType = EventType | "birthday";

export type UniversalProjectConfig = {
  template: TemplateKey;
  /** Discriminator for copy, seeds and future template packs. Additive; optional. */
  eventType?: EventType;
  meta: MetaConfig;
  event: EventConfig;
  theme: ThemeConfig;
  sections: SectionConfig[];
};
