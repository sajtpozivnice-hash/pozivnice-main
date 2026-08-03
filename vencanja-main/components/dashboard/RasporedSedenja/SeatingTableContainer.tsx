import { useTables } from "../context/TableContext";
import SeatingTable from "./SeatingTable";
import EmptyMessage from "../EmptyMessage";
import { Button } from "@/components/ui/button";
import { useDialog } from "../context/ModalContext";
import { useGuests } from "../context/GuestContext";
import SectionLoader from "../loaders/SectionLoader";

const SeatingTableContainer = () => {
  const { tables, loading } = useTables();
  const { openModal } = useDialog();
  const { guests } = useGuests();

  const addTableHandler = () => {
    openModal("add_table");
  };

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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {tables.map((table) => {
        const tableGuests = guests.filter(
          (guest) => guest.table_id === table.id,
        );

        return (
          <SeatingTable
            key={table.id}
            id={table.id}
            name={table.name}
            number_of_guests={table.number_of_guests}
            guests={tableGuests}
          />
        );
      })}
    </div>
  );
};

export default SeatingTableContainer;
