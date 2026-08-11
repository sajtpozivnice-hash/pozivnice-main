import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
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
    if (!data?.id) return;

    try {
      await deleteGuest(data.id);
      toast.success("Gost je uspešno obrisan.", { position: "top-center" });
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
        <SheetTitle>Obriši gosta</SheetTitle>
        <SheetDescription>
          Da li ste sigurni da želite da obrišete gosta{" "}
          <span className="font-semibold text-foreground">
            {data?.data?.name ?? ""}
          </span>
          ? Ako je ovo osoba koja je potvrdila dolazak za više osoba, biće
          obrisane i osobe koje dolaze sa njom. Ova akcija se ne može poništiti.
        </SheetDescription>
      </SheetHeader>

      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-muted-foreground">
        Brisanjem gosta uklanjate ga i sa liste potvrda i sa eventualno
        dodeljenog stola.
      </div>

      <SheetFooter>
        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={deleteGuestHandler}
          disabled={loading}
        >
          {loading ? (
            <>
              Brisanje...
              <Loader className="mr-2" size={16} />
            </>
          ) : (
            "Obriši gosta"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={closeModal}
        >
          Odustani
        </Button>
      </SheetFooter>
    </>
  );
};

export default DeleteGuestModal;
