"use client";

import { Guest } from "../types";
import { displayGuestName } from "../utils/guestParty";
import { cn } from "@/lib/utils";

export function ChildBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md border border-amber-300/80 bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-amber-800 uppercase",
        className,
      )}
    >
      Dete
    </span>
  );
}

export function GuestNameWithChildBadge({
  guest,
  className,
}: {
  guest: Guest;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2", className)}>
      <span className="truncate">{displayGuestName(guest)}</span>
      {guest.is_child ? <ChildBadge /> : null}
    </span>
  );
}
