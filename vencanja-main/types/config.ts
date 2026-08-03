import { templates } from "@/templates";
import { SectionConfig } from "./sections";
import { FontKey } from "@/helpers/fontMap";

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

export type UniversalProjectConfig = {
  template: keyof typeof templates;
  meta: MetaConfig;
  event: EventConfig;
  theme: ThemeConfig;
  sections: SectionConfig[];
};
