"use client";

import { useMemo, useState } from "react";
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
import { useDialog } from "../context/ModalContext";
import { useGuests } from "../context/GuestContext";
import { useDashboard } from "../context/DashboardContext";
import Loader from "../loaders/Loader";
import SelectInput from "../SelectInput";
import {
  getPartyMembers,
  isRsvpContact,
  suggestIsChild,
} from "../utils/guestParty";
import { ResolvePartyPersonInput } from "../types";

type PersonForm = {
  id?: string;
  name: string;
  is_child: boolean;
  age: string;
};

const ResolvePartyNamesModal = () => {
  const { data, closeModal } = useDialog();
  const { guests, resolvePartyNames, loading } = useGuests();
  const { activeProject } = useDashboard();
  const contactId = data?.id ?? "";
  const contact = guests.find((g) => g.id === contactId);

  const childAgeLimit =
    activeProject?.config_json?.event?.childAgeLimit ?? null;

  const initialPeople = useMemo((): PersonForm[] => {
    if (!contact || !isRsvpContact(contact)) return [];
    const members = getPartyMembers(contact, guests);
    const targetSize = Math.max(contact.party_size || members.length, 1);

    return Array.from({ length: targetSize }, (_, index) => {
      const member = members[index];
      if (member) {
        return {
          id: member.id,
          name: member.name_pending ? (index === 0 ? contact.name : "") : member.name,
          is_child: member.is_child,
          age: member.age != null ? String(member.age) : "",
        };
      }
      return {
        name: "",
        is_child: false,
        age: "",
      };
    });
  }, [contact, guests]);

  const [people, setPeople] = useState<PersonForm[]>(initialPeople);
  const [sourceKey, setSourceKey] = useState(contactId);

  if (contactId !== sourceKey) {
    setSourceKey(contactId);
    setPeople(initialPeople);
  }

  if (!contact || !isRsvpContact(contact)) {
    return (
      <>
        <SheetHeader>
          <SheetTitle>Unesi imena gostiju</SheetTitle>
          <SheetDescription>
            RSVP prijava nije pronađena. Osvežite stranicu i pokušajte ponovo.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button variant="outline" onClick={closeModal}>
            Zatvori
          </Button>
        </SheetFooter>
      </>
    );
  }

  const updatePerson = (index: number, patch: Partial<PersonForm>) => {
    setPeople((prev) =>
      prev.map((person, i) => (i === index ? { ...person, ...patch } : person)),
    );
  };

  const onAgeChange = (index: number, ageValue: string) => {
    const ageNum =
      ageValue.trim() === "" ? null : Number.parseInt(ageValue, 10);
    const suggested =
      ageNum != null && !Number.isNaN(ageNum)
        ? suggestIsChild(ageNum, childAgeLimit)
        : null;

    updatePerson(index, {
      age: ageValue,
      ...(suggested != null ? { is_child: suggested } : {}),
    });
  };

  const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleaned: ResolvePartyPersonInput[] = people.map((person) => ({
      id: person.id,
      name: person.name.trim(),
      is_child: person.is_child,
      age:
        person.age.trim() === ""
          ? null
          : Number.parseInt(person.age, 10),
    }));

    if (cleaned.some((person) => !person.name)) {
      toast.error("Unesite ime i prezime za svaku osobu.", {
        position: "top-center",
      });
      return;
    }

    if (
      cleaned.some(
        (person) =>
          person.age != null &&
          (Number.isNaN(person.age) || person.age < 0 || person.age > 120),
      )
    ) {
      toast.error("Godine moraju biti broj od 0 do 120.", {
        position: "top-center",
      });
      return;
    }

    try {
      await resolvePartyNames(contactId, cleaned);
      toast.success("Imena gostiju su sačuvana.", { position: "top-center" });
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
        <SheetTitle>Unesi imena gostiju</SheetTitle>
        <SheetDescription>
          Osoba koja je potvrdila dolazak:{" "}
          <span className="font-medium text-foreground">{contact.name}</span>
          . Unesite ime svake osobe koja dolazi ({contact.party_size} ukupno).
        </SheetDescription>
      </SheetHeader>

      {contact.message?.trim() ? (
        <div className="rounded-xl border bg-muted/20 px-3 py-2 text-sm">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Poruka uz RSVP
          </p>
          <p className="mt-1 text-foreground">{contact.message}</p>
        </div>
      ) : null}

      <form onSubmit={submitHandler} className="space-y-4">
        <FieldGroup className="space-y-4 rounded-xl border bg-muted/20 p-4">
          {people.map((person, index) => (
            <div
              key={person.id ?? `person-${index}`}
              className="space-y-3 rounded-xl border bg-background p-3"
            >
              <p className="text-sm font-medium">
                {index === 0
                  ? "Osoba koja je potvrdila dolazak"
                  : `Osoba ${index + 1}`}
              </p>
              <Field>
                <FieldLabel>Ime i prezime</FieldLabel>
                <Input
                  value={person.name}
                  placeholder="npr. Jelena Marković"
                  onChange={(e) =>
                    updatePerson(index, { name: e.target.value })
                  }
                />
              </Field>
              <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
                <Field>
                  <FieldLabel>Godine (opciono)</FieldLabel>
                  <Input
                    type="number"
                    min={0}
                    max={120}
                    value={person.age}
                    placeholder="npr. 7"
                    onChange={(e) => onAgeChange(index, e.target.value)}
                  />
                  {childAgeLimit != null ? (
                    <FieldDescription>
                      Predlog: ispod {childAgeLimit} god. = dete (možete
                      promeniti).
                    </FieldDescription>
                  ) : null}
                </Field>
                <Field>
                  <FieldLabel>Kategorija</FieldLabel>
                  <SelectInput
                    items={[
                      { label: "Odrasla osoba", value: "adult" },
                      { label: "Dete", value: "child" },
                    ]}
                    value={person.is_child ? "child" : "adult"}
                    onChange={(value) =>
                      updatePerson(index, { is_child: value === "child" })
                    }
                  />
                </Field>
              </div>
            </div>
          ))}
        </FieldGroup>

        <SheetFooter>
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? (
              <>
                <Loader className="mr-2" size={16} />
                Čuvanje...
              </>
            ) : (
              "Sačuvaj imena"
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

export default ResolvePartyNamesModal;
