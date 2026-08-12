import { SectionRendererMap } from "@/types/sections";
import Hero from "./sections/Hero";
import InviteText from "./sections/InviteText";
import Countdown from "./sections/Countdown";
import Locations from "./sections/Locations";
import Schedule from "./sections/Schedule";
import FeatureCards from "./sections/FeatureCards";
import RSVP from "./sections/RSVP";
import LoveQuote from "./sections/LoveQuote";
import UploadImages from "./sections/UploadImages";
import Footer from "./sections/Footer";

export const birthday18CoastRenderers: SectionRendererMap = {
  hero: Hero,
  inviteText: InviteText,
  countdown: Countdown,
  locations: Locations,
  schedule: Schedule,
  featureCards: FeatureCards,
  rsvp: RSVP,
  loveQuote: LoveQuote,
  uploadImagesSection: UploadImages,
  footer: Footer,
};
