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
import { PlannerTask } from "@/components/dashboard/types";
import { useDialog } from "../context/ModalContext";
import { usePlanner } from "../context/PlannerContext";
import {
  dueDateHint,
  formatPlannerDate,
  getPlannerTaskStatus,
  isDueSoon,
  plannerStatusLabel,
  priorityLabel,
} from "./plannerHelpers";
import { Check, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  task: PlannerTask;
};

const statusDotClass = (status: ReturnType<typeof getPlannerTaskStatus>) => {
  if (status === "completed") return "bg-emerald-500";
  if (status === "overdue") return "bg-red-500";
  return "bg-amber-400";
};

const priorityVariant = (priority: PlannerTask["priority"]) => {
  if (priority === "high") return "destructive" as const;
  if (priority === "low") return "secondary" as const;
  return "outline" as const;
};

const PlannerTaskCard = ({ task }: Props) => {
  const { openModal } = useDialog();
  const { toggleTaskCompleted, loading } = usePlanner();
  const status = getPlannerTaskStatus(task);
  const hint = dueDateHint(task);
  const soon = isDueSoon(task);

  const onToggle = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await toggleTaskCompleted(task.id, !task.completed);
    } catch {
      toast.error("Ažuriranje statusa nije uspelo.", {
        position: "top-center",
      });
    }
  };

  return (
    <Card
      className={cn(
        "mb-4 break-inside-avoid overflow-hidden border-0 bg-gradient-to-br from-orange-50/50 via-white to-white shadow-[0_1px_2px_rgb(15_23_42_/_0.04)] ring-1 ring-orange-100/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgb(249_115_22_/_0.12)]",
        task.completed && "opacity-80",
      )}
    >
      <CardHeader className="border-b pb-3">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onToggle}
            disabled={loading}
            aria-label={
              task.completed ? "Označi kao nezavršen" : "Označi kao završen"
            }
            className={cn(
              "mt-0.5 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-md border transition-colors",
              task.completed
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-muted-foreground/40 bg-background hover:border-foreground",
            )}
          >
            {task.completed ? <Check className="h-3.5 w-3.5" /> : null}
          </button>
          <div className="min-w-0 flex-1 space-y-2">
            <CardTitle
              className={cn(
                "text-base leading-snug",
                task.completed && "text-muted-foreground line-through",
              )}
            >
              {task.title}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">
                {task.category}
              </span>
              <Badge variant={priorityVariant(task.priority)}>
                {priorityLabel(task.priority)}
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    statusDotClass(status),
                  )}
                />
                {plannerStatusLabel(status)}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 pt-3 text-sm">
        {task.description ? (
          <p className="break-words text-muted-foreground">{task.description}</p>
        ) : null}
        <p className="text-xs text-muted-foreground">
          Rok: {formatPlannerDate(task.due_date)}
        </p>
        {hint ? (
          <p
            className={cn(
              "text-xs font-medium",
              status === "overdue"
                ? "text-destructive"
                : soon
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-muted-foreground",
            )}
          >
            {hint}
          </p>
        ) : null}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 cursor-pointer"
          onClick={() => openModal("edit_planner_task", { id: task.id })}
        >
          <Pencil className="h-4 w-4" />
          Uredi
        </Button>
        <Button
          variant="outline"
          className="flex-1 cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() =>
            openModal("delete_planner_task", {
              id: task.id,
              data: { title: task.title },
            })
          }
        >
          <Trash2 className="h-4 w-4" />
          Obriši
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlannerTaskCard;
