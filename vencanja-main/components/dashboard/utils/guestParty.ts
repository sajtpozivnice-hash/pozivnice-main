import type { Guest, RSVPStatus } from "@/components/dashboard/types";

export function isRsvpContact(guest: Guest): boolean {
  return !guest.parent_guest_id;
}

export function displayGuestName(guest: Guest): string {
  if (guest.name_pending || !guest.name.trim()) {
    return "Ime nije uneto";
  }
  return guest.name.trim();
}

export function getPartyCompanions(contactId: string, guests: Guest[]): Guest[] {
  return guests.filter((g) => g.parent_guest_id === contactId);
}

export function getPartyMembers(contact: Guest, guests: Guest[]): Guest[] {
  if (!isRsvpContact(contact)) {
    return [contact];
  }
  return [contact, ...getPartyCompanions(contact.id, guests)];
}

export function getUnresolvedPartyCount(contact: Guest, guests: Guest[]): number {
  if (!isRsvpContact(contact)) return 0;
  const members = getPartyMembers(contact, guests);
  return members.filter((m) => m.name_pending || !m.name.trim()).length;
}

export function partyNeedsNameResolution(
  contact: Guest,
  guests: Guest[],
): boolean {
  if (!isRsvpContact(contact)) return false;
  if ((contact.party_size || 1) <= 1) return false;
  return getUnresolvedPartyCount(contact, guests) > 0;
}

export function mapAttendanceToRsvpStatus(
  attendance: "yes" | "no" | "maybe",
): RSVPStatus {
  if (attendance === "yes") return "accepted";
  if (attendance === "no") return "declined";
  return "pending";
}

export type GuestStats = {
  total: number;
  adults: number;
  children: number;
  accepted: number;
  pending: number;
  declined: number;
  unresolvedParties: number;
  unresolvedPeople: number;
};

/** Stats count individual people (rows), not RSVP form submissions. */
export function computeGuestStats(guests: Guest[]): GuestStats {
  const contacts = guests.filter(isRsvpContact);
  let unresolvedParties = 0;
  let unresolvedPeople = 0;

  for (const contact of contacts) {
    if (partyNeedsNameResolution(contact, guests)) {
      unresolvedParties += 1;
      unresolvedPeople += getUnresolvedPartyCount(contact, guests);
    }
  }

  return {
    total: guests.length,
    adults: guests.filter((g) => !g.is_child).length,
    children: guests.filter((g) => g.is_child).length,
    accepted: guests.filter((g) => g.rsvp_status === "accepted").length,
    pending: guests.filter((g) => g.rsvp_status === "pending").length,
    declined: guests.filter((g) => g.rsvp_status === "declined").length,
    unresolvedParties,
    unresolvedPeople,
  };
}

export function suggestIsChild(
  age: number | null | undefined,
  childAgeLimit: number | null | undefined,
): boolean | null {
  if (age == null || childAgeLimit == null) return null;
  return age < childAgeLimit;
}
