import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDialog } from "../context/ModalContext";
import { useGuests } from "../context/GuestContext";
import { CreateGuestDto, RSVPStatus } from "../types";
import EmptyMessage from "../EmptyMessage";
import { Badge } from "@/components/ui/badge";

const rsvpStatusMap = (status: RSVPStatus) => {
  switch (status) {
    case "accepted":
      return (
        <Badge
          className="bg-green-100 text-green-700 border-green-200"
          variant="outline"
        >
          Dolazi
        </Badge>
      );
    case "declined":
      return (
        <Badge
          className="bg-red-100 text-red-700 border-red-200"
          variant="destructive"
        >
          Ne dolazi
        </Badge>
      );
    case "pending":
      return (
        <Badge
          className="bg-amber-100 text-amber-600 border-amber-200"
          variant="outline"
        >
          Jos uvek ne zna
        </Badge>
      );
  }
};

const PotvrdjeniDolasci = () => {
  const { openModal } = useDialog();
  const { guests } = useGuests();

  const handleNewGuestModal = () => {
    openModal("add_guest");
  };

  const handleEditGuest = (id: string, data: CreateGuestDto) => {
    openModal("edit_guest", {
      id,
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

  console.log(guests, "guests");

  const formattedDate = (a: string) => new Date(a).toLocaleDateString("sr-RS");

  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {guests.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Ime i Prezime</TableHead>
                <TableHead className="w-[80px]">Dolazi</TableHead>
                <TableHead className="w-[80px]">Broj Gostiju</TableHead>
                <TableHead className="w-[100px]">Datum Potvrde</TableHead>
                <TableHead className="w-[200px]">Poruka</TableHead>
                <TableHead className="w-[200px]">Sto</TableHead>
                <TableHead className="w-[200px]">Napomene</TableHead>
                <TableHead className="w-[200px]">Akcije</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell className="font-medium text-foreground">
                    {guest.name}
                  </TableCell>
                  <TableCell>{rsvpStatusMap(guest.rsvp_status)}</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell>{formattedDate(guest.updated_at)}</TableCell>
                  <TableCell>{guest.message}</TableCell>
                  <TableCell>
                    {guest.tables?.name ?? "Nije raspoređen"}
                  </TableCell>
                  <TableCell>{guest.notes}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="destructive"
                      className="cursor-pointer bg-red-100 text-red-700 border-red-200"
                      onClick={() => handleDeleteGuest(guest.id, guest.name)}
                    >
                      Ukloni
                    </Button>
                    <Button
                      className="cursor-pointer"
                      onClick={() =>
                        handleEditGuest(guest.id, {
                          name: guest.name,
                          email: guest.email,
                          rsvp_status: guest.rsvp_status,
                          message: guest.message,
                          notes: guest.notes,
                          table_id: guest.tables?.id,
                        })
                      }
                    >
                      Izmeni
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyMessage
            title="Nemate potvrdjenih dolazaka gostiju"
            description="Mozete sami dodati goste ukoliko vam neko nije potvrdio putem platforme"
            action={
              <Button variant="default" onClick={handleNewGuestModal}>
                Dodaj novog gosta
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};

export default PotvrdjeniDolasci;
