import type { Metadata } from "next";
import type {
  EventType,
  LegacyEventType,
  UniversalProjectConfig,
} from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { getInvitationSiteUrl } from "@/lib/invitationUrl";

/** Force WhatsApp-friendly JPG 1200×630 from a Cloudinary upload URL. */
function toOgImageUrl(cloudinaryOrUrl: string): string {
  const raw = cloudinaryOrUrl.trim();
  if (!raw) {
    return "https://res.cloudinary.com/dqqnpfbyf/image/upload/f_jpg,q_auto,w_1200,h_630,c_fill,g_auto/v1787226228/ulyana-tim-AbnCRgL2DNs-unsplash_yhvslu.jpg";
  }

  if (raw.includes("/upload/")) {
    // Strip prior transforms so we always get a clean OG crop.
    const withoutTransforms = raw.replace(
      /\/upload\/(?:[^/]+\/)?(v\d+\/)/,
      "/upload/$1",
    );
    return withoutTransforms.replace(
      "/upload/",
      "/upload/f_jpg,q_auto,w_1200,h_630,c_fill,g_auto/",
    );
  }

  return raw;
}

/**
 * One thematic preview image per event family (stock already on Cloudinary).
 * Prefer meta.ogImage on the invite when set.
 */
const OG_BY_EVENT: Record<EventType, string> = {
  wedding: toOgImageUrl(
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787226228/ulyana-tim-AbnCRgL2DNs-unsplash_yhvslu.jpg",
  ),
  comingOfAge: toOgImageUrl(
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787345364/fidel-fernando-249DzAuJTqQ-unsplash_n7asm2.jpg",
  ),
  kidsBirthday: toOgImageUrl(
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787343638/shayna-douglas-9ou4URp__0s-unsplash_helzyu.jpg",
  ),
  baptism: toOgImageUrl(
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787348109/2026-04-08-07-23-30-960x640_hmlazn.jpg",
  ),
};

export function resolveInvitationEventType(
  config: UniversalProjectConfig,
): EventType {
  const raw = config.eventType as LegacyEventType | undefined;
  if (raw === "birthday") return "comingOfAge";
  if (
    raw === "wedding" ||
    raw === "comingOfAge" ||
    raw === "kidsBirthday" ||
    raw === "baptism"
  ) {
    return raw;
  }

  const template = config.template || "";
  if (template.startsWith("krstenje")) return "baptism";
  if (template.startsWith("birthday18")) return "comingOfAge";
  if (template.startsWith("kids") || template === "rodjendan-01") {
    return "kidsBirthday";
  }
  return "wedding";
}

function eventKindLabel(eventType: EventType): string {
  switch (eventType) {
    case "wedding":
      return "venčanje";
    case "comingOfAge":
      return "18. rođendan";
    case "kidsBirthday":
      return "rođendan";
    case "baptism":
      return "krštenje";
    default:
      return "događaj";
  }
}

function invitationHeadline(eventType: EventType, names: string): string {
  const who = names.trim() || "Pozivnica";
  switch (eventType) {
    case "wedding":
      return who;
    case "comingOfAge":
      return `${who} — 18. rođendan`;
    case "kidsBirthday":
      return `${who} — rođendan`;
    case "baptism":
      return `${who} — krštenje`;
    default:
      return who;
  }
}

function invitationDescription(
  eventType: EventType,
  names: string,
  dateLabel: string,
): string {
  const who = names.trim() || "događaj";
  const kind = eventKindLabel(eventType);
  if (dateLabel) {
    return `Pozivnica za ${kind}: ${who}. Datum: ${dateLabel}.`;
  }
  return `Pozivnica za ${kind}: ${who}.`;
}

export function buildInvitationMetadata(params: {
  config: UniversalProjectConfig;
  subdomain: string;
  projectTitle?: string;
}): Metadata {
  const { config, subdomain, projectTitle } = params;
  const eventType = resolveInvitationEventType(config);
  const names =
    config.event?.names?.trim() ||
    projectTitle?.trim() ||
    config.meta?.title?.trim() ||
    "";
  const dateLabel = config.event?.date
    ? formatDate(config.event.date, "D_MMMM_YYYY")
    : "";

  const title = invitationHeadline(eventType, names);
  const description = invitationDescription(eventType, names, dateLabel);
  const pageUrl = getInvitationSiteUrl(subdomain);

  const customOg = config.meta?.ogImage?.trim();
  const imageUrl = customOg ? toOgImageUrl(customOg) : OG_BY_EVENT[eventType];
  const imageAlt = dateLabel ? `${title} · ${dateLabel}` : title;

  return {
    title: {
      absolute: title,
    },
    description,
    openGraph: {
      type: "website",
      locale: "sr_RS",
      url: pageUrl,
      siteName: "Vaš događaj",
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
