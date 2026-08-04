"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDialog } from "../context/ModalContext";
import { useGuests } from "../context/GuestContext";
import { CreateGuestDto, Guest, RSVPStatus } from "../types";
import EmptyMessage from "../EmptyMessage";
import { GuestStatusBadge } from "./GuestStatusBadge";
import { formatGuestDate } from "../guestOptions";
import { ArrowUpDown, Pencil, Trash2, Users } from "lucide-react";
import SectionLoader from "../loaders/SectionLoader";
import SelectInput, { SelectOption } from "../SelectInput";

type GuestSortKey =
  | "name-asc"
  | "name-desc"
  | "status-accepted"
  | "status-pending"
  | "status-declined"
  | "date-newest"
  | "date-oldest"
  | "table-asc"
  | "table-desc"
  | "assigned-first"
  | "unassigned-first"
  | "with-message"
  | "with-notes";

const SORT_OPTIONS: SelectOption[] = [
  { label: "Ime (A–Ž)", value: "name-asc" },
  { label: "Ime (Ž–A)", value: "name-desc" },
  { label: "Status: Dolazi prvo", value: "status-accepted" },
  { label: "Status: Ne zna prvo", value: "status-pending" },
  { label: "Status: Ne dolazi prvo", value: "status-declined" },
  { label: "Datum (najnovije)", value: "date-newest" },
  { label: "Datum (najstarije)", value: "date-oldest" },
  { label: "Sto (A–Ž)", value: "table-asc" },
  { label: "Sto (Ž–A)", value: "table-desc" },
  { label: "Raspoređeni prvo", value: "assigned-first" },
  { label: "Bez stola prvo", value: "unassigned-first" },
  { label: "Sa porukom prvo", value: "with-message" },
  { label: "Sa napomenom prvo", value: "with-notes" },
];

const STATUS_ORDER: Record<RSVPStatus, number> = {
  accepted: 0,
  pending: 1,
  declined: 2,
  "": 3,
};

const compareName = (a: string, b: string) =>
  a.localeCompare(b, "sr", { sensitivity: "base", numeric: true });

const getTableLabel = (guest: Guest) =>
  guest.tables?.name ?? guest.table_id ?? "";

const getGuestDate = (guest: Guest) =>
  new Date(guest.updated_at || guest.created_at).getTime();

const sortGuests = (guests: Guest[], sortKey: GuestSortKey) => {
  const sorted = [...guests];

  sorted.sort((a, b) => {
    switch (sortKey) {
      case "name-asc":
        return compareName(a.name, b.name);
      case "name-desc":
        return compareName(b.name, a.name);
      case "status-accepted": {
        const orderA = STATUS_ORDER[a.rsvp_status] ?? 99;
        const orderB = STATUS_ORDER[b.rsvp_status] ?? 99;
        return orderA - orderB || compareName(a.name, b.name);
      }
      case "status-pending": {
        const pendingFirst = (status: RSVPStatus) => {
          if (status === "pending") return 0;
          if (status === "accepted") return 1;
          if (status === "declined") return 2;
          return 3;
        };
        return (
          pendingFirst(a.rsvp_status) - pendingFirst(b.rsvp_status) ||
          compareName(a.name, b.name)
        );
      }
      case "status-declined": {
        const declinedFirst = (status: RSVPStatus) => {
          if (status === "declined") return 0;
          if (status === "pending") return 1;
          if (status === "accepted") return 2;
          return 3;
        };
        return (
          declinedFirst(a.rsvp_status) - declinedFirst(b.rsvp_status) ||
          compareName(a.name, b.name)
        );
      }
      case "date-newest":
        return getGuestDate(b) - getGuestDate(a) || compareName(a.name, b.name);
      case "date-oldest":
        return getGuestDate(a) - getGuestDate(b) || compareName(a.name, b.name);
      case "table-asc": {
        const aTable = getTableLabel(a) || "zzz";
        const bTable = getTableLabel(b) || "zzz";
        return compareName(aTable, bTable) || compareName(a.name, b.name);
      }
      case "table-desc": {
        const aTable = getTableLabel(a) || "";
        const bTable = getTableLabel(b) || "";
        return compareName(bTable, aTable) || compareName(a.name, b.name);
      }
      case "assigned-first": {
        const aAssigned = a.table_id || a.tables?.id ? 0 : 1;
        const bAssigned = b.table_id || b.tables?.id ? 0 : 1;
        return (
          aAssigned - bAssigned ||
          compareName(getTableLabel(a), getTableLabel(b)) ||
          compareName(a.name, b.name)
        );
      }
      case "unassigned-first": {
        const aAssigned = a.table_id || a.tables?.id ? 1 : 0;
        const bAssigned = b.table_id || b.tables?.id ? 1 : 0;
        return aAssigned - bAssigned || compareName(a.name, b.name);
      }
      case "with-message": {
        const aHas = a.message?.trim() ? 0 : 1;
        const bHas = b.message?.trim() ? 0 : 1;
        return aHas - bHas || compareName(a.name, b.name);
      }
      case "with-notes": {
        const aHas = a.notes?.trim() ? 0 : 1;
        const bHas = b.notes?.trim() ? 0 : 1;
        return aHas - bHas || compareName(a.name, b.name);
      }
      default:
        return 0;
    }
  });

  return sorted;
};

const PotvrdjeniDolasci = () => {
  const { openModal } = useDialog();
  const { guests, loading } = useGuests();
  const [sortKey, setSortKey] = useState<GuestSortKey>("name-asc");

  const handleNewGuestModal = () => {
    openModal("add_guest");
  };

  const handleEditGuest = (guest: Guest) => {
    const data: CreateGuestDto = {
      name: guest.name,
      email: guest.email,
      rsvp_status: guest.rsvp_status,
      message: guest.message,
      notes: guest.notes,
      table_id: guest.table_id ?? guest.tables?.id ?? null,
    };

    openModal("edit_guest", {
      id: guest.id,
      data,
    });
  };

  const handleDeleteGuest = (id: string, name: string) => {
    openModal("delete_guest", {
      id,
      data: {
        name,
      },
    });
  };

  const sortedGuests = useMemo(
    () => sortGuests(guests, sortKey),
    [guests, sortKey],
  );

  if (loading && guests.length === 0) {
    return <SectionLoader />;
  }

  if (guests.length === 0) {
    return (
      <EmptyMessage
        title="Nemate potvrđenih dolazaka gostiju"
        description="Možete sami dodati goste ukoliko vam neko nije potvrdio putem platforme."
        action={
          <Button
            variant="default"
            className="cursor-pointer"
            onClick={handleNewGuestModal}
          >
            Dodaj novog gosta
          </Button>
        }
      />
    );
  }

  const acceptedCount = guests.filter((g) => g.rsvp_status === "accepted")
    .length;
  const pendingCount = guests.filter((g) => g.rsvp_status === "pending").length;
  const declinedCount = guests.filter((g) => g.rsvp_status === "declined")
    .length;

  return (
    <div className="w-full min-w-0 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-2 rounded-xl border bg-muted/30 px-3 py-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{guests.length} gostiju</span>
        </div>
        <div className="rounded-xl border px-3 py-2 text-xs text-muted-foreground">
          Dolazi:{" "}
          <span className="font-semibold text-foreground">{acceptedCount}</span>
        </div>
        <div className="rounded-xl border px-3 py-2 text-xs text-muted-foreground">
          Ne zna:{" "}
          <span className="font-semibold text-foreground">{pendingCount}</span>
        </div>
        <div className="rounded-xl border px-3 py-2 text-xs text-muted-foreground">
          Ne dolazi:{" "}
          <span className="font-semibold text-foreground">{declinedCount}</span>
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-1.5">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <ArrowUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span>Sortiraj</span>
        </div>
        <div className="w-full min-w-0">
          <SelectInput
            items={SORT_OPTIONS}
            value={sortKey}
            onChange={(value) => {
              if (value) setSortKey(value as GuestSortKey);
            }}
            placeholder="Izaberite sortiranje"
          />
        </div>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-3 md:hidden">
        {sortedGuests.map((guest) => (
          <div
            key={guest.id}
            className="space-y-3 rounded-xl border bg-card p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <p className="truncate text-base font-semibold">{guest.name}</p>
                <GuestStatusBadge status={guest.rsvp_status} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Broj gostiju
                </p>
                <p className="font-medium">1</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Datum potvrde
                </p>
                <p className="font-medium">
                  {formatGuestDate(guest.updated_at || guest.created_at)}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Sto
                </p>
                <p className="font-medium">
                  {guest.tables?.name ?? "Nije raspoređen"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Poruka
                </p>
                <p className="break-words text-muted-foreground">
                  {guest.message?.trim() ? guest.message : "—"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Napomene
                </p>
                <p className="break-words text-muted-foreground">
                  {guest.notes?.trim() ? guest.notes : "—"}
                </p>
              </div>
            </div>

            <div className="flex gap-2 border-t pt-3">
              <Button
                className="flex-1 cursor-pointer"
                onClick={() => handleEditGuest(guest)}
              >
                <Pencil className="h-4 w-4" />
                Izmeni
              </Button>
              <Button
                variant="outline"
                className="flex-1 cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => handleDeleteGuest(guest.id, guest.name)}
              >
                <Trash2 className="h-4 w-4" />
                Ukloni
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-xl border shadow-sm md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="min-w-[160px]">Ime i prezime</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Broj</TableHead>
              <TableHead>Datum potvrde</TableHead>
              <TableHead>Poruka</TableHead>
              <TableHead>Sto</TableHead>
              <TableHead>Napomene</TableHead>
              <TableHead className="text-right">Akcije</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedGuests.map((guest) => (
              <TableRow key={guest.id} className="hover:bg-muted/20">
                <TableCell className="font-medium text-foreground">
                  {guest.name}
                </TableCell>
                <TableCell>
                  <GuestStatusBadge status={guest.rsvp_status} />
                </TableCell>
                <TableCell className="text-center">1</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatGuestDate(guest.updated_at || guest.created_at)}
                </TableCell>
                <TableCell className="max-w-[180px] truncate text-muted-foreground">
                  {guest.message?.trim() ? guest.message : "—"}
                </TableCell>
                <TableCell>
                  {guest.tables?.name ? (
                    <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                      {guest.tables.name}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Nije raspoređen
                    </span>
                  )}
                </TableCell>
                <TableCell className="max-w-[160px] truncate text-muted-foreground">
                  {guest.notes?.trim() ? guest.notes : "—"}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => handleEditGuest(guest)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Izmeni
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDeleteGuest(guest.id, guest.name)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Ukloni
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PotvrdjeniDolasci;
