"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
import { useBudget } from "../../context/BudgetContext";
import SelectInput, { SelectOption } from "../../SelectInput";
import Loader from "../../loaders/Loader";
import { CreateBudgetItemDto } from "../../types";

const CURRENCY_OPTIONS: SelectOption[] = [
  { label: "EUR", value: "EUR" },
  { label: "RSD", value: "RSD" },
  { label: "USD", value: "USD" },
];

type FormState = CreateBudgetItemDto;

const emptyForm = (categoryId = ""): FormState => ({
  category_id: categoryId,
  title: "",
  vendor_name: "",
  planned_amount: 0,
  currency: "EUR",
  due_date: "",
  payment_date: "",
  phone: "",
  email: "",
  website: "",
  notes: "",
});

const AddBudgetItemModal = () => {
  const { closeModal } = useDialog();
  const { categories, createItem, loading } = useBudget();
  const defaultCategoryId = categories[0]?.id ?? "";
  const [form, setForm] = useState<FormState>(() => emptyForm(defaultCategoryId));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const categoryId = form.category_id || defaultCategoryId;

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categories],
  );

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = "Naziv je obavezan.";
    if (!categoryId) next.category_id = "Izaberite kategoriju.";
    if (!form.planned_amount || form.planned_amount <= 0) {
      next.planned_amount = "Unesite planirani iznos.";
    }
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
      await createItem({
        ...form,
        category_id: categoryId,
        title: form.title.trim(),
        vendor_name: form.vendor_name || null,
        due_date: form.due_date || null,
        payment_date: form.payment_date || null,
        phone: form.phone || null,
        email: form.email || null,
        website: form.website || null,
        notes: form.notes || null,
      });
      toast.success("Trošak je dodat.", { position: "top-center" });
      closeModal();
    } catch {
      toast.error("Dodavanje nije uspelo.", { position: "top-center" });
    }
  };

  return (
    <>
      <SheetHeader className="space-y-2">
        <SheetTitle>Novi trošak</SheetTitle>
        <SheetDescription>
          Unesite planirani trošak, dobavljača i rok plaćanja.
        </SheetDescription>
      </SheetHeader>

      <form onSubmit={onSubmit} className="space-y-4">
        <FieldGroup className="space-y-3 rounded-xl border bg-muted/20 p-4">
          <Field>
            <FieldLabel>Naziv</FieldLabel>
            <Input
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="npr. Kapara fotografa"
            />
            {errors.title ? (
              <p className="text-sm text-destructive">{errors.title}</p>
            ) : null}
          </Field>

          <Field>
            <FieldLabel>Kategorija</FieldLabel>
            <SelectInput
              items={categoryOptions}
              value={categoryId}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  category_id: value || "",
                }))
              }
              placeholder="Izaberite kategoriju"
            />
            {errors.category_id ? (
              <p className="text-sm text-destructive">{errors.category_id}</p>
            ) : null}
          </Field>

          <Field>
            <FieldLabel>Dobavljač</FieldLabel>
            <Input
              value={form.vendor_name ?? ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, vendor_name: e.target.value }))
              }
              placeholder="Naziv dobavljača"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Planirani iznos</FieldLabel>
              <Input
                type="number"
                min={0}
                step="0.01"
                value={form.planned_amount || ""}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    planned_amount: Number(e.target.value),
                  }))
                }
              />
              {errors.planned_amount ? (
                <p className="text-sm text-destructive">
                  {errors.planned_amount}
                </p>
              ) : null}
            </Field>
            <Field>
              <FieldLabel>Valuta</FieldLabel>
              <SelectInput
                items={CURRENCY_OPTIONS}
                value={form.currency}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    currency: value || "EUR",
                  }))
                }
              />
            </Field>
          </div>

          <Field>
            <FieldLabel>Rok plaćanja</FieldLabel>
            <Input
              type="date"
              value={form.due_date ?? ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, due_date: e.target.value }))
              }
            />
          </Field>

          <Field>
            <FieldLabel>Telefon</FieldLabel>
            <Input
              value={form.phone ?? ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              value={form.email ?? ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </Field>

          <Field>
            <FieldLabel>Website</FieldLabel>
            <Input
              value={form.website ?? ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, website: e.target.value }))
              }
              placeholder="https://"
            />
          </Field>

          <Field>
            <FieldLabel>Napomena</FieldLabel>
            <Textarea
              value={form.notes ?? ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, notes: e.target.value }))
              }
              rows={3}
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
            Sačuvaj trošak
          </Button>
        </SheetFooter>
      </form>
    </>
  );
};

export default AddBudgetItemModal;
