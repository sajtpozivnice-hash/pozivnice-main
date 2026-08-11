import { useMemo, useState } from "react";
import { useTables } from "../context/TableContext";
import SeatingTable from "./SeatingTable";
import EmptyMessage from "../EmptyMessage";
import { Button } from "@/components/ui/button";
import { useDialog } from "../context/ModalContext";
import { useGuests } from "../context/GuestContext";
import SectionLoader from "../loaders/SectionLoader";
import SelectInput, { SelectOption } from "../SelectInput";
import { Guest, Table } from "../types";
import {
  Baby,
  Plus,
  UserCheck,
  UserRound,
  UserRoundX,
  Users,
  LayoutGrid,
} from "lucide-react";
import SeatingDownloadMenu from "./SeatingDownloadMenu";
import SearchField from "../shared/SearchField";
import SummaryStats from "../shared/SummaryStats";
import FilterEmptyState from "../shared/FilterEmptyState";
import { compareNameSr, matchesSearchQuery } from "../utils/search";
import { Progress } from "@/components/ui/progress";
import { computeGuestStats, displayGuestName } from "../utils/guestParty";

type TableSortKey =
  | "name-asc"
  | "name-desc"
  | "capacity-desc"
  | "occupied-desc"
  | "free-desc"
  | "fill-desc"
  | "empty-first"
  | "full-first";

type TableWithStats = Table & {
  occupied: number;
  free: number;
  fillRatio: number;
};

const SORT_OPTIONS: SelectOption[] = [
  { label: "Naziv (A–Ž)", value: "name-asc" },
  { label: "Naziv (Ž–A)", value: "name-desc" },
  { label: "Kapacitet (veći → manji)", value: "capacity-desc" },
  { label: "Broj gostiju (veći → manji)", value: "occupied-desc" },
  { label: "Slobodna mesta", value: "free-desc" },
  { label: "Popunjenost", value: "fill-desc" },
  { label: "Prazni stolovi prvo", value: "empty-first" },
  { label: "Puni stolovi prvo", value: "full-first" },
];

const sortTables = (tables: TableWithStats[], sortKey: TableSortKey) => {
  const sorted = [...tables];

  sorted.sort((a, b) => {
    switch (sortKey) {
      case "name-desc":
        return compareNameSr(b.name, a.name);
      case "capacity-desc":
        return (
          b.number_of_guests - a.number_of_guests || compareNameSr(a.name, b.name)
        );
      case "occupied-desc":
        return b.occupied - a.occupied || compareNameSr(a.name, b.name);
      case "free-desc":
        return b.free - a.free || compareNameSr(a.name, b.name);
      case "fill-desc":
        return b.fillRatio - a.fillRatio || compareNameSr(a.name, b.name);
      case "empty-first": {
        const aEmpty = a.occupied === 0 ? 0 : 1;
        const bEmpty = b.occupied === 0 ? 0 : 1;
        return (
          aEmpty - bEmpty ||
          a.fillRatio - b.fillRatio ||
          compareNameSr(a.name, b.name)
        );
      }
      case "full-first": {
        const aFull =
          a.occupied >= a.number_of_guests && a.number_of_guests > 0 ? 0 : 1;
        const bFull =
          b.occupied >= b.number_of_guests && b.number_of_guests > 0 ? 0 : 1;
        return (
          aFull - bFull ||
          b.fillRatio - a.fillRatio ||
          compareNameSr(a.name, b.name)
        );
      }
      case "name-asc":
      default:
        return compareNameSr(a.name, b.name);
    }
  });

  return sorted;
};

const getGuestsForTable = (guests: Guest[], tableId: string) =>
  guests.filter((guest) => guest.table_id === tableId);

const SeatingTableContainer = () => {
  const { tables, loading } = useTables();
  const { openModal } = useDialog();
  const { guests } = useGuests();
  const [sortKey, setSortKey] = useState<TableSortKey>("name-asc");
  const [searchQuery, setSearchQuery] = useState("");

  const guestStats = useMemo(() => computeGuestStats(guests), [guests]);

  const addTableHandler = () => {
    openModal("add_table");
  };

  const unassignedGuests = useMemo(
    () =>
      guests.filter(
        (guest) =>
          guest.rsvp_status === "accepted" &&
          !guest.name_pending &&
          Boolean(guest.name.trim()) &&
          !guest.table_id &&
          !guest.tables?.id,
      ),
    [guests],
  );

  const summary = useMemo(() => {
    const capacity = tables.reduce(
      (sum, table) => sum + table.number_of_guests,
      0,
    );
    const occupied = guests.filter(
      (guest) => Boolean(guest.table_id) && !guest.name_pending,
    ).length;
    const free = Math.max(capacity - occupied, 0);
    const fill = capacity > 0 ? Math.round((occupied / capacity) * 100) : 0;
    return {
      tables: tables.length,
      capacity,
      occupied,
      free,
      fill,
      unassigned: unassignedGuests.length,
    };
  }, [tables, guests, unassignedGuests.length]);

  const sortedTables = useMemo(() => {
    const withStats: TableWithStats[] = tables.map((table) => {
      const occupied = getGuestsForTable(guests, table.id).length;
      const free = Math.max(table.number_of_guests - occupied, 0);
      const fillRatio =
        table.number_of_guests > 0 ? occupied / table.number_of_guests : 0;

      return { ...table, occupied, free, fillRatio };
    });

    const filtered = withStats.filter((table) => {
      if (!searchQuery.trim()) return true;
      const tableGuests = getGuestsForTable(guests, table.id);
      return matchesSearchQuery(
        [table.name, ...tableGuests.map((guest) => displayGuestName(guest))],
        searchQuery,
      );
    });

    return sortTables(filtered, sortKey);
  }, [tables, guests, sortKey, searchQuery]);

  if (loading && tables.length === 0) {
    return <SectionLoader />;
  }

  if (tables.length === 0) {
    return (
      <EmptyMessage
        title="Nemate definisan raspored sedenja"
        description="Kreirajte novi sto kako biste mogli da rasporedite goste."
        icon={LayoutGrid}
        accent="seating"
        action={
          <Button className="cursor-pointer" onClick={addTableHandler}>
            Kreiraj novi sto
          </Button>
        }
      />
    );
  }

  return (
    <div className="w-full min-w-0 space-y-4">
      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Organizujte stolove i rasporedite goste po mestima.
        </p>
        <div className="grid w-full grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:w-auto">
          <SeatingDownloadMenu />
          <Button
            className="h-9 w-full cursor-pointer"
            onClick={addTableHandler}
          >
            <Plus className="h-4 w-4" />
            Novi sto
          </Button>
        </div>
      </div>

      <SummaryStats
        className="sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"
        items={[
          {
            label: "Ukupno gostiju",
            value: String(guestStats.total),
            icon: Users,
            tone: "sky",
          },
          {
            label: "Odrasli",
            value: String(guestStats.adults),
            icon: UserRound,
            tone: "violet",
          },
          {
            label: "Deca",
            value: String(guestStats.children),
            icon: Baby,
            tone: "orange",
          },
          {
            label: "Potvrđeni",
            value: String(guestStats.accepted),
            icon: UserCheck,
            tone: "emerald",
          },
          {
            label: "Zauzeto / kapacitet",
            value: `${summary.occupied}/${summary.capacity}`,
            icon: LayoutGrid,
            tone: "violet",
            progress: summary.fill,
          },
          {
            label: "Neraspoređeni",
            value: String(summary.unassigned),
            icon: UserRoundX,
            tone: "orange",
          },
        ]}
      />

      <div className="rounded-2xl border border-violet-200/60 bg-gradient-to-br from-violet-50/70 to-white px-4 py-3">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="text-muted-foreground">Popunjenost mesta</span>
          <span className="font-medium text-violet-700">{summary.fill}%</span>
        </div>
        <Progress
          value={summary.fill}
          className="gap-0 [&_[data-slot=progress-indicator]]:bg-violet-500"
        />
      </div>

      {unassignedGuests.length > 0 ? (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3">
          <p className="text-sm font-medium text-foreground">
            {unassignedGuests.length} gostiju sa statusom „Dolazi” još nije
            raspoređeno
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {unassignedGuests
              .slice(0, 6)
              .map((guest) => displayGuestName(guest))
              .join(", ")}
            {unassignedGuests.length > 6
              ? ` i još ${unassignedGuests.length - 6}`
              : ""}
          </p>
        </div>
      ) : null}

      <div className="flex w-full min-w-0 flex-col gap-3">
        <SearchField
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Traži po nazivu stola ili imenu gosta..."
        />
        <div className="space-y-1.5">
          <p className="text-sm text-foreground">Sortiraj</p>
          <SelectInput
            items={SORT_OPTIONS}
            value={sortKey}
            onChange={(value) => {
              if (value) setSortKey(value as TableSortKey);
            }}
          />
        </div>
      </div>

      {sortedTables.length === 0 ? (
        <FilterEmptyState
          title="Nema stolova za izabranu pretragu"
          onReset={() => setSearchQuery("")}
          resetLabel="Obriši pretragu"
        />
      ) : (
        <div className="w-full min-w-0 columns-1 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3 xl:columns-4">
          {sortedTables.map((table) => {
            const tableGuests = getGuestsForTable(guests, table.id);

            return (
              <div
                key={table.id}
                className="mb-4 w-full min-w-0 break-inside-avoid"
              >
                <SeatingTable
                  id={table.id}
                  name={table.name}
                  number_of_guests={table.number_of_guests}
                  guests={tableGuests}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SeatingTableContainer;
