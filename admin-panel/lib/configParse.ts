import type {
  EventType,
  TemplateKey,
  UniversalProjectConfig,
} from "@/types/project";

const EVENT_TYPES: EventType[] = ["wedding", "birthday", "baptism"];

export function parseConfigJson(
  raw: string,
): { ok: true; config: UniversalProjectConfig } | { ok: false; error: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, error: "Config JSON je prazan" };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return { ok: false, error: "Neispravan JSON — proverite invite-config.json" };
  }

  return validateConfigObject(parsed);
}

export function validateConfigObject(
  value: unknown,
): { ok: true; config: UniversalProjectConfig } | { ok: false; error: string } {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ok: false, error: "Config mora biti JSON objekat" };
  }

  const cfg = value as Record<string, unknown>;

  if (typeof cfg.template !== "string" || !cfg.template.trim()) {
    return { ok: false, error: "Config mora imati polje template" };
  }

  if (!cfg.meta || typeof cfg.meta !== "object") {
    return { ok: false, error: "Config mora imati polje meta" };
  }

  if (!cfg.event || typeof cfg.event !== "object") {
    return { ok: false, error: "Config mora imati polje event" };
  }

  if (!Array.isArray(cfg.sections)) {
    return { ok: false, error: "Config mora imati polje sections (niz)" };
  }

  return { ok: true, config: value as UniversalProjectConfig };
}

export function extractConfigHints(config: UniversalProjectConfig): {
  template: TemplateKey | "";
  eventType: EventType;
  title: string;
  eventDate: string;
} {
  const eventType =
    config.eventType && EVENT_TYPES.includes(config.eventType)
      ? config.eventType
      : "wedding";

  return {
    template: (config.template || "") as TemplateKey | "",
    eventType,
    title: config.meta?.title || config.event?.names || "",
    eventDate: config.event?.date || "",
  };
}

/** Apply admin form overrides onto pasted editor config before save. */
export function applyFormOverridesToConfig(
  config: UniversalProjectConfig,
  overrides: {
    title?: string;
    eventDate?: string;
    eventType?: EventType;
    template?: TemplateKey;
  },
): UniversalProjectConfig {
  const next: UniversalProjectConfig = {
    ...config,
    template: overrides.template || config.template,
    eventType: overrides.eventType || config.eventType,
    meta: {
      ...config.meta,
      title: overrides.title?.trim() || config.meta?.title || "Pozivnica",
    },
    event: {
      ...config.event,
      date: overrides.eventDate || config.event?.date || "",
      names: config.event?.names || overrides.title?.trim() || "",
      rsvpDate: config.event?.rsvpDate || "",
    },
  };

  return next;
}
