import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  SheetClose,
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
  const [form, setForm] = useState<CreateTableDto>({
    name: "",
    number_of_guests: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNewTableCreation = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      await createTable(form);
      toast.success("Sto je uspešno kreiran.", { position: "top-center" });
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
        <SheetTitle>Kreiraj Novi Sto</SheetTitle>
      </SheetHeader>
      <form onSubmit={handleNewTableCreation}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Ime Stola</FieldLabel>
            <Input
              id="table_name"
              name="name"
              type="text"
              placeholder="Naprimer: Sto broj 1"
              onChange={handleChange}
              value={form.name}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="capacity">Broj mesta za stolom</FieldLabel>
            <Input
              id="capacity"
              name="number_of_guests"
              type="number"
              min={1}
              placeholder="10, 11, 15"
              onChange={handleChange}
              value={form.number_of_guests}
            />
          </Field>
        </FieldGroup>
        <SheetFooter>
          <Button type="submit" className="cursor-pointer">
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
