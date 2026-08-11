import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
import { useGuests } from "../context/GuestContext";
import { useDashboard } from "../context/DashboardContext";
import { useState } from "react";
import { CreateGuestDto, RSVPStatus } from "../types";
import { useDialog } from "../context/ModalContext";
import Loader from "../loaders/Loader";
import SelectInput, { SelectOption } from "../SelectInput";
import { useTables } from "../context/TableContext";
import { guestStatusOptions } from "../guestOptions";
import { suggestIsChild } from "../utils/guestParty";

const AddNewGuestModal = () => {
  const { closeModal } = useDialog();
  const { createGuest, loading } = useGuests();
  const { tables } = useTables();
  const { activeProject } = useDashboard();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const childAgeLimit =
    activeProject?.config_json?.event?.childAgeLimit ?? null;

  const [form, setForm] = useState<CreateGuestDto>({
    name: "",
    notes: "",
    email: "",
    rsvp_status: "pending",
    message: "",
    table_id: null,
    is_child: false,
    age: null,
    party_size: 1,
    name_pending: false,
    parent_guest_id: null,
  });
  const [ageText, setAgeText] = useState("");

  const tablesForSelect: SelectOption[] = tables.map((table) => ({
    label: table.name,
    value: table.id,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAgeChange = (value: string) => {
    setAgeText(value);
    const ageNum = value.trim() === "" ? null : Number.parseInt(value, 10);
    const suggested =
      ageNum != null && !Number.isNaN(ageNum)
        ? suggestIsChild(ageNum, childAgeLimit)
        : null;
    setForm((prev) => ({
      ...prev,
      age: ageNum != null && !Number.isNaN(ageNum) ? ageNum : null,
      ...(suggested != null ? { is_child: suggested } : {}),
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

    if (
      form.age != null &&
      (Number.isNaN(form.age) || form.age < 0 || form.age > 120)
    ) {
      nextErrors.age = "Godine moraju biti od 0 do 120.";
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

    try {
      await createGuest({
        ...form,
        name: form.name.trim(),
        email: form.email?.trim() || null,
        message: form.message?.trim() || null,
        notes: form.notes?.trim() || null,
        table_id:
          form.rsvp_status === "accepted" ? form.table_id || null : null,
        party_size: 1,
        name_pending: false,
        parent_guest_id: null,
      });
      toast.success("Gost je uspešno dodat.", { position: "top-center" });
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
        <SheetTitle>Dodaj novog gosta</SheetTitle>
        <SheetDescription>
          Unesite podatke o osobi, status dolaska, da li je dete i po želji sto.
        </SheetDescription>
      </SheetHeader>

      <form onSubmit={submitHandler} className="space-y-6">
        <FieldGroup className="rounded-xl border bg-muted/20 p-4">
          <Field>
            <FieldLabel htmlFor="name">Ime i prezime</FieldLabel>
            <FieldDescription>Obavezno polje.</FieldDescription>
            <Input
              id="name"
              name="name"
              placeholder="npr. Marko Marković"
              onChange={handleChange}
              value={form.name}
            />
            {errors.name ? (
              <p className="text-sm text-destructive">{errors.name}</p>
            ) : null}
          </Field>

          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="age">Godine</FieldLabel>
              <FieldDescription>Opciono.</FieldDescription>
              <Input
                id="age"
                type="number"
                min={0}
                max={120}
                placeholder="npr. 7"
                value={ageText}
                onChange={(e) => handleAgeChange(e.target.value)}
              />
              {errors.age ? (
                <p className="text-sm text-destructive">{errors.age}</p>
              ) : null}
            </Field>
            <Field>
              <FieldLabel>Kategorija</FieldLabel>
              <SelectInput
                items={[
                  { label: "Odrasla osoba", value: "adult" },
                  { label: "Dete", value: "child" },
                ]}
                value={form.is_child ? "child" : "adult"}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    is_child: value === "child",
                  }))
                }
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="email">Email adresa</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="npr. marko@email.com"
              onChange={handleChange}
              value={form.email ?? ""}
            />
            {errors.email ? (
              <p className="text-sm text-destructive">{errors.email}</p>
            ) : null}
          </Field>

          <Field>
            <FieldLabel htmlFor="rsvp_status">Status dolaska</FieldLabel>
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
                setErrors((prev) => ({ ...prev, rsvp_status: "" }));
              }}
            />
            {errors.rsvp_status ? (
              <p className="text-sm text-destructive">{errors.rsvp_status}</p>
            ) : null}
          </Field>

          <Field>
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
          </Field>

          <Field>
            <FieldLabel htmlFor="notes">Napomene</FieldLabel>
            <FieldDescription>
              Može uključivati napomenu za decu (npr. „Deca sede sa
              roditeljima.“).
            </FieldDescription>
            <Input
              id="notes"
              name="notes"
              placeholder="npr. posti, alergija, deca za stolom 5..."
              value={form.notes ?? ""}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="message">Poruka (RSVP)</FieldLabel>
            <FieldDescription>
              Poruka osobe koja je potvrdila dolazak — opciono pri ručnom
              unosu.
            </FieldDescription>
            <Input
              id="message"
              name="message"
              placeholder="Poruka uz RSVP"
              value={form.message ?? ""}
              onChange={handleChange}
            />
          </Field>
        </FieldGroup>

        <SheetFooter>
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? (
              <>
                Čuvanje...
                <Loader className="mr-2" size={16} />
              </>
            ) : (
              "Dodaj gosta"
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
      </form>
    </>
  );
};

export default AddNewGuestModal;
