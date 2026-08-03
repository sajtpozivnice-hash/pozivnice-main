import { CalendarSectionEdit } from "./CalendarSectionEdit";
import { CountdownSectionEdit } from "./CountdownSectionEdit";
import { FooterSectionEdit } from "./FooterSectionEdit";
import { HeroSectionEdit } from "./HeroSectionEdit";
import { ImageUploadSectionEdit } from "./ImageUploadSectionEdit";
import { InviteTextSectionEdit } from "./InviteTextSectionEdit";
import { LocationsSectionEdit } from "./LocationsSectionEdit";
import { LoveQuoteSectionEdit } from "./LoveQuoteSectionEdit";
import { OurGallerySectionEdit } from "./OurGallerySectionEdit";
import { OurStorySectionEdit } from "./OurStorySectionEdit";
import { RSVPSectionEdit } from "./RSVPSectionEdit";
import { ScheduleSectionEdit } from "./ScheduleSectionEdit";

const Sections = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <HeroSectionEdit />
      <CountdownSectionEdit />
      <InviteTextSectionEdit />
      <CalendarSectionEdit />
      <OurStorySectionEdit />
      <ScheduleSectionEdit />
      <LoveQuoteSectionEdit />
      <LocationsSectionEdit />
      <OurGallerySectionEdit />
      <RSVPSectionEdit />
      <ImageUploadSectionEdit />
      <FooterSectionEdit />
    </div>
  );
};

export default Sections;
