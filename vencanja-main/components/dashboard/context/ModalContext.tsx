import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type ModalType =
  | "add_table"
  | "add_guest"
  | "add_guest_to_table"
  | "edit_table"
  | "edit_guest"
  | "resolve_party_names"
  | "delete_guest"
  | "delete_table"
  | "hero_edit"
  | "countdown_edit"
  | "invite_text_edit"
  | "calendar_edit"
  | "love_quote_edit"
  | "rsvp_edit"
  | "upload_image_edit"
  | "footer_edit"
  | "locations_edit"
  | "our_story_edit"
  | "schedule_edit"
  | "feature_cards_edit"
  | "add_budget_item"
  | "edit_budget_item"
  | "delete_budget_item"
  | "add_budget_category"
  | "budget_item_details"
  | "add_planner_task"
  | "edit_planner_task"
  | "delete_planner_task"
  | "add_planner_category";

type ModalData = {
  id?: string;
  // Existing modals pass heterogeneous payloads (guest/table/section data).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

type DialogContextType = {
  open: boolean;
  type: ModalType | null;
  data: ModalData | null;
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<ModalType | null>(null);
  const [data, setData] = useState<ModalData | null>(null);

  const openModal = (type: ModalType, data?: ModalData) => {
    setType(type);
    setData(data ?? null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setType(null);
    setData(null);
  };

  const value = useMemo(
    () => ({
      open,
      type,
      data,
      openModal,
      closeModal,
    }),
    [open, type, data],
  );

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialog must be used inside DialogProvider");
  }

  return context;
}
