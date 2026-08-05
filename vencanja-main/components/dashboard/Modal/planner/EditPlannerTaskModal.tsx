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

const toForm = (task: {
  category: string;
  title: string;
  description?: string | null;
  priority: PlannerPriority;
  due_date?: string | null;
  completed: boolean;
}): CreatePlannerTaskDto => ({
  category: task.category,
  title: task.title,
  description: task.description ?? "",
  priority: task.priority,
  due_date: task.due_date ?? "",
  completed: task.completed,
});

const EditPlannerTaskModal = () => {
  const { closeModal, data } = useDialog();
  const { categories, tasks, updateTask, loading } = usePlanner();
  const task = tasks.find((entry) => entry.id === data?.id);

  const [taskId, setTaskId] = useState<string | null>(task?.id ?? null);
  const [form, setForm] = useState<CreatePlannerTaskDto | null>(
    task ? toForm(task) : null,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (task && task.id !== taskId) {
    setTaskId(task.id);
    setForm(toForm(task));
  }

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        label: category.name,
        value: category.name,
      })),
    [categories],
  );

  if (!task || !form) {
    return (
      <SheetHeader>
        <SheetTitle>Zadatak nije pronađen</SheetTitle>
      </SheetHeader>
    );
  }

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = "Naslov je obavezan.";
    if (!form.category.trim()) next.category = "Izaberite kategoriju.";
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
      await updateTask(task.id, {
        category: form.category.trim(),
        title: form.title.trim(),
        description: form.description || null,
        priority: form.priority,
        due_date: form.due_date || null,
        completed: form.completed ?? false,
      });
      toast.success("Zadatak je ažuriran.", { position: "top-center" });
      closeModal();
    } catch {
      toast.error("Izmena nije uspela.", { position: "top-center" });
    }
  };

  return (
    <>
      <SheetHeader className="space-y-2">
        <SheetTitle>Uredi zadatak</SheetTitle>
        <SheetDescription>Ažurirajte detalje zadatka.</SheetDescription>
      </SheetHeader>

      <form onSubmit={onSubmit} className="space-y-4">
        <FieldGroup className="space-y-3 rounded-xl border bg-muted/20 p-4">
          <Field>
            <FieldLabel>Naslov</FieldLabel>
            <Input
              value={form.title}
              onChange={(e) =>
                setForm((prev) =>
                  prev ? { ...prev, title: e.target.value } : prev,
                )
              }
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
                setForm((prev) =>
                  prev ? { ...prev, description: e.target.value } : prev,
                )
              }
              rows={3}
            />
          </Field>

          <Field>
            <FieldLabel>Kategorija</FieldLabel>
            <SelectInput
              items={categoryOptions}
              value={form.category}
              onChange={(value) =>
                setForm((prev) =>
                  prev ? { ...prev, category: value || "Ostalo" } : prev,
                )
              }
            />
          </Field>

          <Field>
            <FieldLabel>Prioritet</FieldLabel>
            <SelectInput
              items={PRIORITY_OPTIONS}
              value={form.priority}
              onChange={(value) =>
                setForm((prev) =>
                  prev
                    ? {
                        ...prev,
                        priority: (value as PlannerPriority) || "medium",
                      }
                    : prev,
                )
              }
            />
          </Field>

          <Field>
            <FieldLabel>Rok</FieldLabel>
            <Input
              type="date"
              value={form.due_date ?? ""}
              onChange={(e) =>
                setForm((prev) =>
                  prev ? { ...prev, due_date: e.target.value } : prev,
                )
              }
            />
          </Field>

          <Field>
            <FieldLabel>Status</FieldLabel>
            <SelectInput
              items={STATUS_OPTIONS}
              value={form.completed ? "true" : "false"}
              onChange={(value) =>
                setForm((prev) =>
                  prev ? { ...prev, completed: value === "true" } : prev,
                )
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
            Sačuvaj izmene
          </Button>
        </SheetFooter>
      </form>
    </>
  );
};

export default EditPlannerTaskModal;
