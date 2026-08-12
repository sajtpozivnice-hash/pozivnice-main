import { EventType } from "./config";
import { Tag } from "./general";

export type TemplateStyle =
  | "classic"
  | "modern"
  | "premium"
  | "cinematic"
  | "playful"
  | "editorial";

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
  /** Primary category for tag / display. */
  eventType: EventType;
  /** All categories this template can appear under (e.g. baptism + kidsBirthday). */
  eventTypes: EventType[];
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
  editorial: "Editorial",
};

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  wedding: "Venčanja",
  comingOfAge: "Punoletstva",
  kidsBirthday: "Dečiji rođendani",
  baptism: "Krštenja",
};

export const eventTypeToTag = (eventType: EventType): Tag => {
  switch (eventType) {
    case "wedding":
      return Tag.WEDDING;
    case "comingOfAge":
      return Tag.COMING_OF_AGE;
    case "kidsBirthday":
      return Tag.KIDS_BIRTHDAY;
    case "baptism":
      return Tag.BAPTISM;
  }
};
