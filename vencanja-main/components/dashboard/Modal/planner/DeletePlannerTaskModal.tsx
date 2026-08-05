"use client";

import { Button } from "@/components/ui/button";
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

const DeletePlannerTaskModal = () => {
  const { closeModal, data } = useDialog();
  const { deleteTask, loading } = usePlanner();
  const title = data?.data?.title || "ovaj zadatak";

  const onDelete = async () => {
    if (!data?.id) return;
    try {
      await deleteTask(data.id);
      toast.success("Zadatak je obrisan.", { position: "top-center" });
      closeModal();
    } catch {
      toast.error("Brisanje nije uspelo.", { position: "top-center" });
    }
  };

  return (
    <>
      <SheetHeader className="space-y-2">
        <SheetTitle>Obriši zadatak</SheetTitle>
        <SheetDescription>
          Da li ste sigurni da želite da obrišete „{title}”?
        </SheetDescription>
      </SheetHeader>

      <SheetFooter className="gap-2 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={closeModal}
        >
          Otkaži
        </Button>
        <Button
          type="button"
          variant="destructive"
          className="cursor-pointer"
          disabled={loading}
          onClick={onDelete}
        >
          {loading ? <Loader size={16} /> : null}
          Obriši
        </Button>
      </SheetFooter>
    </>
  );
};

export default DeletePlannerTaskModal;
