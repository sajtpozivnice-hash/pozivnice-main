"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BudgetItem } from "@/components/dashboard/types";
import { useDialog } from "../context/ModalContext";
import {
  budgetStatusLabel,
  formatBudgetDate,
  formatMoney,
  getBudgetItemStatus,
  getPaidAmount,
  getRemainingAmount,
} from "./budgetHelpers";
import {
  ExternalLink,
  FileText,
  Globe,
  Mail,
  Phone,
  Pencil,
  Trash2,
} from "lucide-react";

type Props = {
  item: BudgetItem;
};

const statusBadgeClass = (status: ReturnType<typeof getBudgetItemStatus>) => {
  if (status === "paid") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  if (status === "partial") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }
  return "border-rose-200 bg-rose-50 text-rose-700";
};

const BudgetItemCard = ({ item }: Props) => {
  const { openModal } = useDialog();
  const paid = getPaidAmount(item);
  const remaining = getRemainingAmount(item);
  const status = getBudgetItemStatus(item);
  const progress =
    Number(item.planned_amount) > 0
      ? Math.min((paid / Number(item.planned_amount)) * 100, 100)
      : 0;
  const attachmentsCount = item.budget_attachments?.length ?? 0;
  const category = item.budget_categories;

  return (
    <Card
      className="mb-4 break-inside-avoid cursor-pointer overflow-hidden border-0 bg-gradient-to-br from-emerald-50/40 via-white to-white shadow-[0_1px_2px_rgb(15_23_42_/_0.04)] ring-1 ring-emerald-100/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgb(16_185_129_/_0.12)]"
      onClick={() =>
        openModal("budget_item_details", {
          id: item.id,
        })
      }
    >
      <CardHeader className="border-b pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <CardTitle className="truncate text-base">{item.title}</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              {category ? (
                <span
                  className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                  style={{
                    backgroundColor: `${category.color}22`,
                    color: category.color,
                  }}
                >
                  {category.name}
                </span>
              ) : null}
              <Badge variant="outline" className={statusBadgeClass(status)}>
                {budgetStatusLabel(status)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-3 text-sm">
        {item.vendor_name ? (
          <p>
            <span className="text-muted-foreground">Dobavljač: </span>
            <span className="font-medium text-foreground">{item.vendor_name}</span>
          </p>
        ) : null}

        <div className="grid grid-cols-1 gap-2">
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
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Napredak</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress
            value={progress}
            className="gap-0 [&_[data-slot=progress-indicator]]:bg-emerald-500"
          />
        </div>

        <div className="space-y-1 text-xs text-muted-foreground">
          <p>Rok: {formatBudgetDate(item.due_date)}</p>
          {item.phone ? (
            <p className="flex items-center gap-1.5">
              <Phone className="h-3 w-3" /> {item.phone}
            </p>
          ) : null}
          {item.email ? (
            <p className="flex items-center gap-1.5 truncate">
              <Mail className="h-3 w-3 shrink-0" /> {item.email}
            </p>
          ) : null}
          {item.website ? (
            <a
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 truncate text-foreground hover:underline"
              onClick={(event) => event.stopPropagation()}
            >
              <Globe className="h-3 w-3 shrink-0" />
              {item.website}
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
          ) : null}
          {item.notes ? (
            <p className="break-words text-muted-foreground">{item.notes}</p>
          ) : null}
          <p className="flex items-center gap-1.5">
            <FileText className="h-3 w-3" />
            Dokumenta: {attachmentsCount}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            openModal("budget_item_details", {
              id: item.id,
            });
          }}
        >
          Detalji i uplate
        </Button>
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            className="flex-1 cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              openModal("edit_budget_item", {
                id: item.id,
              });
            }}
          >
            <Pencil className="h-4 w-4" />
            Uredi
          </Button>
          <Button
            variant="outline"
            className="flex-1 cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={(event) => {
              event.stopPropagation();
              openModal("delete_budget_item", {
                id: item.id,
                data: { title: item.title },
              });
            }}
          >
            <Trash2 className="h-4 w-4" />
            Obriši
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BudgetItemCard;
