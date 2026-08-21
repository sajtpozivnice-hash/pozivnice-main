"use client";

import { FormEvent, useState } from "react";
import { useInvitationProject } from "@/components/invitation/InvitationProjectContext";
import { submitPublicRsvp } from "@/lib/rsvp/submitPublicRsvp";

type Attendance = "yes" | "no";

type RsvpFormValues = {
  fullName: string;
  email?: string;
  attendance: Attendance;
  guests: number;
  message?: string;
};

/**
 * Shared RSVP submit for public invitation templates.
 * Persists contact + companion placeholders via /api/rsvp.
 */
export function usePublicRsvpSubmit() {
  const { projectId } = useInvitationProject();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    e: FormEvent,
    values: RsvpFormValues,
  ): Promise<boolean> => {
    e.preventDefault();
    setError(null);

    if (!projectId) {
      setError("Pozivnica nije spremna za RSVP. Osvežite stranicu.");
      return false;
    }

    setLoading(true);
    try {
      await submitPublicRsvp({
        projectId,
        fullName: values.fullName,
        email: values.email,
        guestsCount: values.guests,
        message: values.message,
        attendance: values.attendance,
      });
      setSubmitted(true);
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "RSVP nije sačuvan.";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, submitted, error, handleSubmit, setSubmitted };
}
