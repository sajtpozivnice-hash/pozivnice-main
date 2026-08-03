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
import { toast } from "sonner";

import { useEffect, useState } from "react";
import { useDialog } from "../context/ModalContext";
import { CreateGuestDto } from "../types";
import { useGuests } from "../context/GuestContext";
import { useTables } from "../context/TableContext";
import SelectInput, { SelectOption } from "../SelectInput";
import Loader from "../loaders/Loader";
import { statusSelect } from "./AddNewGuestModal";
import { MinusCircle, PlusCircle } from "lucide-react";
const EditGuestModal = () => {
  const { data, closeModal } = useDialog();
  const { updateGuest, loading, guests } = useGuests();
  const { tables, createTable, loading: tablesLoading } = useTables();
  const [showTableForm, setShowTableForm] = useState(false);
  const [form, setForm] = useState<CreateGuestDto>({
    name: "",
    email: "",
    rsvp_status: "",
    message: "",
    notes: "",
    table_id: "",
  });
  const [newTable, setNewTable] = useState({
    new_table_name: "",
    new_number_of_guests: 1,
  });
  console.log(data, "data");

  const tableOccupancy = tables.reduce(
    (acc, table) => {
      acc[table.id] = guests.filter(
        (guest) => guest.table_id === table.id,
      ).length;

      return acc;
    },
    {} as Record<string, number>,
  );

  const tablesForSelect: SelectOption[] = tables.map((table) => ({
    label: table.name,
    value: table.id,
    disabled: tableOccupancy[table.id] >= table.number_of_guests,
  }));

  useEffect(() => {
    if (!data) return;
    setForm({
      name: data?.data.name,
      email: data?.data.email,
      rsvp_status: data?.data.rsvp_status,
      message: data?.data.message,
      notes: data?.data.notes,
      table_id: data?.data.table_id,
    });
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTable((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    const isChangingTable = form.table_id !== data?.data.table_id;
    if (isChangingTable && form.table_id) {
      const selectedTable = tables.find((table) => table.id === form.table_id);

      if (selectedTable) {
        const guestsAtTable = guests.filter(
          (guest) => guest.table_id === selectedTable.id,
        ).length;

        if (guestsAtTable >= selectedTable.number_of_guests) {
          toast.error("Izabrani sto je popunjen.");
          return;
        }
      }
    }
    e.preventDefault();
    try {
      await updateGuest(data?.id || "", {
        ...form,
      });
      toast.success("Gost je uspešno Izmenjen.", { position: "top-center" });
      closeModal();
    } catch {
      toast.error("Došlo je do greške. Pokušajte ponovo", {
        position: "top-center",
      });
    }
  };

  const submitNewTableHandler = async () => {
    try {
      await createTable({
        name: newTable.new_table_name,
        number_of_guests: newTable.new_number_of_guests,
      });
      toast.success("Sto je uspešno dodat.", { position: "top-center" });
    } catch {
      toast.error("Došlo je do greške. Pokušajte ponovo", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>Izmenite Podatke o Gostu</SheetTitle>
        <SheetDescription>ovde ide opis</SheetDescription>
      </SheetHeader>
      <form onSubmit={submitHandler}>
        <FieldGroup>
          <Field>
            <Label htmlFor="name-1">Ime I Prezime</Label>
            <Input
              id="name"
              name="name"
              placeholder="Marko Markovic"
              value={form.name}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <Label htmlFor="email">Email Adresa</Label>
            <Input
              id="email"
              name="email"
              placeholder="npr. nikola@gmail.com"
              value={form.email ?? ""}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <Label htmlFor="status">Status Dolaska</Label>
            <SelectInput
              items={statusSelect}
              value={form.rsvp_status ?? ""}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  rsvp_status: value,
                }))
              }
            />
          </Field>
          <Field>
            {tables.length === 0 ? (
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    {!showTableForm
                      ? "Kliknite na + da bi dodali novi sto."
                      : "Kreiraj novi sto"}
                  </p>
                  {showTableForm ? (
                    <MinusCircle
                      onClick={() => setShowTableForm(false)}
                      size={30}
                      className="cursor-pointer"
                    />
                  ) : (
                    <PlusCircle
                      onClick={() => setShowTableForm(true)}
                      size={30}
                      className="cursor-pointer"
                    />
                  )}
                </div>

                {showTableForm && (
                  <>
                    <Field>
                      <Label htmlFor="new_table_name">Ime Stola</Label>
                      <Input
                        id="new_table_name"
                        name="new_table_name"
                        placeholder="npr. sto broj 1"
                        value={newTable.new_table_name ?? ""}
                        onChange={handleTableChange}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="new_number_of_guests">
                        Broj mesta za stolom
                      </Label>
                      <Input
                        id="new_number_of_guests"
                        name="new_number_of_guests"
                        type="number"
                        min={1}
                        value={newTable.new_number_of_guests ?? ""}
                        onChange={handleTableChange}
                      />
                    </Field>
                    <Button onClick={submitNewTableHandler}>
                      {tablesLoading ? (
                        <>
                          <Loader className="mr-2" size={16} />
                          Kreiram novi sto...
                        </>
                      ) : (
                        "Kreiraj novi sto"
                      )}
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <>
                <Label htmlFor="table">Sto</Label>
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
              </>
            )}
          </Field>

          <Field>
            <Label htmlFor="notes">Napomene</Label>
            <Input
              id="notes"
              name="notes"
              placeholder="Npr, gost posti, alergican je na nesto"
              value={form.notes ?? ""}
              onChange={handleChange}
            />
          </Field>
        </FieldGroup>
        <SheetFooter>
          <Button type="submit" className="cursor-pointer">
            {loading ? (
              <>
                <Loader className="mr-2" size={16} />
                Izmene u toku...
              </>
            ) : (
              "Potvrdi Izmene"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={closeModal}
            className="cursor-pointer"
          >
            Odustani
          </Button>
        </SheetFooter>
      </form>
    </>
  );
};

export default EditGuestModal;
