import { EventConfig, ThemeConfig } from "./config";

export type BaseSectionConfig<T, Type extends string> = {
  id: string;
  type: Type;
  visible: boolean;
  order: number;
  data: T;
  name: string;
};

export type FieldType = "text" | "textarea" | "image" | "repeater";

export type FieldSchema<T> =
  | {
      key: keyof T;
      label: string;
      type: "text" | "textarea" | "image";
    }
  | {
      key: keyof T;
      label: string;
      type: "repeater";
      itemSchema: FieldSchema<any>[];
    };

export type SectionSchema<T> = {
  fields: FieldSchema<T>[];
};

export type HeroSection = BaseSectionConfig<
  {
    title: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: string;
    image?: string;
    /** e.g. age badge — "7 godina" */
    badge?: string;
    ctaText?: string;
    ctaHref?: string;
  },
  "hero"
>;

export type CountdownSection = BaseSectionConfig<
  {
    title?: string;
    description?: string;
    imageUrl?: string;
  },
  "countdown"
>;

export type CalendarSection = BaseSectionConfig<
  {
    title?: string;
    description?: string;
    imageUrl?: string;
  },
  "calendar"
>;

export type ScheduleSection = BaseSectionConfig<
  {
    title: string;
    subtitle?: string;
    imageUrl?: string;
    items?: {
      id: string;
      time: string;
      title: string;
      description?: string;
    }[];
  },
  "schedule"
>;

export type CardItem = {
  id: number;
  title?: string;
  subtitle?: string;
  location?: string;
  text?: string;
  time?: string;
  icon?: string;
  image?: string;
  quote?: string;
};

export type LocationsSection = BaseSectionConfig<
  {
    title: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    cards?: CardItem[];
  },
  "locations"
>;

export type OurStorySection = BaseSectionConfig<
  {
    title: string;
    subtitle?: string;
    overline?: string;
    text?: string;
    image?: string;
    cards?: CardItem[];
  },
  "ourStory"
>;

export type OurGallerySection = BaseSectionConfig<
  {
    title: string;
    description: string;
    images: {
      url: string;
    }[];
  },
  "ourGallery"
>;

export type RSVPSection = BaseSectionConfig<
  {
    title: string;
    description?: string;
    buttonText?: string;
    imageUrl?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
  },
  "rsvp"
>;

export type FeatureCardItem = {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  accent?: string;
};

/** Flexible card grid — gifts, dress code, parent info, activities, etc. */
export type FeatureCardsSection = BaseSectionConfig<
  {
    title: string;
    subtitle?: string;
    description?: string;
    cards?: FeatureCardItem[];
  },
  "featureCards"
>;

export type LoveQuoteSection = BaseSectionConfig<
  {
    title: string;
    description?: string;
    imageUrl?: string;
  },
  "loveQuote"
>;

export type UploadImagesSection = BaseSectionConfig<
  {
    title?: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
  },
  "uploadImagesSection"
>;

export type InviteTextSection = BaseSectionConfig<
  {
    description?: string;
    imageUrl?: string;
  },
  "inviteText"
>;

export type FooterSection = BaseSectionConfig<
  {
    title: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
  },
  "footer"
>;

export type SectionComponentProps = {
  section: SectionConfig;
  onChange?: (sectionId: string, newData: any) => void;
};

export type SectionRendererMap = Partial<{
  [K in SectionConfig["type"]]: React.ComponentType<{
    section: Extract<SectionConfig, { type: K }>;
    event: EventConfig;
    theme: ThemeConfig;
  }>;
}>;

export type LocationsData = LocationsSection["data"];
export type CalendarData = CalendarSection["data"];
export type CountdownData = CountdownSection["data"];
export type FooterData = FooterSection["data"];
export type HeroData = HeroSection["data"];
export type LoveQuoteData = LoveQuoteSection["data"];
export type OurStoryData = OurStorySection["data"];
export type UploadImageData = UploadImagesSection["data"];
export type InviteTextSectionData = InviteTextSection["data"];

export type SectionConfig =
  | HeroSection
  | CountdownSection
  | CalendarSection
  | OurStorySection
  | ScheduleSection
  | LocationsSection
  | OurGallerySection
  | LoveQuoteSection
  | UploadImagesSection
  | RSVPSection
  | InviteTextSection
  | FooterSection
  | FeatureCardsSection;

export type SectionType = SectionConfig["type"];
