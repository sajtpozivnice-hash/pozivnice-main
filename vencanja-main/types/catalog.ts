import { EventType } from "./config";
import { Tag } from "./general";

export type TemplateStyle =
  | "classic"
  | "modern"
  | "premium"
  | "cinematic"
  | "playful";

export type TemplateCatalogMeta = {
  title: string;
  description: string;
  style: TemplateStyle;
  price: number;
  featured?: boolean;
};

export type CatalogCard = {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  tag: Tag;
  style: TemplateStyle;
  price: number;
  imageLink: string;
  projectLink: string;
  featured: boolean;
};

export type CatalogFilters = {
  eventType: EventType | "";
  style: TemplateStyle | "";
  price: number | "";
  search: string;
};

export const TEMPLATE_STYLE_LABELS: Record<TemplateStyle, string> = {
  classic: "Klasičan",
  modern: "Moderan",
  premium: "Premium",
  cinematic: "Filmski",
  playful: "Razigran",
};

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  wedding: "Venčanja",
  birthday: "Rođendani",
  baptism: "Krštenja",
};

export const eventTypeToTag = (eventType: EventType): Tag => {
  switch (eventType) {
    case "wedding":
      return Tag.WEDDING;
    case "birthday":
      return Tag.BIRTHDAY;
    case "baptism":
      return Tag.BAPTISM;
  }
};
