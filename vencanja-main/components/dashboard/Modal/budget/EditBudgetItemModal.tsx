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
import { useBudget } from "../../context/BudgetContext";
import SelectInput, { SelectOption } from "../../SelectInput";
import Loader from "../../loaders/Loader";
import { CreateBudgetItemDto } from "../../types";

const CURRENCY_OPTIONS: SelectOption[] = [
  { label: "EUR", value: "EUR" },
  { label: "RSD", value: "RSD" },
  { label: "USD", value: "USD" },
];

const toForm = (item: {
  category_id: string;
  title: string;
  vendor_name?: string | null;
  planned_amount: number;
  currency: string;
  due_date?: string | null;
  payment_date?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  notes?: string | null;
}): CreateBudgetItemDto => ({
  category_id: item.category_id,
  title: item.title,
  vendor_name: item.vendor_name ?? "",
  planned_amount: Number(item.planned_amount),
  currency: item.currency,
  due_date: item.due_date ?? "",
  payment_date: item.payment_date ?? "",
  phone: item.phone ?? "",
  email: item.email ?? "",
  website: item.website ?? "",
  notes: item.notes ?? "",
});

const EditBudgetItemModal = () => {
  const { closeModal, data } = useDialog();
  const { categories, items, updateItem, loading } = useBudget();
  const item = items.find((entry) => entry.id === data?.id);

  const [itemId, setItemId] = useState<string | null>(item?.id ?? null);
  const [form, setForm] = useState<CreateBudgetItemDto | null>(
    item ? toForm(item) : null,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (item && item.id !== itemId) {
    setItemId(item.id);
    setForm(toForm(item));
  }

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categories],
  );

  if (!item || !form) {
    return (
      <SheetHeader>
        <SheetTitle>Trošak nije pronađen</SheetTitle>
      </SheetHeader>
    );
  }

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = "Naziv je obavezan.";
    if (!form.category_id) next.category_id = "Izaberite kategoriju.";
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
      await updateItem(item.id, {
        ...form,
        title: form.title.trim(),
        vendor_name: form.vendor_name || null,
        due_date: form.due_date || null,
        payment_date: form.payment_date || null,
        phone: form.phone || null,
        email: form.email || null,
        website: form.website || null,
        notes: form.notes || null,
      });
      toast.success("Trošak je ažuriran.", { position: "top-center" });
      closeModal();
    } catch {
      toast.error("Izmena nije uspela.", { position: "top-center" });
    }
  };

  return (
    <>
      <SheetHeader className="space-y-2">
        <SheetTitle>Uredi trošak</SheetTitle>
        <SheetDescription>Ažurirajte podatke o trošku.</SheetDescription>
      </SheetHeader>

      <form onSubmit={onSubmit} className="space-y-4">
        <FieldGroup className="space-y-3 rounded-xl border bg-muted/20 p-4">
          <Field>
            <FieldLabel>Naziv</FieldLabel>
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
            <FieldLabel>Kategorija</FieldLabel>
            <SelectInput
              items={categoryOptions}
              value={form.category_id}
              onChange={(value) =>
                setForm((prev) =>
                  prev ? { ...prev, category_id: value || "" } : prev,
                )
              }
            />
          </Field>

          <Field>
            <FieldLabel>Dobavljač</FieldLabel>
            <Input
              value={form.vendor_name ?? ""}
              onChange={(e) =>
                setForm((prev) =>
                  prev ? { ...prev, vendor_name: e.target.value } : prev,
                )
              }
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
                  setForm((prev) =>
                    prev
                      ? { ...prev, planned_amount: Number(e.target.value) }
                      : prev,
                  )
                }
              />
            </Field>
            <Field>
              <FieldLabel>Valuta</FieldLabel>
              <SelectInput
                items={CURRENCY_OPTIONS}
                value={form.currency}
                onChange={(value) =>
                  setForm((prev) =>
                    prev ? { ...prev, currency: value || "EUR" } : prev,
                  )
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
                setForm((prev) =>
                  prev ? { ...prev, due_date: e.target.value } : prev,
                )
              }
            />
          </Field>

          <Field>
            <FieldLabel>Telefon</FieldLabel>
            <Input
              value={form.phone ?? ""}
              onChange={(e) =>
                setForm((prev) =>
                  prev ? { ...prev, phone: e.target.value } : prev,
                )
              }
            />
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              value={form.email ?? ""}
              onChange={(e) =>
                setForm((prev) =>
                  prev ? { ...prev, email: e.target.value } : prev,
                )
              }
            />
          </Field>

          <Field>
            <FieldLabel>Website</FieldLabel>
            <Input
              value={form.website ?? ""}
              onChange={(e) =>
                setForm((prev) =>
                  prev ? { ...prev, website: e.target.value } : prev,
                )
              }
            />
          </Field>

          <Field>
            <FieldLabel>Napomena</FieldLabel>
            <Textarea
              value={form.notes ?? ""}
              onChange={(e) =>
                setForm((prev) =>
                  prev ? { ...prev, notes: e.target.value } : prev,
                )
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
            Sačuvaj izmene
          </Button>
        </SheetFooter>
      </form>
    </>
  );
};

export default EditBudgetItemModal;
