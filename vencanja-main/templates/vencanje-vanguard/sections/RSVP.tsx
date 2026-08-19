"use client";

import { FC, FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RSVPSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { usePublicRsvpSubmit } from "@/components/invitation/usePublicRsvpSubmit";
import FormConfirmMessage, {
  Attendance,
} from "../components/FormConfirmMessage";

type Props = {
  section: RSVPSection;
  event: EventConfig;
  theme: ThemeConfig;
};

type FormState = {
  fullName: string;
  email: string;
  attendance: Attendance;
  guests: number;
  message: string;
};

const ATTENDANCE_OPTIONS = [
  { value: "yes", label: "Dolazim" },
  { value: "no", label: "Ne mogu" },
] as const;

const RSVP: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#8B2E2E";

  const {
    loading,
    submitted,
    error,
    handleSubmit: submitRsvp,
    setSubmitted,
  } = usePublicRsvpSubmit();

  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    attendance: "yes",
    guests: 1,
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    void submitRsvp(e, {
      fullName: formData.fullName,
      email: formData.email,
      attendance: formData.attendance,
      guests: formData.guests,
      message: formData.message,
    });
  };

  return (
    <section id={id} className="vg-section">
      <div className="vg-shell-narrow">
        <div className="mb-10">
          <p className="vg-kicker">RSVP</p>
          <h2 className="vg-display mt-4">{data.title}</h2>
          <p className="vg-body mt-5 max-w-md">
            {data.description}
            {formatDate(event.rsvpDate, "D_MMMM_YYYY")}
          </p>
        </div>

        <div className="border border-[var(--color-vg-ink)] px-5 py-10 sm:px-8 sm:py-12">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <label className="vg-label" htmlFor="vg-fullName">
                      Ime i prezime
                    </label>
                    <input
                      id="vg-fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="vg-input"
                      placeholder="Vaše ime"
                    />
                  </div>

                  <div>
                    <label className="vg-label" htmlFor="vg-email">
                      Email
                    </label>
                    <input
                      id="vg-email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="vg-input"
                      placeholder="ime@email.com"
                    />
                  </div>
                </div>

                <div>
                  <p className="vg-label">Prisustvo</p>
                  <div className="grid grid-cols-2 gap-3">
                    {ATTENDANCE_OPTIONS.map((option) => (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="vg-attendance"
                          value={option.value}
                          checked={formData.attendance === option.value}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              attendance: option.value,
                            })
                          }
                          className="peer sr-only"
                        />
                        <span className="vg-choice block">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.attendance === "yes" ? (
                  <div className="sm:max-w-[12rem]">
                    <label className="vg-label" htmlFor="vg-guests">
                      Broj gostiju
                    </label>
                    <input
                      id="vg-guests"
                      type="number"
                      min={1}
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guests: Number(e.target.value),
                        })
                      }
                      className="vg-input"
                    />
                  </div>
                ) : null}

                <div>
                  <label className="vg-label" htmlFor="vg-message">
                    {data.messageLabel ?? "Poruka"}
                  </label>
                  <textarea
                    id="vg-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="vg-input min-h-20 resize-none"
                    placeholder={
                      data.messagePlaceholder ?? "Opciono — par reči za nas"
                    }
                  />
                </div>

                {error ? (
                  <p className="vg-body text-red-700">{error}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="vg-btn w-full sm:w-auto"
                >
                  {loading ? "Slanje…" : data.buttonText || "Pošalji odgovor"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FormConfirmMessage
                  attendance={formData.attendance}
                  accent={accent}
                  onClick={() => setSubmitted(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
