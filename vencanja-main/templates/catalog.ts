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

/** Newest premium wedding packs — shown first on /pozivnice. */
const CATALOG_PRIORITY: TemplateKey[] = [
  "vencanje-linen",
  "vencanje-atelier",
  "vencanje-navy",
  "vencanje-opal",
  "vencanje-sage",
  "vencanje-ink",
  "vencanje-dusk",
  "vencanje-terra",
];

const resolveCatalogImage = (
  config: UniversalProjectConfig,
  catalogImageLink?: string,
): string => {
  const fromCatalog = catalogImageLink?.trim();
  if (fromCatalog) return fromCatalog;

  const hero = config.sections.find((section) => section.type === "hero");
  if (hero?.type === "hero") {
    const background = hero.data.backgroundImage?.trim();
    if (background) return background;
    const image = hero.data.image?.trim();
    if (image) return image;
  }

  const quote = config.sections.find((section) => section.type === "loveQuote");
  if (quote?.type === "loveQuote") {
    const quoteImage = quote.data.imageUrl?.trim();
    if (quoteImage) return quoteImage;
  }

  return config.theme.backgroundImage?.trim() || "";
};

export function getCatalogTemplates(): CatalogCard[] {
  const cards = (Object.keys(templates) as TemplateKey[]).map((key) => {
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
      imageLink: resolveCatalogImage(pack.defaultConfig, meta.imageLink),
      projectLink: `/editor/${key}`,
      featured: Boolean(meta.featured),
    };
  });

  return cards.sort((a, b) => {
    const ai = CATALOG_PRIORITY.indexOf(a.id as TemplateKey);
    const bi = CATALOG_PRIORITY.indexOf(b.id as TemplateKey);
    const ap = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
    const bp = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
    if (ap !== bp) return ap - bp;
    return 0;
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
