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
import { CircleX } from "lucide-react";
import { useGuests } from "../context/GuestContext";
import Loader from "../loaders/Loader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
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

  const removeGuestFromTable = async (id: string, data: Partial<Guest>) => {
    console.log(data, "data");
    try {
      setRemovingGuestId(id);
      await updateGuest(id, data);
      toast.success(`${data.name} je uspesno uklonjen.`, {
        position: "top-center",
      });
    } catch {
      setRemovingGuestId(null);
    }
  };

  const isFull = number_of_guests != null && guests.length >= number_of_guests;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <ProgressBar
            occupied={guests.length}
            capacity={number_of_guests || 0}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        {guests.length > 0 ? (
          <div className="space-y-2">
            {guests.map((guest) => (
              <div
                key={guest.id}
                className="flex items-center justify-between rounded-md border p-1"
              >
                <span>{guest.name}</span>
                {removingGuestId === guest.id ? (
                  <Loader />
                ) : (
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <CircleX
                          onClick={() =>
                            removeGuestFromTable(guest.id, {
                              table_id: null,
                              name: guest.name,
                            })
                          }
                          className="cursor-pointer"
                          color="red"
                        />
                      }
                    />
                    <TooltipContent>
                      <p>Ukloni gosta sa stola: {guest.name}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Nema raspoređenih gostiju
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {isFull ? (
          <Tooltip>
            <TooltipTrigger>
              <span className="inline-block w-full">
                <Button className="w-full" disabled>
                  Dodaj Gosta Za Sto
                </Button>
              </span>
            </TooltipTrigger>

            <TooltipContent>
              Sto je popunjen. Prvo uklonite nekog gosta.
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button className="w-full" onClick={addGuestToTable}>
            Dodaj Gosta Za Sto
          </Button>
        )}

        <div className="flex">
          <Button className="flex-1 cursor-pointer" onClick={editTable}>
            Uredi Sto
          </Button>

          <Button
            className="flex-1 cursor-pointer"
            variant="destructive"
            onClick={handleDeleteTableModal}
          >
            Obriši Sto
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SeatingTable;
