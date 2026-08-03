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
  const { refresh, loading } = useGuests();
  const id = data?.id ?? "";
  const { deleteTable } = useTables();

  const deleteTableHandler = async () => {
    try {
      await deleteTable(id);
      await refresh();
      toast.success("Sto je uspešno obirisan.", { position: "top-center" });
      closeModal();
    } catch {
      toast.error("Došlo je do greške. Pokušajte ponovo", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>
          Da li želite da obrišete sto: {data?.data?.name || ""} ?
        </SheetTitle>
        <SheetDescription>
          Ova akcija se ne može poništiti. Brisanjem stola svi gosti koji su mu
          dodeljeni izgubiće raspored i više neće biti povezani ni sa jednim
          stolom.
        </SheetDescription>
      </SheetHeader>
      <SheetFooter>
        <Button
          onClick={deleteTableHandler}
          variant="destructive"
          className="cursor-pointer"
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
