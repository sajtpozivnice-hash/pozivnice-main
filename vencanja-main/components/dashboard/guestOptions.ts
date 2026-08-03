import { RSVPStatus } from "./types";
import { SelectOption } from "./SelectInput";

export const guestStatusOptions: SelectOption[] = [
  {
    label: "Još uvek ne zna",
    value: "pending",
  },
  {
    label: "Dolazi",
    value: "accepted",
  },
  {
    label: "Ne dolazi",
    value: "declined",
  },
];

export const formatGuestDate = (value: string) =>
  new Date(value).toLocaleDateString("sr-RS");

export const guestStatusLabel = (status: RSVPStatus) => {
  switch (status) {
    case "accepted":
      return "Dolazi";
    case "declined":
      return "Ne dolazi";
    case "pending":
      return "Još uvek ne zna";
    default:
      return "Nepoznato";
  }
};
