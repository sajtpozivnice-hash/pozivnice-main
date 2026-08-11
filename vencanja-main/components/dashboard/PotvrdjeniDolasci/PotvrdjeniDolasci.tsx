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
import { useProject } from "../context/ProjectContext";
import { CreateGuestDto, Guest } from "../types";
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
  Baby,
  UserRound,
  AlertTriangle,
} from "lucide-react";
import SectionLoader from "../loaders/SectionLoader";
import SelectInput, { SelectOption } from "../SelectInput";
import SearchField from "../shared/SearchField";
import SummaryStats from "../shared/SummaryStats";
import FilterEmptyState from "../shared/FilterEmptyState";
import { GuestNameWithChildBadge } from "../shared/ChildBadge";
import { compareNameSr, matchesSearchQuery } from "../utils/search";
import {
  computeGuestStats,
  displayGuestName,
  getUnresolvedPartyCount,
  isRsvpContact,
  partyNeedsNameResolution,
} from "../utils/guestParty";
import { downloadGuestsCsv } from "./guestExport";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

type GuestSortKey =
  | "name-asc"
  | "name-desc"
  | "date-newest"
  | "date-oldest"
  | "table-asc"
  | "assigned-first"
  | "unassigned-first";

type GuestFilter =
  | "all"
  | "adults"
  | "children"
  | "assigned"
  | "unassigned"
  | "accepted"
  | "pending"
  | "declined"
  | "unresolved";

const SORT_OPTIONS: SelectOption[] = [
  { label: "Ime (A–Ž)", value: "name-asc" },
  { label: "Ime (Ž–A)", value: "name-desc" },
  { label: "Datum (najnovije)", value: "date-newest" },
  { label: "Datum (najstarije)", value: "date-oldest" },
  { label: "Sto (A–Ž)", value: "table-asc" },
  { label: "Raspoređeni prvo", value: "assigned-first" },
  { label: "Bez stola prvo", value: "unassigned-first" },
];

const FILTER_OPTIONS: SelectOption[] = [
  { label: "Svi", value: "all" },
  { label: "Odrasli", value: "adults" },
  { label: "Deca", value: "children" },
  { label: "Raspoređeni", value: "assigned" },
  { label: "Neraspoređeni", value: "unassigned" },
  { label: "Potvrđeni", value: "accepted" },
  { label: "Nisu potvrdili", value: "pending" },
  { label: "Odbili", value: "declined" },
  { label: "Bez unetih imena", value: "unresolved" },
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
        return compareNameSr(displayGuestName(b), displayGuestName(a));
      case "date-newest":
        return (
          getGuestDate(b) - getGuestDate(a) ||
          compareNameSr(displayGuestName(a), displayGuestName(b))
        );
      case "date-oldest":
        return (
          getGuestDate(a) - getGuestDate(b) ||
          compareNameSr(displayGuestName(a), displayGuestName(b))
        );
      case "table-asc": {
        const aTable = getTableLabel(a) || "zzz";
        const bTable = getTableLabel(b) || "zzz";
        return (
          compareNameSr(aTable, bTable) ||
          compareNameSr(displayGuestName(a), displayGuestName(b))
        );
      }
      case "assigned-first": {
        const aAssigned = a.table_id || a.tables?.id ? 0 : 1;
        const bAssigned = b.table_id || b.tables?.id ? 0 : 1;
        return (
          aAssigned - bAssigned ||
          compareNameSr(getTableLabel(a), getTableLabel(b)) ||
          compareNameSr(displayGuestName(a), displayGuestName(b))
        );
      }
      case "unassigned-first": {
        const aAssigned = a.table_id || a.tables?.id ? 1 : 0;
        const bAssigned = b.table_id || b.tables?.id ? 1 : 0;
        return (
          aAssigned - bAssigned ||
          compareNameSr(displayGuestName(a), displayGuestName(b))
        );
      }
      case "name-asc":
      default:
        return compareNameSr(displayGuestName(a), displayGuestName(b));
    }
  });

  return sorted;
};

const matchesFilter = (
  guest: Guest,
  filter: GuestFilter,
  allGuests: Guest[],
) => {
  switch (filter) {
    case "adults":
      return !guest.is_child;
    case "children":
      return guest.is_child;
    case "assigned":
      return Boolean(guest.table_id || guest.tables?.id);
    case "unassigned":
      return !guest.table_id && !guest.tables?.id;
    case "accepted":
    case "pending":
    case "declined":
      return guest.rsvp_status === filter;
    case "unresolved": {
      if (guest.name_pending || !guest.name.trim()) return true;
      if (isRsvpContact(guest)) {
        return partyNeedsNameResolution(guest, allGuests);
      }
      return false;
    }
    case "all":
    default:
      return true;
  }
};

const PotvrdjeniDolasci = () => {
  const { openModal } = useDialog();
  const { guests, loading } = useGuests();
  const { activeProject } = useDashboard();
  const { config, saveConfig, saving } = useProject();
  const [sortKey, setSortKey] = useState<GuestSortKey>("name-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<GuestFilter>("all");
  const [childAgeDraft, setChildAgeDraft] = useState<string>(
    String(config?.event?.childAgeLimit ?? ""),
  );
  const [ageSource, setAgeSource] = useState(activeProject?.id ?? "");

  if ((activeProject?.id ?? "") !== ageSource) {
    setAgeSource(activeProject?.id ?? "");
    setChildAgeDraft(String(config?.event?.childAgeLimit ?? ""));
  }

  const handleNewGuestModal = () => openModal("add_guest");

  const handleEditGuest = (guest: Guest) => {
    const data: CreateGuestDto = {
      name: guest.name,
      email: guest.email,
      rsvp_status: guest.rsvp_status,
      message: guest.message,
      notes: guest.notes,
      table_id: guest.table_id ?? guest.tables?.id ?? null,
      is_child: guest.is_child,
      age: guest.age,
      party_size: guest.party_size,
      parent_guest_id: guest.parent_guest_id,
      name_pending: guest.name_pending,
    };

    openModal("edit_guest", { id: guest.id, data });
  };

  const handleResolveNames = (guest: Guest) => {
    openModal("resolve_party_names", { id: guest.id });
  };

  const handleDeleteGuest = (id: string, name: string) => {
    openModal("delete_guest", { id, data: { name } });
  };

  const stats = useMemo(() => computeGuestStats(guests), [guests]);

  const contactById = useMemo(() => {
    const map = new Map<string, Guest>();
    guests.filter(isRsvpContact).forEach((g) => map.set(g.id, g));
    return map;
  }, [guests]);

  const filteredGuests = useMemo(() => {
    return guests.filter((guest) => {
      if (!matchesFilter(guest, filter, guests)) return false;
      return matchesSearchQuery(
        [
          guest.name,
          displayGuestName(guest),
          guest.email,
          guest.message,
          guest.notes,
          guest.tables?.name,
          guest.table_id ? "" : "nije rasporedjen bez stola",
          guest.is_child ? "dete deca" : "odrasli",
          guestStatusLabel(guest.rsvp_status),
        ],
        searchQuery,
      );
    });
  }, [guests, searchQuery, filter]);

  const sortedGuests = useMemo(
    () => sortGuests(filteredGuests, sortKey),
    [filteredGuests, sortKey],
  );

  const saveChildAgeLimit = async () => {
    if (!config || !activeProject) return;
    const parsed =
      childAgeDraft.trim() === ""
        ? undefined
        : Number.parseInt(childAgeDraft, 10);

    if (
      parsed != null &&
      (Number.isNaN(parsed) || parsed < 0 || parsed > 120)
    ) {
      toast.error("Unesite ispravan broj godina (0–120).", {
        position: "top-center",
      });
      return;
    }

    try {
      await saveConfig({
        ...config,
        event: {
          ...config.event,
          childAgeLimit: parsed,
        },
      });
      toast.success("Granica za decu je sačuvana.", {
        position: "top-center",
      });
    } catch {
      toast.error("Došlo je do greške. Pokušajte ponovo.", {
        position: "top-center",
      });
    }
  };

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

  const renderPartyHint = (guest: Guest) => {
    if (!isRsvpContact(guest) || (guest.party_size || 1) <= 1) return null;
    const unresolved = getUnresolvedPartyCount(guest, guests);
    const others = Math.max((guest.party_size || 1) - 1, 0);

    return (
      <div className="mt-1 space-y-1 text-xs text-muted-foreground">
        <p>
          {guest.party_size} osobe
          {others > 0 ? ` · još ${others} osobe` : ""}
        </p>
        {unresolved > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-amber-700">
              Imena {unresolved}{" "}
              {unresolved === 1 ? "osobe" : "osoba"} još nisu unesena
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-7 cursor-pointer px-2 text-xs"
              onClick={() => handleResolveNames(guest)}
            >
              Unesi imena
            </Button>
          </div>
        ) : null}
      </div>
    );
  };

  const renderRsvpMessage = (guest: Guest) => {
    if (isRsvpContact(guest)) {
      return guest.message?.trim() ? guest.message : "—";
    }
    const contact = guest.parent_guest_id
      ? contactById.get(guest.parent_guest_id)
      : null;
    return (
      <span className="text-muted-foreground">
        {contact
          ? `Uz prijavu: ${contact.name}`
          : "—"}
      </span>
    );
  };

  return (
    <div className="w-full min-w-0 space-y-4">
      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Pregled potvrda, pojedinačnih osoba, dece i rasporeda.
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

      {stats.unresolvedParties > 0 ? (
        <button
          type="button"
          onClick={() => setFilter("unresolved")}
          className="flex w-full items-start gap-3 rounded-xl border border-amber-300/70 bg-amber-50/80 px-4 py-3 text-left transition hover:bg-amber-50"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Imate goste kojima još nisu unesena imena svih osoba.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {stats.unresolvedParties} RSVP{" "}
              {stats.unresolvedParties === 1 ? "prijava" : "prijave"} ·{" "}
              {stats.unresolvedPeople} osoba još nema uneseno ime. Kliknite da
              filtrirate.
            </p>
          </div>
        </button>
      ) : null}

      <SummaryStats
        className="sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"
        items={[
          {
            label: "Ukupno gostiju",
            value: String(stats.total),
            icon: Users,
            tone: "sky",
          },
          {
            label: "Odrasli",
            value: String(stats.adults),
            icon: UserRound,
            tone: "violet",
          },
          {
            label: "Deca",
            value: String(stats.children),
            icon: Baby,
            tone: "orange",
          },
          {
            label: "Potvrđeni",
            value: String(stats.accepted),
            icon: UserCheck,
            tone: "emerald",
          },
          {
            label: "Nisu potvrdili",
            value: String(stats.pending),
            icon: UserMinus,
            tone: "orange",
          },
          {
            label: "Odbijeni",
            value: String(stats.declined),
            icon: UserX,
            tone: "rose",
          },
        ]}
      />

      <div className="flex flex-col gap-3 rounded-xl border bg-muted/20 p-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="text-sm font-medium">Deca do ___ godina</p>
          <p className="text-xs text-muted-foreground">
            Koristi se kao predlog kada unesete godine gosta. Možete ručno
            promeniti kategoriju.
          </p>
          <Input
            type="number"
            min={0}
            max={120}
            value={childAgeDraft}
            placeholder="npr. 12"
            onChange={(e) => setChildAgeDraft(e.target.value)}
            className="max-w-[160px]"
          />
        </div>
        <Button
          variant="outline"
          className="cursor-pointer"
          disabled={saving}
          onClick={() => void saveChildAgeLimit()}
        >
          Sačuvaj granicu
        </Button>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-3">
        <SearchField
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Traži po imenu, prezimenu, stolu, statusu..."
          aria-label="Pretraga gostiju"
        />

        <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2">
          <div className="space-y-1.5">
            <p className="text-sm text-foreground">Filter</p>
            <SelectInput
              items={FILTER_OPTIONS}
              value={filter}
              onChange={(value) =>
                setFilter((value as GuestFilter) || "all")
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

        {searchQuery.trim() || filter !== "all" ? (
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
          description="Probajte drugi filter ili pojam za pretragu."
          onReset={() => {
            setSearchQuery("");
            setFilter("all");
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
                    <div className="text-base font-semibold">
                      <GuestNameWithChildBadge guest={guest} />
                    </div>
                    <GuestStatusBadge status={guest.rsvp_status} />
                    {renderPartyHint(guest)}
                    {!isRsvpContact(guest) ? (
                      <p className="text-xs text-muted-foreground">
                        Dolazi sa osobom koja je potvrdila dolazak
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Godine
                    </p>
                    <p className="font-medium">
                      {guest.age != null ? guest.age : "—"}
                    </p>
                  </div>
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
                      {guest.name_pending
                        ? "Prvo unesite ime"
                        : guest.tables?.name ?? "Nije raspoređen"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Poruka (RSVP)
                    </p>
                    <p className="break-words text-muted-foreground">
                      {isRsvpContact(guest)
                        ? guest.message?.trim()
                          ? guest.message
                          : "—"
                        : "—"}
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

                <div className="flex flex-wrap gap-2 border-t pt-3">
                  {isRsvpContact(guest) &&
                  partyNeedsNameResolution(guest, guests) ? (
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => handleResolveNames(guest)}
                    >
                      Unesi imena
                    </Button>
                  ) : null}
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
                    onClick={() =>
                      handleDeleteGuest(guest.id, displayGuestName(guest))
                    }
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
                  <TableHead className="min-w-[200px]">Osoba</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Poruka (RSVP)</TableHead>
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
                      <GuestNameWithChildBadge guest={guest} />
                      {renderPartyHint(guest)}
                      {!isRsvpContact(guest) ? (
                        <p className="mt-1 text-xs font-normal text-muted-foreground">
                          Dolazi sa:{" "}
                          {guest.parent_guest_id
                            ? contactById.get(guest.parent_guest_id)?.name ??
                              "—"
                            : "—"}
                        </p>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <GuestStatusBadge status={guest.rsvp_status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatGuestDate(guest.updated_at || guest.created_at)}
                    </TableCell>
                    <TableCell className="max-w-[180px] truncate text-muted-foreground">
                      {renderRsvpMessage(guest)}
                    </TableCell>
                    <TableCell>
                      {guest.name_pending ? (
                        <span className="text-xs text-amber-700">
                          Potrebno je uneti ime
                        </span>
                      ) : guest.tables?.name ? (
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
                        {isRsvpContact(guest) &&
                        partyNeedsNameResolution(guest, guests) ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => handleResolveNames(guest)}
                          >
                            Unesi imena
                          </Button>
                        ) : null}
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
                            handleDeleteGuest(
                              guest.id,
                              displayGuestName(guest),
                            )
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
