import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDialog } from "../context/ModalContext";
import { useGuests } from "../context/GuestContext";
import GuestMultiSelect from "../RasporedSedenja/GuestMultiSelect";
import { useState } from "react";
import { toast } from "sonner";
import ProgressBar from "../ProgressBar";
import Loader from "../loaders/Loader";

const AddGuestToTableModal = () => {
  const { closeModal, data } = useDialog();
  const { guests, updateGuest, loading } = useGuests();
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);

  const id = data?.id ?? "";
  const name = data?.data?.name ?? "sto";
  const numberOfGuests = Number(data?.data?.number_of_guests ?? 0);

  const tableGuests = guests.filter((guest) => guest.table_id === id);
  const availableSeats = Math.max(numberOfGuests - tableGuests.length, 0);

  const guestsForSelect = guests
    .filter((guest) => guest.table_id == null)
    .filter((guest) => guest.rsvp_status === "accepted")
    .map((guest) => ({
      value: guest.id,
      label: guest.name,
    }));

  const addGuests = async () => {
    if (!id) return;

    if (selectedGuests.length === 0) {
      toast.error("Izaberite bar jednog gosta.", { position: "top-center" });
      return;
    }

    if (selectedGuests.length > availableSeats) {
      toast.error(`Možete dodati još ${availableSeats} gosta.`, {
        position: "top-center",
      });
      return;
    }

    try {
      await Promise.all(
        selectedGuests.map((guestId) =>
          updateGuest(guestId, {
            table_id: id,
          }),
        ),
      );
      toast.success("Gosti su uspešno dodati za sto.", {
        position: "top-center",
      });
      closeModal();
    } catch {
      toast.error("Došlo je do greške. Pokušajte ponovo.", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <SheetHeader className="space-y-2">
        <SheetTitle>Dodaj goste za {name}</SheetTitle>
        <SheetDescription>
          Izaberite goste koji su potvrdili dolazak i još nisu raspoređeni.
        </SheetDescription>
      </SheetHeader>

      <div className="space-y-4">
        <div className="rounded-xl border bg-muted/20 p-4">
          <ProgressBar occupied={tableGuests.length} capacity={numberOfGuests} />
        </div>

        <FieldGroup className="rounded-xl border bg-muted/20 p-4">
          <Field>
            <FieldLabel>Dostupni gosti</FieldLabel>
            <FieldDescription>
              Preostalo mesta: {availableSeats}
            </FieldDescription>
            {guestsForSelect.length === 0 ? (
              <div className="rounded-xl border border-dashed bg-background px-3 py-4 text-center text-sm text-muted-foreground">
                Nema slobodnih gostiju sa statusom „Dolazi“.
              </div>
            ) : (
              <GuestMultiSelect
                options={guestsForSelect}
                value={selectedGuests}
                onChange={setSelectedGuests}
                available={availableSeats}
              />
            )}
          </Field>

          <div className="space-y-2">
            <p className="text-sm font-medium">Gosti za ovim stolom</p>
            {tableGuests.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Trenutno nema raspoređenih gostiju.
              </p>
            ) : (
              <div className="space-y-2">
                {tableGuests.map((guest) => (
                  <div
                    key={guest.id}
                    className="rounded-lg border bg-background px-3 py-2 text-sm"
                  >
                    {guest.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </FieldGroup>
      </div>

      <SheetFooter>
        <Button
          className="cursor-pointer"
          onClick={addGuests}
          disabled={loading || selectedGuests.length === 0}
        >
          {loading ? (
            <>
              Dodajem...
              <Loader className="mr-2" size={16} />
            </>
          ) : (
            `Dodaj ${selectedGuests.length || ""} gosta`
          )}
        </Button>
        <Button
          type="button"
          className="cursor-pointer"
          variant="outline"
          onClick={closeModal}
        >
          Odustani
        </Button>
      </SheetFooter>
    </>
  );
};

export default AddGuestToTableModal;
