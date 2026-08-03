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
    <div className="columns-2 lg:columns-5 xl:columns-5 gap-4 space-y-4">
      <div className="break-inside-avoid">
        <HeroSectionEdit />
      </div>
      <div className="break-inside-avoid">
        <CountdownSectionEdit />
      </div>
      <div className="break-inside-avoid">
        <InviteTextSectionEdit />
      </div>
      <div className="break-inside-avoid">
        <CalendarSectionEdit />
      </div>
      <div className="break-inside-avoid">
        <OurStorySectionEdit />
      </div>
      <div className="break-inside-avoid">
        <ScheduleSectionEdit />
      </div>
      <div className="break-inside-avoid">
        <LoveQuoteSectionEdit />
      </div>
      <div className="break-inside-avoid">
        <LocationsSectionEdit />
      </div>
      <div className="break-inside-avoid">
        <OurGallerySectionEdit />
      </div>
      <div className="break-inside-avoid">
        <RSVPSectionEdit />
      </div>
      <div className="break-inside-avoid">
        <ImageUploadSectionEdit />
      </div>
      <div className="break-inside-avoid">
        <FooterSectionEdit />
      </div>
    </div>
  );
};

export default Sections;
