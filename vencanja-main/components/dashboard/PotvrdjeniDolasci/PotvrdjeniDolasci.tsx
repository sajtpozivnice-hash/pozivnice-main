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
import { useDashboard } from "../context/DashboardContext";
import { CreateGuestDto, Guest, RSVPStatus } from "../types";
import EmptyMessage from "../EmptyMessage";
import { GuestStatusBadge } from "./GuestStatusBadge";
import { formatGuestDate, guestStatusLabel } from "../guestOptions";
import {
  Download,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  UserMinus,
  UserX,
} from "lucide-react";
import SectionLoader from "../loaders/SectionLoader";
import SelectInput, { SelectOption } from "../SelectInput";
import SearchField from "../shared/SearchField";
import SummaryStats from "../shared/SummaryStats";
import FilterEmptyState from "../shared/FilterEmptyState";
import { compareNameSr, matchesSearchQuery } from "../utils/search";
import { downloadGuestsCsv } from "./guestExport";
import { toast } from "sonner";

type GuestSortKey =
  | "name-asc"
  | "name-desc"
  | "date-newest"
  | "date-oldest"
  | "table-asc"
  | "assigned-first"
  | "unassigned-first";

type StatusFilter = "all" | RSVPStatus;

const SORT_OPTIONS: SelectOption[] = [
  { label: "Ime (A–Ž)", value: "name-asc" },
  { label: "Ime (Ž–A)", value: "name-desc" },
  { label: "Datum (najnovije)", value: "date-newest" },
  { label: "Datum (najstarije)", value: "date-oldest" },
  { label: "Sto (A–Ž)", value: "table-asc" },
  { label: "Raspoređeni prvo", value: "assigned-first" },
  { label: "Bez stola prvo", value: "unassigned-first" },
];

const STATUS_FILTER_OPTIONS: SelectOption[] = [
  { label: "Svi statusi", value: "all" },
  { label: "Dolazi", value: "accepted" },
  { label: "Ne zna", value: "pending" },
  { label: "Ne dolazi", value: "declined" },
];

const getTableLabel = (guest: Guest) =>
  guest.tables?.name ?? guest.table_id ?? "";

const getGuestDate = (guest: Guest) =>
  new Date(guest.updated_at || guest.created_at).getTime();

const sortGuests = (guests: Guest[], sortKey: GuestSortKey) => {
  const sorted = [...guests];

  sorted.sort((a, b) => {
    switch (sortKey) {
      case "name-desc":
        return compareNameSr(b.name, a.name);
      case "date-newest":
        return getGuestDate(b) - getGuestDate(a) || compareNameSr(a.name, b.name);
      case "date-oldest":
        return getGuestDate(a) - getGuestDate(b) || compareNameSr(a.name, b.name);
      case "table-asc": {
        const aTable = getTableLabel(a) || "zzz";
        const bTable = getTableLabel(b) || "zzz";
        return compareNameSr(aTable, bTable) || compareNameSr(a.name, b.name);
      }
      case "assigned-first": {
        const aAssigned = a.table_id || a.tables?.id ? 0 : 1;
        const bAssigned = b.table_id || b.tables?.id ? 0 : 1;
        return (
          aAssigned - bAssigned ||
          compareNameSr(getTableLabel(a), getTableLabel(b)) ||
          compareNameSr(a.name, b.name)
        );
      }
      case "unassigned-first": {
        const aAssigned = a.table_id || a.tables?.id ? 1 : 0;
        const bAssigned = b.table_id || b.tables?.id ? 1 : 0;
        return aAssigned - bAssigned || compareNameSr(a.name, b.name);
      }
      case "name-asc":
      default:
        return compareNameSr(a.name, b.name);
    }
  });

  return sorted;
};

const PotvrdjeniDolasci = () => {
  const { openModal } = useDialog();
  const { guests, loading } = useGuests();
  const { activeProject } = useDashboard();
  const [sortKey, setSortKey] = useState<GuestSortKey>("name-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const handleNewGuestModal = () => openModal("add_guest");

  const handleEditGuest = (guest: Guest) => {
    const data: CreateGuestDto = {
      name: guest.name,
      email: guest.email,
      rsvp_status: guest.rsvp_status,
      message: guest.message,
      notes: guest.notes,
      table_id: guest.table_id ?? guest.tables?.id ?? null,
    };

    openModal("edit_guest", { id: guest.id, data });
  };

  const handleDeleteGuest = (id: string, name: string) => {
    openModal("delete_guest", { id, data: { name } });
  };

  const filteredGuests = useMemo(() => {
    return guests.filter((guest) => {
      if (statusFilter !== "all" && guest.rsvp_status !== statusFilter) {
        return false;
      }
      return matchesSearchQuery(
        [
          guest.name,
          guest.email,
          guest.message,
          guest.notes,
          guest.tables?.name,
          guest.table_id ? "" : "nije rasporedjen bez stola",
          guestStatusLabel(guest.rsvp_status),
        ],
        searchQuery,
      );
    });
  }, [guests, searchQuery, statusFilter]);

  const sortedGuests = useMemo(
    () => sortGuests(filteredGuests, sortKey),
    [filteredGuests, sortKey],
  );

  const summary = useMemo(() => {
    const accepted = guests.filter((g) => g.rsvp_status === "accepted").length;
    const pending = guests.filter((g) => g.rsvp_status === "pending").length;
    const declined = guests.filter((g) => g.rsvp_status === "declined").length;
    return { accepted, pending, declined, total: guests.length };
  }, [guests]);

  if (loading && guests.length === 0) {
    return <SectionLoader />;
  }

  if (guests.length === 0) {
    return (
      <EmptyMessage
        title="Nemate unetih gostiju"
        description="Dodajte goste ručno ili sačekajte potvrde dolaska putem pozivnice."
        icon={Users}
        accent="guests"
        action={
          <Button className="cursor-pointer" onClick={handleNewGuestModal}>
            Dodaj novog gosta
          </Button>
        }
      />
    );
  }

  const onExport = () => {
    downloadGuestsCsv(sortedGuests, activeProject?.title ?? "Gosti");
    toast.success("Spisak gostiju je preuzet.", { position: "top-center" });
  };

  return (
    <div className="w-full min-w-0 space-y-4">
      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Pregled potvrda, rasporeda i napomena gostiju.
        </p>
        <div className="grid w-full grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:w-auto">
          <Button
            variant="outline"
            className="h-9 w-full cursor-pointer"
            onClick={onExport}
          >
            <Download className="h-4 w-4" />
            Preuzmi CSV
          </Button>
          <Button className="h-9 w-full cursor-pointer" onClick={handleNewGuestModal}>
            Dodaj gosta
          </Button>
        </div>
      </div>

      <SummaryStats
        items={[
          { label: "Ukupno gostiju", value: String(summary.total), icon: Users, tone: "sky" },
          { label: "Dolazi", value: String(summary.accepted), icon: UserCheck, tone: "emerald" },
          { label: "Ne zna", value: String(summary.pending), icon: UserMinus, tone: "orange" },
          { label: "Ne dolazi", value: String(summary.declined), icon: UserX, tone: "rose" },
        ]}
      />

      <div className="flex w-full min-w-0 flex-col gap-3">
        <SearchField
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Traži po imenu, stolu, statusu, poruci..."
          aria-label="Pretraga gostiju"
        />

        <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2">
          <div className="space-y-1.5">
            <p className="text-sm text-foreground">Status</p>
            <SelectInput
              items={STATUS_FILTER_OPTIONS}
              value={statusFilter}
              onChange={(value) =>
                setStatusFilter((value as StatusFilter) || "all")
              }
            />
          </div>
          <div className="space-y-1.5">
            <p className="text-sm text-foreground">Sortiraj</p>
            <SelectInput
              items={SORT_OPTIONS}
              value={sortKey}
              onChange={(value) => {
                if (value) setSortKey(value as GuestSortKey);
              }}
            />
          </div>
        </div>

        {searchQuery.trim() || statusFilter !== "all" ? (
          <p className="text-xs text-muted-foreground">
            Prikazano:{" "}
            <span className="font-medium text-foreground">
              {sortedGuests.length}
            </span>{" "}
            od {guests.length}
          </p>
        ) : null}
      </div>

      {sortedGuests.length === 0 ? (
        <FilterEmptyState
          title="Nema gostiju za izabrane filtere"
          description="Probajte drugi status ili pojam za pretragu."
          onReset={() => {
            setSearchQuery("");
            setStatusFilter("all");
          }}
        />
      ) : (
        <>
          <div className="grid gap-3 md:hidden">
            {sortedGuests.map((guest) => (
              <div
                key={guest.id}
                className="space-y-3 rounded-2xl border border-sky-100/80 bg-gradient-to-br from-sky-50/50 to-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <p className="truncate text-base font-semibold">
                      {guest.name}
                    </p>
                    <GuestStatusBadge status={guest.rsvp_status} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Datum potvrde
                    </p>
                    <p className="font-medium">
                      {formatGuestDate(guest.updated_at || guest.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Sto
                    </p>
                    <p className="font-medium">
                      {guest.tables?.name ?? "Nije raspoređen"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Poruka
                    </p>
                    <p className="break-words text-muted-foreground">
                      {guest.message?.trim() ? guest.message : "—"}
                    </p>
                  </div>
                  <div>
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

          <div className="hidden overflow-x-auto rounded-2xl border border-sky-100/80 shadow-sm md:block">
            <Table>
              <TableHeader>
                <TableRow className="bg-sky-50/70 hover:bg-sky-50/70">
                  <TableHead className="min-w-[160px]">Ime i prezime</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Datum potvrde</TableHead>
                  <TableHead>Poruka</TableHead>
                  <TableHead>Sto</TableHead>
                  <TableHead>Napomene</TableHead>
                  <TableHead className="text-right">Akcije</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedGuests.map((guest) => (
                  <TableRow
                    key={guest.id}
                    className="transition-colors odd:bg-white even:bg-sky-50/30 hover:bg-sky-50/60"
                  >
                    <TableCell className="font-medium text-foreground">
                      {guest.name}
                    </TableCell>
                    <TableCell>
                      <GuestStatusBadge status={guest.rsvp_status} />
                    </TableCell>
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
                          onClick={() =>
                            handleDeleteGuest(guest.id, guest.name)
                          }
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
        </>
      )}
    </div>
  );
};

export default PotvrdjeniDolasci;
