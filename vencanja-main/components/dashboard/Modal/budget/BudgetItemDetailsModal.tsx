"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { useDialog } from "../../context/ModalContext";
import { useBudget } from "../../context/BudgetContext";
import SelectInput, { SelectOption } from "../../SelectInput";
import Loader from "../../loaders/Loader";
import {
  BudgetAttachmentType,
  BudgetPaymentMethod,
  CreateBudgetPaymentDto,
} from "../../types";
import { uploadFileToCloudinary } from "@/helpers/uploadFileToCloudinary";
import {
  budgetStatusLabel,
  formatBudgetDate,
  formatMoney,
  getBudgetItemStatus,
  getPaidAmount,
  getRemainingAmount,
  sortPaymentsByDateDesc,
} from "../../Finansije/budgetHelpers";
import {
  FileText,
  Pencil,
  Trash2,
  Upload,
  ExternalLink,
} from "lucide-react";

const METHOD_OPTIONS: SelectOption[] = [
  { label: "Gotovina", value: "cash" },
  { label: "Kartica", value: "card" },
  { label: "Transfer", value: "transfer" },
  { label: "Ostalo", value: "other" },
];

const ATTACHMENT_TYPE_OPTIONS: SelectOption[] = [
  { label: "Ugovor", value: "contract" },
  { label: "Račun", value: "invoice" },
  { label: "Ponuda", value: "offer" },
  { label: "Potvrda", value: "receipt" },
  { label: "Ostalo", value: "other" },
];

const attachmentTypeLabel = (type: BudgetAttachmentType): string => {
  switch (type) {
    case "contract":
      return "Ugovor";
    case "invoice":
      return "Račun";
    case "offer":
      return "Ponuda";
    case "receipt":
      return "Potvrda";
    default:
      return "Ostalo";
  }
};

const methodLabel = (method: BudgetPaymentMethod): string => {
  switch (method) {
    case "cash":
      return "Gotovina";
    case "card":
      return "Kartica";
    case "transfer":
      return "Transfer";
    default:
      return "Ostalo";
  }
};

const isImageUrl = (url: string, fileName: string): boolean => {
  const lower = `${url} ${fileName}`.toLowerCase();
  return /\.(png|jpe?g|gif|webp|avif)(\?|$)/.test(lower);
};

const emptyPayment = (): CreateBudgetPaymentDto => ({
  amount: 0,
  payment_date: new Date().toISOString().slice(0, 10),
  method: "transfer",
  note: "",
});

const BudgetItemDetailsModal = () => {
  const { data, openModal } = useDialog();
  const {
    items,
    loading,
    addPayment,
    removePayment,
    addAttachment,
    removeAttachment,
  } = useBudget();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const item = items.find((entry) => entry.id === data?.id);

  const [paymentForm, setPaymentForm] =
    useState<CreateBudgetPaymentDto>(emptyPayment);
  const [paymentError, setPaymentError] = useState("");
  const [attachmentType, setAttachmentType] =
    useState<BudgetAttachmentType>("contract");
  const [uploading, setUploading] = useState(false);

  const paid = item ? getPaidAmount(item) : 0;
  const remaining = item ? getRemainingAmount(item) : 0;
  const status = item ? getBudgetItemStatus(item) : "unpaid";
  const progress =
    item && Number(item.planned_amount) > 0
      ? Math.min((paid / Number(item.planned_amount)) * 100, 100)
      : 0;

  const payments = useMemo(
    () => sortPaymentsByDateDesc(item?.budget_payments ?? []),
    [item?.budget_payments],
  );

  const attachments = item?.budget_attachments ?? [];

  if (!item) {
    return (
      <SheetHeader>
        <SheetTitle>Trošak nije pronađen</SheetTitle>
        <SheetDescription>
          Stavka možda više ne postoji. Zatvorite prozor i osvežite listu.
        </SheetDescription>
      </SheetHeader>
    );
  }

  const onAddPayment = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!paymentForm.amount || paymentForm.amount <= 0) {
      setPaymentError("Unesite iznos uplate.");
      return;
    }
    if (!paymentForm.payment_date) {
      setPaymentError("Unesite datum uplate.");
      return;
    }

    try {
      await addPayment(item.id, {
        ...paymentForm,
        note: paymentForm.note?.trim() || null,
      });
      setPaymentForm(emptyPayment());
      setPaymentError("");
      toast.success("Uplata je sačuvana.", { position: "top-center" });
    } catch {
      toast.error("Čuvanje uplate nije uspelo.", { position: "top-center" });
    }
  };

  const onDeletePayment = async (paymentId: string) => {
    try {
      await removePayment(item.id, paymentId);
      toast.success("Uplata je obrisana.", { position: "top-center" });
    } catch {
      toast.error("Brisanje uplate nije uspelo.", { position: "top-center" });
    }
  };

  const onUpload = async (file: File) => {
    setUploading(true);
    try {
      const fileUrl = await uploadFileToCloudinary(file);
      await addAttachment(item.id, {
        file_url: fileUrl,
        file_name: file.name,
        type: attachmentType,
      });
      toast.success("Dokument je dodat.", { position: "top-center" });
    } catch {
      toast.error("Upload nije uspeo.", { position: "top-center" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onDeleteAttachment = async (attachmentId: string) => {
    try {
      await removeAttachment(item.id, attachmentId);
      toast.success("Dokument je obrisan.", { position: "top-center" });
    } catch {
      toast.error("Brisanje dokumenta nije uspelo.", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <SheetHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <SheetTitle className="truncate">{item.title}</SheetTitle>
            <SheetDescription>
              {item.budget_categories?.name ?? "Bez kategorije"}
              {item.vendor_name ? ` · ${item.vendor_name}` : ""}
            </SheetDescription>
          </div>
          <Badge
            variant={
              status === "paid"
                ? "default"
                : status === "partial"
                  ? "secondary"
                  : "destructive"
            }
          >
            {budgetStatusLabel(status)}
          </Badge>
        </div>
      </SheetHeader>

      <div className="space-y-5">
        <div className="space-y-2 rounded-xl border bg-muted/20 p-4 text-sm">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Planirano</span>
            <span className="font-medium text-foreground">
              {formatMoney(Number(item.planned_amount), item.currency)}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Plaćeno</span>
            <span className="font-medium text-foreground">
              {formatMoney(paid, item.currency)}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Preostalo</span>
            <span className="font-medium text-foreground">
              {formatMoney(remaining, item.currency)}
            </span>
          </div>
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Napredak</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>
          <p className="pt-1 text-xs text-muted-foreground">
            Rok: {formatBudgetDate(item.due_date)}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 w-full cursor-pointer"
            onClick={() => openModal("edit_budget_item", { id: item.id })}
          >
            <Pencil className="h-4 w-4" />
            Uredi trošak
          </Button>
        </div>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Nova uplata</h3>
          <form
            onSubmit={onAddPayment}
            className="space-y-3 rounded-xl border bg-muted/20 p-4"
          >
            <FieldGroup className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel>Iznos</FieldLabel>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    value={paymentForm.amount || ""}
                    onChange={(e) => {
                      setPaymentError("");
                      setPaymentForm((prev) => ({
                        ...prev,
                        amount: Number(e.target.value),
                      }));
                    }}
                  />
                </Field>
                <Field>
                  <FieldLabel>Datum</FieldLabel>
                  <Input
                    type="date"
                    value={paymentForm.payment_date}
                    onChange={(e) => {
                      setPaymentError("");
                      setPaymentForm((prev) => ({
                        ...prev,
                        payment_date: e.target.value,
                      }));
                    }}
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel>Način plaćanja</FieldLabel>
                <SelectInput
                  items={METHOD_OPTIONS}
                  value={paymentForm.method}
                  onChange={(value) =>
                    setPaymentForm((prev) => ({
                      ...prev,
                      method: (value as BudgetPaymentMethod) || "transfer",
                    }))
                  }
                />
              </Field>
              <Field>
                <FieldLabel>Napomena</FieldLabel>
                <Input
                  value={paymentForm.note ?? ""}
                  onChange={(e) =>
                    setPaymentForm((prev) => ({
                      ...prev,
                      note: e.target.value,
                    }))
                  }
                  placeholder="npr. Kapara"
                />
              </Field>
              {paymentError ? (
                <p className="text-sm text-destructive">{paymentError}</p>
              ) : null}
            </FieldGroup>
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loading}
            >
              {loading ? <Loader size={16} /> : null}
              Dodaj uplatu
            </Button>
          </form>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            Istorija uplata
          </h3>
          {payments.length === 0 ? (
            <p className="rounded-xl border border-dashed bg-muted/20 px-4 py-6 text-center text-sm text-muted-foreground">
              Još nema uplata za ovaj trošak.
            </p>
          ) : (
            <div className="space-y-2">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-start justify-between gap-3 rounded-xl border bg-muted/20 px-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {payment.note?.trim() || "Uplata"}
                    </p>
                    <p className="text-sm text-foreground">
                      {formatMoney(Number(payment.amount), item.currency)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatBudgetDate(payment.payment_date)} ·{" "}
                      {methodLabel(payment.method)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0 cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => onDeletePayment(payment.id)}
                    disabled={loading}
                    aria-label="Obriši uplatu"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Dokumenta</h3>
          <div className="space-y-3 rounded-xl border bg-muted/20 p-4">
            <Field>
              <FieldLabel>Tip dokumenta</FieldLabel>
              <SelectInput
                items={ATTACHMENT_TYPE_OPTIONS}
                value={attachmentType}
                onChange={(value) =>
                  setAttachmentType((value as BudgetAttachmentType) || "other")
                }
              />
            </Field>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void onUpload(file);
              }}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer"
              disabled={uploading || loading}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? <Loader size={16} /> : <Upload className="h-4 w-4" />}
              Otpremi dokument
            </Button>
          </div>

          {attachments.length === 0 ? (
            <p className="rounded-xl border border-dashed bg-muted/20 px-4 py-6 text-center text-sm text-muted-foreground">
              Nema uploadovanih dokumenata.
            </p>
          ) : (
            <div className="space-y-2">
              {attachments.map((attachment) => {
                const showImage = isImageUrl(
                  attachment.file_url,
                  attachment.file_name,
                );
                return (
                  <div
                    key={attachment.id}
                    className="overflow-hidden rounded-xl border bg-muted/20"
                  >
                    {showImage ? (
                      <div className="h-36 w-full overflow-hidden bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={attachment.file_url}
                          alt={attachment.file_name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="flex items-start justify-between gap-3 px-3 py-3">
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 truncate text-sm font-medium text-foreground">
                          <FileText className="h-3.5 w-3.5 shrink-0" />
                          {attachment.file_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {attachmentTypeLabel(attachment.type)}
                        </p>
                        <a
                          href={attachment.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-xs text-foreground hover:underline"
                        >
                          Otvori
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="shrink-0 cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => onDeleteAttachment(attachment.id)}
                        disabled={loading}
                        aria-label="Obriši dokument"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default BudgetItemDetailsModal;
