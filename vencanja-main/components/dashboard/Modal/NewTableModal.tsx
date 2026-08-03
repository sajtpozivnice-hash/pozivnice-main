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
import { useTables } from "../context/TableContext";
import { CreateTableDto } from "../types";
import { useState } from "react";
import { toast } from "sonner";
import { useDialog } from "../context/ModalContext";
import Loader from "../loaders/Loader";

const NewTableModal = () => {
  const { closeModal } = useDialog();
  const { createTable, loading } = useTables();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<CreateTableDto>({
    name: "",
    number_of_guests: 8,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "number_of_guests" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      nextErrors.name = "Naziv stola je obavezan.";
    }

    if (!form.number_of_guests || form.number_of_guests < 1) {
      nextErrors.number_of_guests = "Unesite najmanje 1 mesto.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNewTableCreation = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Popunite obavezna polja.", { position: "top-center" });
      return;
    }

    try {
      await createTable({
        name: form.name.trim(),
        number_of_guests: Number(form.number_of_guests),
      });
      toast.success("Sto je uspešno kreiran.", { position: "top-center" });
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
        <SheetTitle>Kreiraj novi sto</SheetTitle>
        <SheetDescription>
          Definišite naziv stola i broj mesta za raspored sedenja.
        </SheetDescription>
      </SheetHeader>

      <form onSubmit={handleNewTableCreation} className="space-y-6">
        <FieldGroup className="rounded-xl border bg-muted/20 p-4">
          <Field>
            <FieldLabel htmlFor="name">Naziv stola</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="npr. Sto broj 1"
              onChange={handleChange}
              value={form.name}
            />
            {errors.name ? (
              <p className="text-sm text-destructive">{errors.name}</p>
            ) : null}
          </Field>
          <Field>
            <FieldLabel htmlFor="number_of_guests">Broj mesta</FieldLabel>
            <FieldDescription>
              Koliko gostiju može da sedi za ovim stolom.
            </FieldDescription>
            <Input
              id="number_of_guests"
              name="number_of_guests"
              type="number"
              min={1}
              placeholder="8"
              onChange={handleChange}
              value={form.number_of_guests}
            />
            {errors.number_of_guests ? (
              <p className="text-sm text-destructive">
                {errors.number_of_guests}
              </p>
            ) : null}
          </Field>
        </FieldGroup>

        <SheetFooter>
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? (
              <>
                Kreiram sto...
                <Loader className="mr-2" size={16} />
              </>
            ) : (
              "Kreiraj sto"
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

export default NewTableModal;
