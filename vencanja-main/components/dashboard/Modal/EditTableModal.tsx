import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDialog } from "../context/ModalContext";
import { useState } from "react";
import { CreateTableDto } from "../types";
import { useTables } from "../context/TableContext";
import { toast } from "sonner";
import Loader from "../loaders/Loader";
import { useGuests } from "../context/GuestContext";

const EditTableModal = () => {
  const { data, closeModal } = useDialog();
  const { guests } = useGuests();
  const { updateTable, loading } = useTables();
  const id = data?.id ?? "";
  const name = data?.data?.name ?? "";
  const numberOfGuests = Number(data?.data?.number_of_guests ?? 1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<CreateTableDto>({
    name,
    number_of_guests: numberOfGuests,
  });
  const [sourceKey, setSourceKey] = useState(id);

  if (id !== sourceKey) {
    setSourceKey(id);
    setForm({ name, number_of_guests: numberOfGuests });
  }

  const currentGuestsCount = guests.filter(
    (guest) => guest.table_id === id,
  ).length;
  const tableGuests = guests.filter((guest) => guest.table_id === id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [fieldName]: fieldName === "number_of_guests" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      nextErrors.name = "Naziv stola je obavezan.";
    }

    if (!form.number_of_guests || form.number_of_guests < 1) {
      nextErrors.number_of_guests = "Unesite najmanje 1 mesto.";
    }

    if (form.number_of_guests < currentGuestsCount) {
      nextErrors.number_of_guests = `Trenutno sedi ${currentGuestsCount} gostiju. Prvo ih premestite.`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Proverite uneta polja.", { position: "top-center" });
      return;
    }

    try {
      await updateTable(id, {
        name: form.name.trim(),
        number_of_guests: Number(form.number_of_guests),
      });
      toast.success("Sto je uspešno izmenjen.", { position: "top-center" });
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
        <SheetTitle>Uredi sto</SheetTitle>
        <SheetDescription>
          Izmenite naziv i kapacitet stola {name ? `„${name}“` : ""}.
        </SheetDescription>
      </SheetHeader>

      <form onSubmit={submitHandler} className="space-y-6">
        <FieldGroup className="rounded-xl border bg-muted/20 p-4">
          <Field>
            <FieldLabel htmlFor="name">Naziv stola</FieldLabel>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Unesite naziv stola"
            />
            {errors.name ? (
              <p className="text-sm text-destructive">{errors.name}</p>
            ) : null}
          </Field>
          <Field>
            <FieldLabel htmlFor="number_of_guests">Broj mesta</FieldLabel>
            <FieldDescription>
              Trenutno raspoređeno: {currentGuestsCount}
            </FieldDescription>
            <Input
              id="number_of_guests"
              name="number_of_guests"
              type="number"
              min={currentGuestsCount || 1}
              value={form.number_of_guests}
              onChange={handleChange}
            />
            {errors.number_of_guests ? (
              <p className="text-sm text-destructive">
                {errors.number_of_guests}
              </p>
            ) : null}
          </Field>

          <div className="space-y-2">
            <p className="text-sm font-medium">Gosti za stolom</p>
            {tableGuests.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nema gostiju.</p>
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

        <SheetFooter>
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? (
              <>
                Čuvanje...
                <Loader className="mr-2" size={16} />
              </>
            ) : (
              "Sačuvaj izmene"
            )}
          </Button>
          <Button
            type="button"
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

export default EditTableModal;
