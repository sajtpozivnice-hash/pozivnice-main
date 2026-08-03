import { Card, CardTitle } from "@/components/ui/card";
import { useTables } from "../context/TableContext";
import SeatingTable from "./SeatingTable";
import EmptyMessage from "../EmptyMessage";
import { Button } from "@/components/ui/button";
import { useDialog } from "../context/ModalContext";
import { useGuests } from "../context/GuestContext";

const SeatingTableContainer = () => {
  const { tables } = useTables();
  const { openModal } = useDialog();
  const { guests } = useGuests();

  const addTableHandler = () => {
    openModal("add_table");
  };

  return (
    <div className="flex flex-wrap gap-4">
      {tables.length > 0 ? (
        tables.map((table) => {
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
        })
      ) : (
        <EmptyMessage
          title={"Nemate Definisan Raspored Sedenja"}
          description={
            "Kreiraj novi sto kako bi mogli da kreirate raspored sedenja"
          }
          action={
            <Button className="cursor-pointer" onClick={addTableHandler}>
              Kreiraj Novi Sto
            </Button>
          }
        />
      )}
    </div>
  );
};

export default SeatingTableContainer;
