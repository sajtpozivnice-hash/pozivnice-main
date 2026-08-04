import { SectionType } from "@/types/sections";
import CalendarPanel from "./panels/CalendarPanel";
import CountdownPanel from "./panels/CountdownPanel";
import FooterPanel from "./panels/FooterPanel";
import HeroPanel from "./panels/HeroPanel";
import LocationsPanel from "./panels/LocationsPanel";
import LoveQuotePanel from "./panels/LoveQuotePanel";
import OurStoryPanel from "./panels/OurStoryPanel";
import SchedulePanel from "./panels/SchedulePanel";
import ImagesUpload from "./panels/ImagesUploadPanel";
import InvitePanel from "./panels/InvitePanel";
import OurGalleryPanel from "./panels/OurGalleryPanel";
import RsvpPanel from "./panels/RsvpPanel";

export const panelRegistry: Partial<
  Record<SectionType, React.ComponentType<object>>
> = {
  hero: HeroPanel,
  countdown: CountdownPanel,
  inviteText: InvitePanel,
  calendar: CalendarPanel,
  ourStory: OurStoryPanel,
  schedule: SchedulePanel,
  loveQuote: LoveQuotePanel,
  locations: LocationsPanel,
  ourGallery: OurGalleryPanel,
  uploadImagesSection: ImagesUpload,
  rsvp: RsvpPanel,
  footer: FooterPanel,
};
