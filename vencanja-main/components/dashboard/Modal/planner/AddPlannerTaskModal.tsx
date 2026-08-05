"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { useDialog } from "../../context/ModalContext";
import { usePlanner } from "../../context/PlannerContext";
import SelectInput, { SelectOption } from "../../SelectInput";
import Loader from "../../loaders/Loader";
import { CreatePlannerTaskDto, PlannerPriority } from "../../types";

const PRIORITY_OPTIONS: SelectOption[] = [
  { label: "Nizak", value: "low" },
  { label: "Srednji", value: "medium" },
  { label: "Visok", value: "high" },
];

const STATUS_OPTIONS: SelectOption[] = [
  { label: "U toku", value: "false" },
  { label: "Završeno", value: "true" },
];

const emptyForm = (category = ""): CreatePlannerTaskDto => ({
  category,
  title: "",
  description: "",
  priority: "medium",
  due_date: "",
  completed: false,
});

const AddPlannerTaskModal = () => {
  const { closeModal } = useDialog();
  const { categories, createTask, loading } = usePlanner();
  const defaultCategory = categories[0]?.name ?? "Ostalo";
  const [form, setForm] = useState<CreatePlannerTaskDto>(() =>
    emptyForm(defaultCategory),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categoryValue = form.category || defaultCategory;

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        label: category.name,
        value: category.name,
      })),
    [categories],
  );

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = "Naslov je obavezan.";
    if (!categoryValue.trim()) next.category = "Izaberite kategoriju.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      toast.error("Popunite obavezna polja.", { position: "top-center" });
      return;
    }

    try {
      await createTask({
        ...form,
        category: categoryValue.trim(),
        title: form.title.trim(),
        description: form.description || null,
        due_date: form.due_date || null,
        completed: form.completed ?? false,
      });
      toast.success("Zadatak je dodat.", { position: "top-center" });
      closeModal();
    } catch {
      toast.error("Dodavanje nije uspelo.", { position: "top-center" });
    }
  };

  return (
    <>
      <SheetHeader className="space-y-2">
        <SheetTitle>Novi zadatak</SheetTitle>
        <SheetDescription>
          Dodajte obavezu za pripremu venčanja.
        </SheetDescription>
      </SheetHeader>

      <form onSubmit={onSubmit} className="space-y-4">
        <FieldGroup className="space-y-3 rounded-xl border bg-muted/20 p-4">
          <Field>
            <FieldLabel>Naslov</FieldLabel>
            <Input
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="npr. Rezervisati fotografa"
            />
            {errors.title ? (
              <p className="text-sm text-destructive">{errors.title}</p>
            ) : null}
          </Field>

          <Field>
            <FieldLabel>Opis</FieldLabel>
            <Textarea
              value={form.description ?? ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={3}
            />
          </Field>

          <Field>
            <FieldLabel>Kategorija</FieldLabel>
            <SelectInput
              items={categoryOptions}
              value={categoryValue}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  category: value || defaultCategory,
                }))
              }
            />
            {errors.category ? (
              <p className="text-sm text-destructive">{errors.category}</p>
            ) : null}
          </Field>

          <Field>
            <FieldLabel>Prioritet</FieldLabel>
            <SelectInput
              items={PRIORITY_OPTIONS}
              value={form.priority}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  priority: (value as PlannerPriority) || "medium",
                }))
              }
            />
          </Field>

          <Field>
            <FieldLabel>Rok</FieldLabel>
            <Input
              type="date"
              value={form.due_date ?? ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, due_date: e.target.value }))
              }
            />
          </Field>

          <Field>
            <FieldLabel>Status</FieldLabel>
            <SelectInput
              items={STATUS_OPTIONS}
              value={form.completed ? "true" : "false"}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  completed: value === "true",
                }))
              }
            />
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
            Sačuvaj zadatak
          </Button>
        </SheetFooter>
      </form>
    </>
  );
};

export default AddPlannerTaskModal;
