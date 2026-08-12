import { SectionRendererMap } from "@/types/sections";
import Hero from "./sections/Hero";
import InviteText from "./sections/InviteText";
import Countdown from "./sections/Countdown";
import Schedule from "./sections/Schedule";
import FeatureCards from "./sections/FeatureCards";
import Locations from "./sections/Locations";
import OurGallery from "./sections/OurGallery";
import UploadImages from "./sections/UploadImages";
import RSVP from "./sections/RSVP";
import Footer from "./sections/Footer";

export const kidsPastelRenderers: SectionRendererMap = {
  hero: Hero,
  inviteText: InviteText,
  countdown: Countdown,
  schedule: Schedule,
  featureCards: FeatureCards,
  locations: Locations,
  ourGallery: OurGallery,
  uploadImagesSection: UploadImages,
  rsvp: RSVP,
  footer: Footer,
};
