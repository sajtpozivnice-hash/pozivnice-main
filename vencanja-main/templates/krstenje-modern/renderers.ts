import { SectionRendererMap } from "@/types/sections";
import Hero from "./sections/Hero";
import Countdown from "./sections/Countdown";
import InviteText from "./sections/InviteText";
import Calendar from "./sections/Calendar";
import OurStory from "./sections/OurStory";
import Schedule from "./sections/Schedule";
import LoveQuote from "./sections/LoveQuote";
import Locations from "./sections/Locations";

import UploadImages from "./sections/UploadImages";
import RSVP from "./sections/RSVP";
import Footer from "./sections/Footer";

export const krstenjeModernRenderers: SectionRendererMap = {
  hero: Hero,
  countdown: Countdown,
  inviteText: InviteText,
  calendar: Calendar,
  ourStory: OurStory,
  schedule: Schedule,
  loveQuote: LoveQuote,
  locations: Locations,

  uploadImagesSection: UploadImages,
  rsvp: RSVP,
  footer: Footer,
};
