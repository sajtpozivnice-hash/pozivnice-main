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
import { useEffect, useState } from "react";
import { Table } from "../types";
import { useTables } from "../context/TableContext";
import { toast } from "sonner";
import Loader from "../loaders/Loader";
import { useGuests } from "../context/GuestContext";

const EditTableModal = () => {
  const { data, closeModal } = useDialog();
  const { guests } = useGuests();
  const { updateTable, loading } = useTables();
  const id = data?.id ?? "";
  const { name, number_of_guests } = data?.data;
  const [form, setForm] = useState<Partial<Table>>({
    name: "",
    number_of_guests: 1,
  });

  const currentGuestsCount = guests.filter(
    (guest) => guest.table_id === id,
  ).length;

  useEffect(() => {
    setForm({
      name: name,
      number_of_guests: number_of_guests,
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    if (
      form.number_of_guests != null &&
      form.number_of_guests < currentGuestsCount
    ) {
      toast.error(
        `Za ovim stolom trenutno sedi ${currentGuestsCount} gostiju. Najpre premestite ili uklonite goste.`,
      );
      return;
    }
    e.preventDefault();
    try {
      await updateTable(id, form);
      toast.success("Sto je uspešno izmenjen.", { position: "top-center" });
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
        <SheetTitle>Uredi {name}</SheetTitle>
        <SheetDescription>ovde ide opis</SheetDescription>
      </SheetHeader>
      <div>ovde ide spisak gostiju</div>
      <form onSubmit={submitHandler}>
        <FieldGroup>
          <Field>
            <Label htmlFor="name">Naizv Stola</Label>
            <Input
              id="name"
              name="name"
              value={form.name ?? ""}
              onChange={handleChange}
              placeholder="Upisite naziv Stola"
            />
          </Field>
          <Field>
            <Label htmlFor="number_of_guests">Broj mesta za stolom</Label>
            <Input
              id="number_of_guests"
              name="number_of_guests"
              type="number"
              min={currentGuestsCount || 1}
              value={form.number_of_guests}
              onChange={handleChange}
            />
          </Field>
          <p className="text-xs text-muted-foreground">
            Trenutno raspoređeno gostiju:{" "}
            <span className="font-semibold">{currentGuestsCount}</span>
          </p>
        </FieldGroup>
        <SheetFooter>
          <Button type="submit">
            {loading ? (
              <>
                Čuvanje...
                <Loader className="mr-2" size={16} />
              </>
            ) : (
              "Izmeni sto"
            )}
          </Button>
          <Button variant="outline" onClick={closeModal}>
            Odustani
          </Button>
        </SheetFooter>
      </form>
    </>
  );
};

export default EditTableModal;
