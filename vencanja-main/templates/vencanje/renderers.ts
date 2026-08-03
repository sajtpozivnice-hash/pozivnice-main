import { SectionRendererMap } from "@/types/sections";
import Hero from "./sections/Hero";
import OurStory from "./sections/OurStory";
import RSVP from "./sections/RSVP";
import Schedule from "./sections/Schedule";
import Countdown from "./sections/Countdown";
import Calendar from "./sections/Calendar";
import OurGallery from "./sections/OurGallerySection";
import Locations from "./sections/Locations";
import UploadImages from "./sections/UploadImage";
import Footer from "./sections/Footer";
import LoveQuote from "./sections/LoveQuote";
import InviteSection from "./sections/InviteSection";

export const vencanjeRenderers: SectionRendererMap = {
  hero: Hero,
  countdown: Countdown,
  calendar: Calendar,
  ourStory: OurStory,
  schedule: Schedule,
  locations: Locations,
  inviteText: InviteSection,
  loveQuote: LoveQuote,
  ourGallery: OurGallery,
  uploadImagesSection: UploadImages,
  rsvp: RSVP,
  footer: Footer,
};
