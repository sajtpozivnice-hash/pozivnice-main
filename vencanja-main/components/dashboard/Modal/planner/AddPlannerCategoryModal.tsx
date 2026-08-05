"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { useDialog } from "../../context/ModalContext";
import { usePlanner } from "../../context/PlannerContext";
import Loader from "../../loaders/Loader";

const AddPlannerCategoryModal = () => {
  const { closeModal } = useDialog();
  const { createCategory, loading } = usePlanner();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Naziv kategorije je obavezan.");
      return;
    }

    try {
      await createCategory({ name: name.trim() });
      toast.success("Kategorija je dodata.", { position: "top-center" });
      closeModal();
    } catch {
      toast.error("Dodavanje kategorije nije uspelo.", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <SheetHeader className="space-y-2">
        <SheetTitle>Nova kategorija</SheetTitle>
        <SheetDescription>
          Dodajte sopstvenu kategoriju zadataka.
        </SheetDescription>
      </SheetHeader>

      <form onSubmit={onSubmit} className="space-y-4">
        <FieldGroup className="space-y-3 rounded-xl border bg-muted/20 p-4">
          <Field>
            <FieldLabel>Naziv</FieldLabel>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="npr. Proba ceremonije"
            />
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </Field>
        </FieldGroup>

        <SheetFooter className="gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={closeModal}
          >
            Otkaži
          </Button>
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? <Loader size={16} /> : null}
            Sačuvaj
          </Button>
        </SheetFooter>
      </form>
    </>
  );
};

export default AddPlannerCategoryModal;
