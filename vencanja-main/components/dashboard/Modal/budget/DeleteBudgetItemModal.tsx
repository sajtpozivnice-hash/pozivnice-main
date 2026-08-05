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
import { useBudget } from "../../context/BudgetContext";
import Loader from "../../loaders/Loader";

const DeleteBudgetItemModal = () => {
  const { closeModal, data } = useDialog();
  const { deleteItem, loading } = useBudget();
  const title = data?.data?.title || "ovaj trošak";

  const onDelete = async () => {
    if (!data?.id) return;
    try {
      await deleteItem(data.id);
      toast.success("Trošak je obrisan.", { position: "top-center" });
      closeModal();
    } catch {
      toast.error("Brisanje nije uspelo.", { position: "top-center" });
    }
  };

  return (
    <>
      <SheetHeader className="space-y-2">
        <SheetTitle>Obriši trošak</SheetTitle>
        <SheetDescription>
          Da li ste sigurni da želite da obrišete „{title}”? Biće obrisane i sve
          uplate i dokumenta vezana za ovaj trošak.
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

export default DeleteBudgetItemModal;
