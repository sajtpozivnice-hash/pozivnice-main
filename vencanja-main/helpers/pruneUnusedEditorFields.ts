import { UniversalProjectConfig } from "@/types/config";

/**
 * Keys that appear in shared editor schemas but are unused by a template's
 * section renderer. Removing them hides ghost controls in the sidebar.
 */
const OMIT_SECTION_KEYS: Record<string, Record<string, string[]>> = {
  "birthday18-editorial": {
    hero: ["image"],
    locations: ["imageUrl"],
    schedule: ["imageUrl"],
    rsvp: ["imageUrl"],
    loveQuote: ["imageUrl"],
    uploadImagesSection: ["imageUrl"],
  },
  "birthday18-bright": {
    hero: ["image"],
    inviteText: ["imageUrl"],
    countdown: ["imageUrl"],
    locations: ["imageUrl", "subtitle"],
    schedule: ["imageUrl"],
    rsvp: ["imageUrl"],
    loveQuote: ["imageUrl"],
    uploadImagesSection: ["imageUrl"],
  },
  "birthday18-night": {
    hero: ["image"],
    inviteText: ["imageUrl"],
    countdown: ["imageUrl"],
    locations: ["imageUrl"],
    schedule: ["imageUrl"],
    rsvp: ["imageUrl"],
    loveQuote: ["imageUrl"],
    uploadImagesSection: ["imageUrl"],
  },
  vencanje: {
    hero: ["title"],
  },
};

const OMIT_LOCATION_CARD_KEYS: Record<string, string[]> = {
  "birthday18-editorial": ["text", "icon"],
  "birthday18-bright": ["subtitle", "icon"],
  "birthday18-night": ["icon"],
  birthday18: ["icon", "subtitle"],
  "rodjendan-01": ["icon"],
};

function omitKeys<T extends Record<string, unknown>>(
  data: T,
  keys: string[],
): T {
  if (!keys.length) return data;
  const next = { ...data };
  for (const key of keys) {
    delete next[key];
  }
  return next;
}

/** Strip unused section/card fields so the editor sidebar matches the live view. */
export function pruneUnusedEditorFields(
  config: UniversalProjectConfig,
): UniversalProjectConfig {
  const template = config.template;
  const sectionOmits = OMIT_SECTION_KEYS[template];
  const cardOmits = OMIT_LOCATION_CARD_KEYS[template] ?? [];

  if (!sectionOmits && !cardOmits.length) {
    return config;
  }

  return {
    ...config,
    sections: config.sections.map((section) => {
      const data = { ...(section.data as Record<string, unknown>) };
      const omit = sectionOmits?.[section.type] ?? [];
      const prunedData = omitKeys(data, omit);

      if (
        section.type === "locations" &&
        Array.isArray(prunedData.cards) &&
        cardOmits.length
      ) {
        prunedData.cards = (prunedData.cards as Record<string, unknown>[]).map(
          (card) => omitKeys(card, cardOmits),
        );
      }

      return {
        ...section,
        data: prunedData,
      };
    }) as UniversalProjectConfig["sections"],
  };
}
