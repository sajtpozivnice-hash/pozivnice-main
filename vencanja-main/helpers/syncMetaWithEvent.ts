import type { EventConfig, MetaConfig, UniversalProjectConfig } from "@/types/config";

/**
 * Keep meta.title aligned with event.names.
 * Preserves catalog suffixes: "Ime & Ime — Formalna pozivnica".
 */
export function syncMetaWithEvent(
  meta: MetaConfig,
  event: EventConfig,
  previousNames?: string,
): MetaConfig {
  const names = (event.names || "").trim();
  if (!names) return meta;

  const prev = (previousNames || "").trim();
  let title = meta.title || "";

  const sep = title.includes(" — ")
    ? " — "
    : title.includes(" - ")
      ? " - "
      : null;

  if (sep) {
    const suffix = title.split(sep).slice(1).join(sep).trim();
    title = suffix ? `${names}${sep}${suffix}` : names;
  } else if (prev && title.includes(prev)) {
    title = title.split(prev).join(names);
  } else {
    title = names;
  }

  let description = meta.description;
  if (
    description &&
    prev &&
    prev !== names &&
    description.includes(prev)
  ) {
    description = description.split(prev).join(names);
  }

  return {
    ...meta,
    title,
    ...(description !== undefined ? { description } : {}),
  };
}

/** Sync meta from current event (e.g. on editor load / before save). */
export function withSyncedMeta(
  config: UniversalProjectConfig,
): UniversalProjectConfig {
  return {
    ...config,
    meta: syncMetaWithEvent(config.meta, config.event),
  };
}
