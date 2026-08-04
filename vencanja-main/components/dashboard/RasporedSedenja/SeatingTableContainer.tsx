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
import { ArrowUpDown, Plus } from "lucide-react";
import SeatingDownloadMenu from "./SeatingDownloadMenu";

type TableSortKey =
  | "name-asc"
  | "name-desc"
  | "capacity-asc"
  | "capacity-desc"
  | "occupied-asc"
  | "occupied-desc"
  | "free-asc"
  | "free-desc"
  | "fill-asc"
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
  { label: "Kapacitet (manji → veći)", value: "capacity-asc" },
  { label: "Kapacitet (veći → manji)", value: "capacity-desc" },
  { label: "Broj gostiju (manji → veći)", value: "occupied-asc" },
  { label: "Broj gostiju (veći → manji)", value: "occupied-desc" },
  { label: "Slobodna mesta (manje → više)", value: "free-asc" },
  { label: "Slobodna mesta (više → manje)", value: "free-desc" },
  { label: "Popunjenost (manja → veća)", value: "fill-asc" },
  { label: "Popunjenost (veća → manja)", value: "fill-desc" },
  { label: "Prazni stolovi prvo", value: "empty-first" },
  { label: "Puni stolovi prvo", value: "full-first" },
];

const compareName = (a: string, b: string) =>
  a.localeCompare(b, "sr", { sensitivity: "base", numeric: true });

const sortTables = (tables: TableWithStats[], sortKey: TableSortKey) => {
  const sorted = [...tables];

  sorted.sort((a, b) => {
    switch (sortKey) {
      case "name-asc":
        return compareName(a.name, b.name);
      case "name-desc":
        return compareName(b.name, a.name);
      case "capacity-asc":
        return (
          a.number_of_guests - b.number_of_guests || compareName(a.name, b.name)
        );
      case "capacity-desc":
        return (
          b.number_of_guests - a.number_of_guests || compareName(a.name, b.name)
        );
      case "occupied-asc":
        return a.occupied - b.occupied || compareName(a.name, b.name);
      case "occupied-desc":
        return b.occupied - a.occupied || compareName(a.name, b.name);
      case "free-asc":
        return a.free - b.free || compareName(a.name, b.name);
      case "free-desc":
        return b.free - a.free || compareName(a.name, b.name);
      case "fill-asc":
        return a.fillRatio - b.fillRatio || compareName(a.name, b.name);
      case "fill-desc":
        return b.fillRatio - a.fillRatio || compareName(a.name, b.name);
      case "empty-first": {
        const aEmpty = a.occupied === 0 ? 0 : 1;
        const bEmpty = b.occupied === 0 ? 0 : 1;
        return (
          aEmpty - bEmpty ||
          a.fillRatio - b.fillRatio ||
          compareName(a.name, b.name)
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
          compareName(a.name, b.name)
        );
      }
      default:
        return 0;
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

  const addTableHandler = () => {
    openModal("add_table");
  };

  const sortedTables = useMemo(() => {
    const withStats: TableWithStats[] = tables.map((table) => {
      const occupied = getGuestsForTable(guests, table.id).length;
      const free = Math.max(table.number_of_guests - occupied, 0);
      const fillRatio =
        table.number_of_guests > 0 ? occupied / table.number_of_guests : 0;

      return { ...table, occupied, free, fillRatio };
    });

    return sortTables(withStats, sortKey);
  }, [tables, guests, sortKey]);

  if (loading && tables.length === 0) {
    return <SectionLoader />;
  }

  if (tables.length === 0) {
    return (
      <EmptyMessage
        title="Nemate definisan raspored sedenja"
        description="Kreirajte novi sto kako biste mogli da rasporedite goste."
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
      <div className="flex w-full min-w-0 flex-col gap-3">
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
                if (value) setSortKey(value as TableSortKey);
              }}
              placeholder="Izaberite sortiranje"
            />
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 min-[420px]:grid-cols-2">
          <SeatingDownloadMenu />
          <Button
            variant="default"
            className="h-9 w-full cursor-pointer"
            onClick={addTableHandler}
          >
            <Plus className="h-4 w-4" />
            <span className="min-[420px]:hidden">Novi sto</span>
            <span className="hidden min-[420px]:inline">Kreiraj Novi Sto</span>
          </Button>
        </div>
      </div>

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
    </div>
  );
};

export default SeatingTableContainer;
