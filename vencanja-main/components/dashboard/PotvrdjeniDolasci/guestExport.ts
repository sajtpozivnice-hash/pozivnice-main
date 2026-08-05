import { guestStatusLabel } from "../guestOptions";
import { Guest } from "../types";

const escapeCsv = (value: string): string => {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
};

export const downloadGuestsCsv = (
  guests: Guest[],
  projectTitle = "Gosti",
): void => {
  const header = [
    "Ime",
    "Status",
    "Email",
    "Sto",
    "Poruka",
    "Napomene",
    "Datum",
  ];

  const rows = guests.map((guest) => [
    guest.name,
    guestStatusLabel(guest.rsvp_status),
    guest.email ?? "",
    guest.tables?.name ?? "",
    guest.message ?? "",
    guest.notes ?? "",
    new Date(guest.updated_at || guest.created_at).toLocaleDateString("sr-RS"),
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => escapeCsv(String(cell))).join(","))
    .join("\n");

  const blob = new Blob([`\uFEFF${csv}`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${projectTitle.replace(/\s+/g, "-").toLowerCase()}-gosti.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
