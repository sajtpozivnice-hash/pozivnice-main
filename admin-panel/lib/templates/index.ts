import fs from "fs";
import path from "path";
import type {
  EventType,
  TemplateCatalogItem,
  TemplateKey,
  UniversalProjectConfig,
} from "@/types/project";

const seedsDir = path.join(process.cwd(), "lib/templates/seeds");

export function getTemplateCatalog(): TemplateCatalogItem[] {
  const raw = fs.readFileSync(path.join(seedsDir, "catalog.json"), "utf8");
  return JSON.parse(raw) as TemplateCatalogItem[];
}

export function getDefaultConfigForTemplate(
  templateKey: string,
): UniversalProjectConfig | null {
  const filePath = path.join(seedsDir, `${templateKey}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as UniversalProjectConfig;
}

export function getTemplatesForEventType(
  eventType: EventType,
): TemplateCatalogItem[] {
  return getTemplateCatalog().filter((t) => t.eventTypes.includes(eventType));
}

export function isTemplateKey(value: string): value is TemplateKey {
  return getTemplateCatalog().some((t) => t.key === value);
}

export function buildInitialConfig(params: {
  template: TemplateKey;
  eventType: EventType;
  title: string;
  eventDate?: string;
}): UniversalProjectConfig {
  const seed = getDefaultConfigForTemplate(params.template);
  if (!seed) {
    throw new Error(`Nema default config za template: ${params.template}`);
  }

  const eventDate = params.eventDate || seed.event?.date || "";
  let rsvpDate = seed.event?.rsvpDate || "";
  if (eventDate) {
    const d = new Date(eventDate);
    if (!Number.isNaN(d.getTime())) {
      d.setMonth(d.getMonth() - 1);
      rsvpDate = d.toISOString().slice(0, 10);
    }
  }

  return {
    ...seed,
    template: params.template,
    eventType: params.eventType,
    meta: {
      ...seed.meta,
      title: params.title || seed.meta?.title || "Pozivnica",
    },
    event: {
      ...seed.event,
      date: eventDate,
      rsvpDate,
      names: seed.event?.names || params.title,
    },
  };
}
