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
import GuestsGallery from "./sections/GuestGallery";
import Footer from "./sections/Footer";

export const vencanje2Renderers: SectionRendererMap = {
  hero: Hero,
  countdown: Countdown,
  calendar: Calendar,
  ourStory: OurStory,
  schedule: Schedule,
  locations: Locations,
  ourGallery: OurGallery,
  uploadImagesSection: UploadImages,
  guestsGallerySection: GuestsGallery,
  rsvp: RSVP,
  footer: Footer,
};
