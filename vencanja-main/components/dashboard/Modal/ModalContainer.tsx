import { useCallback } from "react";
import { useDialog } from "../context/ModalContext";
import AddNewGuestModal from "./AddNewGuestModal";
import NewTableModal from "./NewTableModal";
import AddGuestToTableModal from "./AddGuestToTableModal";
import EditTableModal from "./EditTableModal";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import EditGuestModal from "./EditGuestModal";
import DeleteGuestModal from "./DeleteGuestModal";
import DeleteTableModal from "./DeleteTableModal";
import HeroSectionEditModal from "./sections/HeroSectionEditModal";
import CountdownSectionEditModal from "./sections/CountdownSectionEditModal";
import InviteSectionEditModal from "./sections/InviteSectionEditModal";
import CalendarSectionEditModal from "./sections/CalendarSectionEditModal";
import LoveQuoteSectionEditModal from "./sections/LoveQuoteSectionEditModal";
import RSVPSectionEditModal from "./sections/RSVPSectionEditModal";
import ImageUploadSectionEditModal from "./sections/ImageUploadSectionEditModal";
import FooterSectionModalEdit from "./sections/FooterSectionModalEdit";
import LocationsSectionEditModal from "./sections/LocationsSectionEditModal";
import OurStorySectionEditModal from "./sections/OurStorySectionEditModal";
import ScheduleSectionEditModal from "./sections/ScheduleSectionEditModal";
import OurGallerySectionEditModal from "./sections/OurGallerySectionEditModal";

const ModalContainer = () => {
  const { type, open, closeModal } = useDialog();

  const modalContentHandler = useCallback(() => {
    switch (type) {
      case "add_guest":
        return <AddNewGuestModal />;
      case "add_table":
        return <NewTableModal />;
      case "add_guest_to_table":
        return <AddGuestToTableModal />;
      case "edit_table":
        return <EditTableModal />;
      case "edit_guest":
        return <EditGuestModal />;
      case "delete_guest":
        return <DeleteGuestModal />;
      case "delete_table":
        return <DeleteTableModal />;
      case "hero_edit":
        return <HeroSectionEditModal />;
      case "countdown_edit":
        return <CountdownSectionEditModal />;
      case "invite_text_edit":
        return <InviteSectionEditModal />;
      case "calendar_edit":
        return <CalendarSectionEditModal />;
      case "love_quote_edit":
        return <LoveQuoteSectionEditModal />;
      case "rsvp_edit":
        return <RSVPSectionEditModal />;
      case "upload_image_edit":
        return <ImageUploadSectionEditModal />;
      case "footer_edit":
        return <FooterSectionModalEdit />;
      case "locations_edit":
        return <LocationsSectionEditModal />;
      case "our_story_edit":
        return <OurStorySectionEditModal />;
      case "schedule_edit":
        return <ScheduleSectionEditModal />;
      case "our_gallery_edit":
        return <OurGallerySectionEditModal />;
      default:
        return <></>;
    }
  }, [type]);

  return (
    <Sheet open={open} onOpenChange={closeModal}>
      <SheetContent className="flex w-full max-w-full flex-col gap-4 overflow-y-auto p-3 sm:max-w-md sm:p-4">
        {modalContentHandler()}
      </SheetContent>
    </Sheet>
  );
};

export default ModalContainer;
