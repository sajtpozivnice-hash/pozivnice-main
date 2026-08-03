import { Button } from "@/components/ui/button";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDialog } from "../context/ModalContext";
import { useTables } from "../context/TableContext";
import { toast } from "sonner";
import { useGuests } from "../context/GuestContext";
import Loader from "../loaders/Loader";

const DeleteTableModal = () => {
  const { closeModal, data } = useDialog();
  const { refresh } = useGuests();
  const { deleteTable, loading } = useTables();
  const id = data?.id ?? "";

  const deleteTableHandler = async () => {
    if (!id) return;

    try {
      await deleteTable(id);
      await refresh();
      toast.success("Sto je uspešno obrisan.", { position: "top-center" });
      closeModal();
    } catch {
      toast.error("Došlo je do greške. Pokušajte ponovo.", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <SheetHeader className="space-y-2">
        <SheetTitle>Obriši sto</SheetTitle>
        <SheetDescription>
          Da li želite da obrišete sto{" "}
          <span className="font-semibold text-foreground">
            {data?.data?.name || ""}
          </span>
          ?
        </SheetDescription>
      </SheetHeader>

      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-muted-foreground">
        Ova akcija se ne može poništiti. Gosti dodeljeni ovom stolu više neće
        biti povezani ni sa jednim stolom.
      </div>

      <SheetFooter>
        <Button
          onClick={deleteTableHandler}
          variant="destructive"
          className="cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <>
              Brišem sto...
              <Loader className="mr-2" size={16} />
            </>
          ) : (
            "Obriši sto"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={closeModal}
          className="cursor-pointer"
        >
          Odustani
        </Button>
      </SheetFooter>
    </>
  );
};

export default DeleteTableModal;
