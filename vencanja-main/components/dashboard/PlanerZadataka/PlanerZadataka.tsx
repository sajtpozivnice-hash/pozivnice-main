"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDialog } from "../context/ModalContext";
import { usePlanner } from "../context/PlannerContext";
import EmptyMessage from "../EmptyMessage";
import SectionLoader from "../loaders/SectionLoader";
import PlannerSummary from "./PlannerSummary";
import PlannerTaskCard from "./PlannerTaskCard";
import PlannerFilters, {
  PlannerPriorityFilter,
  PlannerStatusFilter,
} from "./PlannerFilters";
import FilterEmptyState from "../shared/FilterEmptyState";
import {
  getPlannerTaskStatus,
  isDueThisWeek,
  isDueToday,
} from "./plannerHelpers";
import { FolderPlus, ListTodo, Plus } from "lucide-react";
import { matchesSearchQuery } from "../utils/search";

const PlanerZadataka = () => {
  const { openModal } = useDialog();
  const { tasks, categories, loading } = usePlanner();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PlannerStatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] =
    useState<PlannerPriorityFilter>("all");

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        label: category.name,
        value: category.name,
      })),
    [categories],
  );

  const filteredTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const status = getPlannerTaskStatus(task);

      if (statusFilter === "completed" && !task.completed) return false;
      if (statusFilter === "incomplete" && task.completed) return false;
      if (statusFilter === "overdue" && status !== "overdue") return false;
      if (statusFilter === "today" && !isDueToday(task.due_date)) return false;
      if (statusFilter === "this_week" && !isDueThisWeek(task.due_date)) {
        return false;
      }

      if (categoryFilter !== "all" && task.category !== categoryFilter) {
        return false;
      }

      if (priorityFilter !== "all" && task.priority !== priorityFilter) {
        return false;
      }

      return matchesSearchQuery(
        [task.title, task.description, task.category],
        searchQuery,
      );
    });

    filtered.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const aDue = a.due_date
        ? new Date(a.due_date).getTime()
        : Number.MAX_SAFE_INTEGER;
      const bDue = b.due_date
        ? new Date(b.due_date).getTime()
        : Number.MAX_SAFE_INTEGER;
      if (aDue !== bDue) return aDue - bDue;
      return a.sort_order - b.sort_order;
    });

    return filtered;
  }, [tasks, searchQuery, statusFilter, categoryFilter, priorityFilter]);

  if (loading && tasks.length === 0 && categories.length === 0) {
    return <SectionLoader />;
  }

  return (
    <div className="w-full min-w-0 space-y-4">
      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Organizujte sve obaveze do dana venčanja na jednom mestu.
        </p>
        <div className="grid w-full grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:w-auto">
          <Button
            variant="outline"
            className="h-9 w-full cursor-pointer"
            onClick={() => openModal("add_planner_category")}
          >
            <FolderPlus className="h-4 w-4" />
            Nova kategorija
          </Button>
          <Button
            className="h-9 w-full cursor-pointer"
            onClick={() => openModal("add_planner_task")}
          >
            <Plus className="h-4 w-4" />
            Novi zadatak
          </Button>
        </div>
      </div>

      <PlannerSummary />

      <PlannerFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        categoryOptions={categoryOptions}
      />

      {tasks.length === 0 ? (
        <EmptyMessage
          title="Nemate zadataka"
          description="Dodajte prvi zadatak ili sačekajte automatsko učitavanje početne liste."
          icon={ListTodo}
          accent="planner"
          action={
            <Button
              className="cursor-pointer"
              onClick={() => openModal("add_planner_task")}
            >
              Dodaj zadatak
            </Button>
          }
        />
      ) : filteredTasks.length === 0 ? (
        <FilterEmptyState
          title="Nema zadataka za izabrane filtere"
          onReset={() => {
            setSearchQuery("");
            setStatusFilter("all");
            setCategoryFilter("all");
            setPriorityFilter("all");
          }}
        />
      ) : (
        <div className="columns-1 gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
          {filteredTasks.map((task) => (
            <PlannerTaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanerZadataka;
