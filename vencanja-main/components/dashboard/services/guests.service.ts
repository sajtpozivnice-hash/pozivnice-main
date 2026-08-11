import { createClient } from "@/lib/supabase/client";
import {
  CreateGuestDto,
  Guest,
  PublicRsvpPayload,
  ResolvePartyPersonInput,
  RSVPStatus,
} from "../types";
import { isDemoMode } from "@/lib/demo/mode";
import {
  demoCreateGuest,
  demoDeleteGuest,
  demoGetGuests,
  demoResolvePartyNames,
  demoSubmitPublicRsvp,
  demoUpdateGuest,
} from "@/lib/demo/adapters";
import { mapAttendanceToRsvpStatus } from "../utils/guestParty";

const supabase = createClient();

const GUEST_SELECT = `
  *,
  tables(
    id,
    name
  )
`;

export function normalizeGuest(row: Record<string, unknown>): Guest {
  const tables = row.tables as Guest["tables"] | null | undefined;
  return {
    id: String(row.id),
    project_id: String(row.project_id),
    name: typeof row.name === "string" ? row.name : "",
    email: (row.email as string | null | undefined) ?? null,
    rsvp_status: (row.rsvp_status as RSVPStatus) ?? "pending",
    message: (row.message as string | null | undefined) ?? null,
    notes: (row.notes as string | null | undefined) ?? null,
    table_id: (row.table_id as string | null | undefined) ?? null,
    party_size:
      typeof row.party_size === "number" && row.party_size > 0
        ? row.party_size
        : 1,
    is_child: Boolean(row.is_child),
    age: typeof row.age === "number" ? row.age : null,
    parent_guest_id:
      (row.parent_guest_id as string | null | undefined) ?? null,
    name_pending: Boolean(row.name_pending),
    created_at: String(row.created_at ?? new Date().toISOString()),
    updated_at: String(row.updated_at ?? row.created_at ?? new Date().toISOString()),
    tables: tables ?? null,
  };
}

export const getGuestsByProjectService = async (
  projectId: string,
): Promise<Guest[]> => {
  if (isDemoMode(projectId)) return demoGetGuests(projectId);

  const { data, error } = await supabase
    .from("guests")
    .select(GUEST_SELECT)
    .eq("project_id", projectId)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) =>
    normalizeGuest(row as Record<string, unknown>),
  );
};

export const createGuestService = async (
  projectId: string,
  guest: CreateGuestDto,
): Promise<Guest> => {
  if (isDemoMode(projectId)) return demoCreateGuest(projectId, guest);

  const payload = {
    project_id: projectId,
    name: guest.name,
    email: guest.email ?? null,
    rsvp_status: guest.rsvp_status ?? "pending",
    message: guest.message ?? null,
    notes: guest.notes ?? null,
    table_id: guest.table_id ?? null,
    party_size: guest.party_size ?? 1,
    is_child: guest.is_child ?? false,
    age: guest.age ?? null,
    parent_guest_id: guest.parent_guest_id ?? null,
    name_pending: guest.name_pending ?? false,
  };

  const { data, error } = await supabase
    .from("guests")
    .insert(payload)
    .select(GUEST_SELECT)
    .single();

  if (error) {
    throw error;
  }

  return normalizeGuest(data as Record<string, unknown>);
};

export const updateGuestService = async (
  id: string,
  updates: Partial<CreateGuestDto>,
  options?: { projectId?: string },
): Promise<Guest> => {
  if (isDemoMode(id) || (options?.projectId && isDemoMode(options.projectId))) {
    return demoUpdateGuest(id, updates);
  }

  const { data, error } = await supabase
    .from("guests")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select(GUEST_SELECT)
    .single();
  if (error) {
    throw error;
  }

  const updated = normalizeGuest(data as Record<string, unknown>);

  // Keep party members aligned with the RSVP contact status.
  if (
    !updated.parent_guest_id &&
    updates.rsvp_status != null &&
    updates.rsvp_status !== ""
  ) {
    await supabase
      .from("guests")
      .update({
        rsvp_status: updates.rsvp_status,
        updated_at: new Date().toISOString(),
      })
      .eq("parent_guest_id", updated.id);
  }

  return updated;
};

export const deleteGuestService = async (
  id: string,
  options?: { projectId?: string },
): Promise<void> => {
  if (isDemoMode(id) || (options?.projectId && isDemoMode(options.projectId))) {
    demoDeleteGuest(id);
    return;
  }

  const { data: existing } = await supabase
    .from("guests")
    .select("id, parent_guest_id, project_id")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    throw error;
  }

  if (existing?.parent_guest_id) {
    const { data: siblings } = await supabase
      .from("guests")
      .select("id")
      .eq("parent_guest_id", existing.parent_guest_id);

    const partySize = 1 + (siblings?.length ?? 0);
    await supabase
      .from("guests")
      .update({
        party_size: partySize,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.parent_guest_id);
  }
};

export const resolvePartyNamesService = async (
  projectId: string,
  contactId: string,
  people: ResolvePartyPersonInput[],
): Promise<Guest[]> => {
  if (isDemoMode(projectId)) {
    return demoResolvePartyNames(projectId, contactId, people);
  }

  if (people.length < 1) {
    throw new Error("Potrebna je bar jedna osoba.");
  }

  const { data: contactRow, error: contactError } = await supabase
    .from("guests")
    .select(GUEST_SELECT)
    .eq("id", contactId)
    .eq("project_id", projectId)
    .single();

  if (contactError || !contactRow) {
    throw contactError || new Error("RSVP prijava nije pronađena.");
  }

  const contact = normalizeGuest(contactRow as Record<string, unknown>);
  if (contact.parent_guest_id) {
    throw new Error("Imena se unose na RSVP prijavi, ne na pojedinačnoj osobi.");
  }

  const { data: companionRows } = await supabase
    .from("guests")
    .select(GUEST_SELECT)
    .eq("parent_guest_id", contactId)
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });

  const companions = (companionRows ?? []).map((row) =>
    normalizeGuest(row as Record<string, unknown>),
  );

  const [primary, ...rest] = people;

  const { data: updatedContactRow, error: updateContactError } = await supabase
    .from("guests")
    .update({
      name: primary.name.trim(),
      is_child: primary.is_child,
      age: primary.age ?? null,
      name_pending: false,
      party_size: people.length,
      updated_at: new Date().toISOString(),
    })
    .eq("id", contactId)
    .eq("project_id", projectId)
    .select(GUEST_SELECT)
    .single();

  if (updateContactError || !updatedContactRow) {
    throw updateContactError || new Error("Neuspešno čuvanje.");
  }

  const result: Guest[] = [
    normalizeGuest(updatedContactRow as Record<string, unknown>),
  ];

  for (let i = 0; i < rest.length; i += 1) {
    const person = rest[i];
    const existing = companions[i];

    if (existing) {
      const { data, error } = await supabase
        .from("guests")
        .update({
          name: person.name.trim(),
          is_child: person.is_child,
          age: person.age ?? null,
          name_pending: false,
          party_size: 1,
          message: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .eq("project_id", projectId)
        .select(GUEST_SELECT)
        .single();

      if (error || !data) throw error || new Error("Neuspešno čuvanje.");
      result.push(normalizeGuest(data as Record<string, unknown>));
    } else {
      const { data, error } = await supabase
        .from("guests")
        .insert({
          project_id: projectId,
          name: person.name.trim(),
          email: null,
          rsvp_status: contact.rsvp_status,
          message: null,
          notes: null,
          table_id: null,
          party_size: 1,
          is_child: person.is_child,
          age: person.age ?? null,
          parent_guest_id: contactId,
          name_pending: false,
        })
        .select(GUEST_SELECT)
        .single();

      if (error || !data) throw error || new Error("Neuspešno čuvanje.");
      result.push(normalizeGuest(data as Record<string, unknown>));
    }
  }

  if (companions.length > rest.length) {
    const toRemove = companions.slice(rest.length).map((g) => g.id);
    if (toRemove.length > 0) {
      const { error } = await supabase
        .from("guests")
        .delete()
        .in("id", toRemove)
        .eq("project_id", projectId);
      if (error) throw error;
    }
  }

  return result;
};

export const submitPublicRsvpService = async (
  payload: PublicRsvpPayload,
): Promise<{ contactId: string }> => {
  if (isDemoMode(payload.projectId)) {
    return demoSubmitPublicRsvp(payload);
  }

  const partySize = Math.min(Math.max(Math.floor(payload.guestsCount) || 1, 1), 50);
  const status = mapAttendanceToRsvpStatus(payload.attendance);
  const fullName = payload.fullName.trim();

  if (!fullName) {
    throw new Error("Ime i prezime su obavezni.");
  }

  const contact = await createGuestService(payload.projectId, {
    name: fullName,
    email: payload.email?.trim() || null,
    message: payload.message?.trim() || null,
    notes: null,
    rsvp_status: status,
    table_id: null,
    party_size: partySize,
    is_child: false,
    age: null,
    parent_guest_id: null,
    name_pending: false,
  });

  const companions: CreateGuestDto[] = Array.from(
    { length: Math.max(partySize - 1, 0) },
    () => ({
      name: "",
      email: null,
      message: null,
      notes: null,
      rsvp_status: status,
      table_id: null,
      party_size: 1,
      is_child: false,
      age: null,
      parent_guest_id: contact.id,
      name_pending: true,
    }),
  );

  try {
    for (const companion of companions) {
      await createGuestService(payload.projectId, companion);
    }
  } catch (error) {
    await deleteGuestService(contact.id, { projectId: payload.projectId });
    throw error;
  }

  return { contactId: contact.id };
};
