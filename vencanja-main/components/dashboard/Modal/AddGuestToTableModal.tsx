import { Button } from "@/components/ui/button";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const { name, number_of_guests } = data?.data;
  const tableGuests = guests.filter((guest) => guest.table_id === id);

  const guestsForSelect = guests
    .filter((guest) => guest.table_id == null)
    .filter((guest) => guest.rsvp_status === "accepted")
    .map((guest) => ({
      value: guest.id,
      label: guest.name,
    }));

  const addGuests = async () => {
    try {
      await Promise.all(
        selectedGuests.map((guestId) =>
          updateGuest(guestId, {
            table_id: id,
          }),
        ),
      );
      toast.success("Uspešno dodati gosti.", { position: "top-center" });
      closeModal();
    } catch {
      toast.error("Došlo je do greške. Pokušajte ponovo", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>Dodaj Novog Gosta za {name} </SheetTitle>
        <SheetDescription>
          Imate još {number_of_guests - tableGuests.length} slobodna mesta
          <br />
          <ProgressBar
            occupied={tableGuests.length}
            capacity={number_of_guests}
          />
        </SheetDescription>
      </SheetHeader>
      <FieldGroup>
        <Field>
          <p>Gosti koji su potvrdili dolazak</p>
          <GuestMultiSelect
            options={guestsForSelect}
            value={selectedGuests}
            onChange={setSelectedGuests}
            available={number_of_guests - tableGuests.length}
          />
        </Field>
        <div>
          <p>Gosti koji su za stolom:</p>
          {tableGuests.map((guest) => (
            <p key={guest.id}>{guest.name}</p>
          ))}
        </div>
      </FieldGroup>
      <SheetFooter>
        {!!selectedGuests.length && (
          <Button className="cursor-pointer" onClick={addGuests}>
            {loading ? (
              <>
                Dodajem...
                <Loader className="mr-2" size={16} />
              </>
            ) : (
              `Dodaj ${selectedGuests.length} gosta za ${name}`
            )}
          </Button>
        )}
        <Button
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
