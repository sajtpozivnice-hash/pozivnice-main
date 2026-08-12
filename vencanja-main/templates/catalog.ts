import {
  CatalogCard,
  CatalogFilters,
  TEMPLATE_STYLE_LABELS,
  EVENT_TYPE_LABELS,
  TemplateStyle,
  eventTypeToTag,
} from "@/types/catalog";
import { EventType, TemplateKey, UniversalProjectConfig } from "@/types/config";
import { templates } from "./index";

const resolveCatalogImage = (config: UniversalProjectConfig): string => {
  const hero = config.sections.find((section) => section.type === "hero");
  if (hero?.type === "hero") {
    const background = hero.data.backgroundImage?.trim();
    if (background) return background;
    const image = hero.data.image?.trim();
    if (image) return image;
  }

  return config.theme.backgroundImage?.trim() || "";
};

export function getCatalogTemplates(): CatalogCard[] {
  return (Object.keys(templates) as TemplateKey[]).map((key) => {
    const pack = templates[key];
    const eventTypes = pack.eventTypes.length
      ? pack.eventTypes
      : (["wedding"] as EventType[]);
    const eventType: EventType = eventTypes[0] ?? "wedding";
    const meta = pack.catalog;

    return {
      id: key,
      title: meta.title,
      description: meta.description,
      eventType,
      eventTypes,
      tag: eventTypeToTag(eventType),
      style: meta.style,
      price: meta.price,
      imageLink: resolveCatalogImage(pack.defaultConfig),
      projectLink: `/editor/${key}`,
      featured: Boolean(meta.featured),
    };
  });
}

export function getFeaturedCatalogTemplates(limit = 4): CatalogCard[] {
  const all = getCatalogTemplates();
  const featured = all.filter((item) => item.featured);
  if (featured.length > 0) {
    return featured.slice(0, limit);
  }
  return all.slice(0, limit);
}

export function filterCatalogTemplates(
  items: CatalogCard[],
  filters: CatalogFilters,
): CatalogCard[] {
  const query = filters.search.trim().toLowerCase();

  return items.filter((item) => {
    if (
      filters.eventType &&
      !(item.eventTypes ?? [item.eventType]).includes(filters.eventType)
    ) {
      return false;
    }
    if (filters.style && item.style !== filters.style) {
      return false;
    }
    if (filters.price !== "" && item.price !== filters.price) {
      return false;
    }
    if (query) {
      const haystack = [
        item.title,
        item.description,
        item.tag,
        TEMPLATE_STYLE_LABELS[item.style],
        EVENT_TYPE_LABELS[item.eventType],
        String(item.price),
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(query)) {
        return false;
      }
    }
    return true;
  });
}

export function getCatalogStyleOptions(items: CatalogCard[]): TemplateStyle[] {
  return Array.from(new Set(items.map((item) => item.style)));
}

export function getCatalogPriceOptions(items: CatalogCard[]): number[] {
  return Array.from(new Set(items.map((item) => item.price))).sort(
    (a, b) => a - b,
  );
}
