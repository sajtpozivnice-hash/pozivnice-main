import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useGuests } from "../context/GuestContext";
import { useState } from "react";
import { CreateGuestDto } from "../types";
import { useDialog } from "../context/ModalContext";
import Loader from "../loaders/Loader";
import SelectInput, { SelectOption } from "../SelectInput";
import { useTables } from "../context/TableContext";

export const statusSelect = [
  {
    label: "Jos uvek ne zna",
    value: "pending",
  },
  {
    label: "Dolazi",
    value: "accepted",
  },
  {
    label: "Ne Dolazi",
    value: "declined",
  },
];
export type RSVPStatus = "pending" | "accepted" | "declined";
const AddNewGuestModal = () => {
  const { closeModal } = useDialog();
  const { createGuest, loading } = useGuests();
  const { tables } = useTables();

  const [form, setForm] = useState<CreateGuestDto>({
    name: "",
    notes: "",
    email: "",
    rsvp_status: "pending",
    message: "",
    table_id: undefined,
  });

  const tablesForSelect: SelectOption[] = tables.map((table) => ({
    label: table.name,
    value: table.id,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.rsvp_status) {
      toast.error("Izaberite status dolaska.", { position: "top-center" });
      return;
    }
    try {
      await createGuest(form);
      toast.success("Gost je uspešno dodat.", { position: "top-center" });
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
        <SheetTitle>Dodaj Novog Gosta</SheetTitle>
        <SheetDescription>ovde ide opis</SheetDescription>
      </SheetHeader>
      <form onSubmit={submitHandler}>
        <FieldGroup>
          <Field>
            <Label htmlFor="name">Ime I Prezime</Label>
            <Input
              id="name"
              name="name"
              placeholder="npr. Marko Markovic"
              onChange={handleChange}
              value={form.name}
            />
          </Field>
          <Field>
            <Label htmlFor="email">Email Adresa</Label>
            <Input
              id="email"
              name="email"
              placeholder="npr. nikola@gmail.com"
              onChange={handleChange}
              value={form.email ?? ""}
            />
          </Field>
          <Field>
            <Label htmlFor="notes">Napomene</Label>
            <Input
              id="notes"
              name="notes"
              placeholder="Mozete navesti da li gost posti..."
              value={form.notes ?? ""}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <Label htmlFor="notes">Status Dolaska</Label>
            <SelectInput
              items={statusSelect}
              value={form.rsvp_status}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  rsvp_status: value,
                }))
              }
            />
          </Field>
          <Field>
            <Label htmlFor="table">Izaberi Sto</Label>
            <SelectInput
              disabled={
                form.rsvp_status === "declined" ||
                form.rsvp_status === "pending"
              }
              items={tablesForSelect}
              value={form.table_id ?? ""}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  table_id: value,
                }))
              }
            />
          </Field>
          <Field>
            <Label htmlFor="message">Poruka</Label>
            <Input
              id="message"
              name="message"
              placeholder="Poruka"
              value={form.message ?? ""}
              onChange={handleChange}
            />
          </Field>
        </FieldGroup>

        <SheetFooter>
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? (
              <>
                Čuvanje...
                <Loader className="mr-2" size={16} />
              </>
            ) : (
              "Dodaj gosta"
            )}
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={closeModal}
          >
            Odustani
          </Button>
        </SheetFooter>
      </form>
    </>
  );
};

export default AddNewGuestModal;
