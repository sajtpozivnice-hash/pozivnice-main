import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { useState } from "react";
import { useDialog } from "../context/ModalContext";
import { CreateGuestDto, RSVPStatus } from "../types";
import { useGuests } from "../context/GuestContext";
import { useTables } from "../context/TableContext";
import SelectInput, { SelectOption } from "../SelectInput";
import Loader from "../loaders/Loader";
import { guestStatusOptions } from "../guestOptions";
import { MinusCircle, PlusCircle } from "lucide-react";

const EditGuestModal = () => {
  const { data, closeModal } = useDialog();
  const { updateGuest, loading, guests } = useGuests();
  const { tables, createTable, loading: tablesLoading } = useTables();
  const guestId = data?.id ?? "";
  const guestData = data?.data;
  const [showTableForm, setShowTableForm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<CreateGuestDto>({
    name: guestData?.name ?? "",
    email: guestData?.email ?? "",
    rsvp_status: guestData?.rsvp_status ?? "pending",
    message: guestData?.message ?? "",
    notes: guestData?.notes ?? "",
    table_id: guestData?.table_id ?? null,
  });
  const [sourceKey, setSourceKey] = useState(guestId);
  const [newTable, setNewTable] = useState({
    new_table_name: "",
    new_number_of_guests: 1,
  });

  if (guestId !== sourceKey) {
    setSourceKey(guestId);
    setForm({
      name: guestData?.name ?? "",
      email: guestData?.email ?? "",
      rsvp_status: guestData?.rsvp_status ?? "pending",
      message: guestData?.message ?? "",
      notes: guestData?.notes ?? "",
      table_id: guestData?.table_id ?? null,
    });
  }

  const tableOccupancy = tables.reduce(
    (acc, table) => {
      acc[table.id] = guests.filter(
        (guest) => guest.table_id === table.id,
      ).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const tablesForSelect: SelectOption[] = tables.map((table) => {
    const isCurrent = form.table_id === table.id;
    const isFull = tableOccupancy[table.id] >= table.number_of_guests;

    return {
      label: table.name,
      value: table.id,
      disabled: isFull && !isCurrent,
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleTableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTable((prev) => ({
      ...prev,
      [name]: name === "new_number_of_guests" ? Number(value) : value,
    }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      nextErrors.name = "Ime i prezime su obavezni.";
    }

    if (form.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Unesite ispravnu email adresu.";
    }

    if (!form.rsvp_status) {
      nextErrors.rsvp_status = "Izaberite status dolaska.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Popunite obavezna polja.", { position: "top-center" });
      return;
    }

    const nextTableId =
      form.rsvp_status === "accepted" ? form.table_id || null : null;
    const isChangingTable = nextTableId !== (data?.data?.table_id ?? null);

    if (isChangingTable && nextTableId) {
      const selectedTable = tables.find((table) => table.id === nextTableId);

      if (selectedTable) {
        const guestsAtTable = guests.filter(
          (guest) => guest.table_id === selectedTable.id,
        ).length;

        if (guestsAtTable >= selectedTable.number_of_guests) {
          toast.error("Izabrani sto je popunjen.", { position: "top-center" });
          return;
        }
      }
    }

    try {
      await updateGuest(data?.id || "", {
        ...form,
        name: form.name.trim(),
        email: form.email?.trim() || null,
        table_id: nextTableId,
      });
      toast.success("Gost je uspešno izmenjen.", { position: "top-center" });
      closeModal();
    } catch {
      toast.error("Došlo je do greške. Pokušajte ponovo.", {
        position: "top-center",
      });
    }
  };

  const submitNewTableHandler = async () => {
    if (!newTable.new_table_name.trim()) {
      toast.error("Unesite ime stola.", { position: "top-center" });
      return;
    }

    if (newTable.new_number_of_guests < 1) {
      toast.error("Broj mesta mora biti najmanje 1.", {
        position: "top-center",
      });
      return;
    }

    try {
      await createTable({
        name: newTable.new_table_name.trim(),
        number_of_guests: Number(newTable.new_number_of_guests),
      });
      toast.success("Sto je uspešno dodat.", { position: "top-center" });
      setShowTableForm(false);
      setNewTable({ new_table_name: "", new_number_of_guests: 1 });
    } catch {
      toast.error("Došlo je do greške. Pokušajte ponovo.", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <SheetHeader className="space-y-2">
        <SheetTitle>Izmeni podatke o gostu</SheetTitle>
        <SheetDescription>
          Ažurirajte status, napomene i raspored sedenja za ovog gosta.
        </SheetDescription>
      </SheetHeader>

      <form onSubmit={submitHandler} className="space-y-6">
        <FieldGroup className="rounded-xl border bg-muted/20 p-4">
          <Field>
            <FieldLabel htmlFor="name">Ime i prezime</FieldLabel>
            <Input
              id="name"
              name="name"
              placeholder="Marko Marković"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name ? (
              <p className="text-sm text-destructive">{errors.name}</p>
            ) : null}
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email adresa</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="npr. marko@email.com"
              value={form.email ?? ""}
              onChange={handleChange}
            />
            {errors.email ? (
              <p className="text-sm text-destructive">{errors.email}</p>
            ) : null}
          </Field>

          <Field>
            <FieldLabel htmlFor="status">Status dolaska</FieldLabel>
            <SelectInput
              items={guestStatusOptions}
              value={form.rsvp_status ?? ""}
              onChange={(value) => {
                const status = (value ?? "pending") as RSVPStatus;
                setForm((prev) => ({
                  ...prev,
                  rsvp_status: status,
                  table_id: status === "accepted" ? prev.table_id : null,
                }));
              }}
            />
            {errors.rsvp_status ? (
              <p className="text-sm text-destructive">{errors.rsvp_status}</p>
            ) : null}
          </Field>

          <Field>
            {tables.length === 0 ? (
              <div className="space-y-3 rounded-xl border border-dashed bg-background p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-muted-foreground">
                    {!showTableForm
                      ? "Nemate stolove. Dodajte novi sto."
                      : "Kreiraj novi sto"}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                    onClick={() => setShowTableForm((prev) => !prev)}
                  >
                    {showTableForm ? (
                      <MinusCircle className="h-5 w-5" />
                    ) : (
                      <PlusCircle className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                {showTableForm ? (
                  <div className="space-y-3">
                    <Field>
                      <FieldLabel htmlFor="new_table_name">Ime stola</FieldLabel>
                      <Input
                        id="new_table_name"
                        name="new_table_name"
                        placeholder="npr. Sto broj 1"
                        value={newTable.new_table_name}
                        onChange={handleTableChange}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="new_number_of_guests">
                        Broj mesta
                      </FieldLabel>
                      <Input
                        id="new_number_of_guests"
                        name="new_number_of_guests"
                        type="number"
                        min={1}
                        value={newTable.new_number_of_guests}
                        onChange={handleTableChange}
                      />
                    </Field>
                    <Button
                      type="button"
                      className="w-full cursor-pointer"
                      onClick={submitNewTableHandler}
                      disabled={tablesLoading}
                    >
                      {tablesLoading ? (
                        <>
                          <Loader className="mr-2" size={16} />
                          Kreiram novi sto...
                        </>
                      ) : (
                        "Kreiraj novi sto"
                      )}
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <FieldLabel htmlFor="table">Sto</FieldLabel>
                <FieldDescription>
                  Dostupno samo za goste sa statusom „Dolazi“.
                </FieldDescription>
                <SelectInput
                  disabled={form.rsvp_status !== "accepted"}
                  disabledTooltip='Gost mora imati status "Dolazi" da bi mogao biti raspoređen za sto.'
                  items={tablesForSelect}
                  value={form.table_id ?? ""}
                  onChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      table_id: value,
                    }))
                  }
                />
              </>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="notes">Napomene</FieldLabel>
            <Input
              id="notes"
              name="notes"
              placeholder="npr. posti, alergija..."
              value={form.notes ?? ""}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="message">Poruka</FieldLabel>
            <Input
              id="message"
              name="message"
              placeholder="Poruka gosta"
              value={form.message ?? ""}
              onChange={handleChange}
            />
          </Field>
        </FieldGroup>

        <SheetFooter>
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? (
              <>
                <Loader className="mr-2" size={16} />
                Čuvanje...
              </>
            ) : (
              "Sačuvaj izmene"
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
      </form>
    </>
  );
};

export default EditGuestModal;
