import { FC, useState } from "react";
import { Guest, Table } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDialog } from "../context/ModalContext";
import { CircleX, Pencil, Trash2, UserPlus } from "lucide-react";
import { useGuests } from "../context/GuestContext";
import Loader from "../loaders/Loader";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import ProgressBar from "../ProgressBar";

type SeatingTableProps = Partial<Table> & {
  guests?: Guest[];
};

const SeatingTable: FC<SeatingTableProps> = ({
  id,
  number_of_guests,
  name,
  guests = [],
}) => {
  const { openModal } = useDialog();
  const { updateGuest } = useGuests();
  const [removingGuestId, setRemovingGuestId] = useState<string | null>(null);

  const addGuestToTable = () => {
    openModal("add_guest_to_table", {
      id,
      data: {
        name,
        number_of_guests,
      },
    });
  };

  const editTable = () => {
    openModal("edit_table", {
      id,
      data: {
        name,
        number_of_guests,
      },
    });
  };

  const handleDeleteTableModal = () => {
    openModal("delete_table", {
      id,
      data: {
        name,
      },
    });
  };

  const removeGuestFromTable = async (guestId: string, guestName: string) => {
    try {
      setRemovingGuestId(guestId);
      await updateGuest(guestId, {
        table_id: null,
      });
      toast.success(`${guestName} je uspešno uklonjen sa stola.`, {
        position: "top-center",
      });
    } catch {
      toast.error("Došlo je do greške. Pokušajte ponovo.", {
        position: "top-center",
      });
    } finally {
      setRemovingGuestId(null);
    }
  };

  const isFull =
    number_of_guests != null && guests.length >= number_of_guests;

  return (
    <Card className="w-full min-w-0 border shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="border-b pb-4">
        <CardTitle className="truncate text-base font-semibold">{name}</CardTitle>
        <CardDescription className="pt-2">
          <ProgressBar
            occupied={guests.length}
            capacity={number_of_guests || 0}
          />
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 pt-1">
        {guests.length > 0 ? (
          guests.map((guest) => (
            <div
              key={guest.id}
              className="flex items-center justify-between gap-3 rounded-xl border bg-muted/20 px-3 py-2"
            >
              <span className="truncate text-sm font-medium">{guest.name}</span>
              {removingGuestId === guest.id ? (
                <Loader size={16} />
              ) : (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <button
                        type="button"
                        className="rounded-md p-1 text-destructive transition-colors hover:bg-destructive/10"
                        onClick={() =>
                          removeGuestFromTable(guest.id, guest.name)
                        }
                        aria-label={`Ukloni ${guest.name}`}
                      >
                        <CircleX className="h-4 w-4" />
                      </button>
                    }
                  />
                  <TooltipContent>
                    <p>Ukloni gosta sa stola: {guest.name}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed bg-muted/20 px-3 py-6 text-center text-sm text-muted-foreground">
            Nema raspoređenih gostiju
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        {isFull ? (
          <Tooltip>
            <TooltipTrigger
              render={
                <span className="inline-block w-full">
                  <Button className="w-full" disabled>
                    <UserPlus className="h-4 w-4" />
                    Dodaj gosta za sto
                  </Button>
                </span>
              }
            />
            <TooltipContent>
              Sto je popunjen. Prvo uklonite nekog gosta.
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button className="w-full cursor-pointer" onClick={addGuestToTable}>
            <UserPlus className="h-4 w-4" />
            Dodaj gosta za sto
          </Button>
        )}

        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            className="flex-1 cursor-pointer"
            onClick={editTable}
          >
            <Pencil className="h-4 w-4" />
            Uredi
          </Button>
          <Button
            className="flex-1 cursor-pointer"
            variant="outline"
            onClick={handleDeleteTableModal}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
            Obriši
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SeatingTable;
