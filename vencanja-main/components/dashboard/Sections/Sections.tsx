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
import { ReactNode } from "react";

const MasonryItem = ({ children }: { children: ReactNode }) => (
  <div className="mb-4 break-inside-avoid">{children}</div>
);

const Sections = () => {
  return (
    <div className="columns-1 gap-4 md:columns-2 lg:columns-3 xl:columns-4">
      <MasonryItem>
        <HeroSectionEdit />
      </MasonryItem>
      <MasonryItem>
        <CountdownSectionEdit />
      </MasonryItem>
      <MasonryItem>
        <InviteTextSectionEdit />
      </MasonryItem>
      <MasonryItem>
        <CalendarSectionEdit />
      </MasonryItem>
      <MasonryItem>
        <OurStorySectionEdit />
      </MasonryItem>
      <MasonryItem>
        <ScheduleSectionEdit />
      </MasonryItem>
      <MasonryItem>
        <LoveQuoteSectionEdit />
      </MasonryItem>
      <MasonryItem>
        <LocationsSectionEdit />
      </MasonryItem>
      <MasonryItem>
        <OurGallerySectionEdit />
      </MasonryItem>
      <MasonryItem>
        <RSVPSectionEdit />
      </MasonryItem>
      <MasonryItem>
        <ImageUploadSectionEdit />
      </MasonryItem>
      <MasonryItem>
        <FooterSectionEdit />
      </MasonryItem>
    </div>
  );
};

export default Sections;
