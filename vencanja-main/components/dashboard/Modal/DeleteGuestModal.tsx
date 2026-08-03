import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDialog } from "../context/ModalContext";
import { useGuests } from "../context/GuestContext";
import Loader from "../loaders/Loader";

const DeleteGuestModal = () => {
  const { data, closeModal } = useDialog();
  const { deleteGuest, loading } = useGuests();

  const deleteGuestHandler = async () => {
    try {
      await deleteGuest(data!.id!);
      toast.success("Gost je uspešno obrisan.", { position: "top-center" });
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
          Da li sigurno želite da obrisete gosta: {data?.data.name}
        </SheetTitle>
        <SheetDescription>Ova akcija ne može da se poništi!</SheetDescription>
      </SheetHeader>
      <Button variant="destructive" onClick={deleteGuestHandler}>
        {loading ? (
          <>
            Brisanje...
            <Loader className="mr-2" size={16} />
          </>
        ) : (
          "Obrisi Gosta"
        )}
      </Button>
      <Button type="submit" variant="outline" onClick={closeModal}>
        Odustani
      </Button>
    </>
  );
};

export default DeleteGuestModal;
