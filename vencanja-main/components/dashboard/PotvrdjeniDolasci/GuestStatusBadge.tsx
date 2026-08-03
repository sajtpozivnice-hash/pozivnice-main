import { Badge } from "@/components/ui/badge";
import { RSVPStatus } from "../types";
import { guestStatusLabel } from "../guestOptions";

type GuestStatusBadgeProps = {
  status: RSVPStatus;
};

export const GuestStatusBadge = ({ status }: GuestStatusBadgeProps) => {
  if (status === "accepted") {
    return (
      <Badge
        className="border-green-200 bg-green-100 text-green-700"
        variant="outline"
      >
        {guestStatusLabel(status)}
      </Badge>
    );
  }

  if (status === "declined") {
    return (
      <Badge
        className="border-red-200 bg-red-100 text-red-700"
        variant="outline"
      >
        {guestStatusLabel(status)}
      </Badge>
    );
  }

  if (status === "pending") {
    return (
      <Badge
        className="border-amber-200 bg-amber-100 text-amber-700"
        variant="outline"
      >
        {guestStatusLabel(status)}
      </Badge>
    );
  }

  return (
    <Badge variant="secondary">{guestStatusLabel(status)}</Badge>
  );
};
