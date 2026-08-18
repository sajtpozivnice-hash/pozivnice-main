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
import { Media } from "../components/Media";

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

const RSVP: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const hasImage = Boolean(data.imageUrl?.trim());

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
    <section id={id} className="va-section bg-va-paper">
      <div
        className={
          hasImage
            ? "va-shell grid items-start gap-10 lg:grid-cols-12 lg:gap-12"
            : "va-shell max-w-xl"
        }
      >
        {hasImage ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <Media
              src={data.imageUrl}
              alt={data.title}
              className="aspect-[4/5] w-full"
            />
          </motion.div>
        ) : null}

        <div className={hasImage ? "lg:col-span-7" : undefined}>
          <p className="va-eyebrow">RSVP</p>
          <h2 className="va-display mt-4">{data.title}</h2>
          <p className="va-body mt-3 max-w-md text-va-muted">
            {data.description}
            {formatDate(event.rsvpDate, "D_MMMM_YYYY")}
          </p>

          <div className="mt-8 max-w-md">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={handleSubmit}
                  className="space-y-7"
                >
                  <div>
                    <label className="va-label" htmlFor="va-fullName">
                      Ime i prezime
                    </label>
                    <input
                      id="va-fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="va-input"
                      placeholder=" "
                    />
                  </div>

                  <div>
                    <label className="va-label" htmlFor="va-email">
                      Email
                    </label>
                    <input
                      id="va-email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="va-input"
                      placeholder=" "
                    />
                  </div>

                  <div>
                    <p className="va-label">Prisustvo</p>
                    <div className="grid grid-cols-2 gap-3">
                      {ATTENDANCE_OPTIONS.map((option) => (
                        <label key={option.value} className="cursor-pointer">
                          <input
                            type="radio"
                            name="va-attendance"
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
                          <span className="va-choice block">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.attendance === "yes" ? (
                    <div className="max-w-[7rem]">
                      <label className="va-label" htmlFor="va-guests">
                        Broj gostiju
                      </label>
                      <input
                        id="va-guests"
                        type="number"
                        min={1}
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guests: Number(e.target.value),
                          })
                        }
                        className="va-input"
                      />
                    </div>
                  ) : null}

                  <div>
                    <label className="va-label" htmlFor="va-message">
                      {data.messageLabel ?? "Poruka"}
                    </label>
                    <textarea
                      id="va-message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="va-input min-h-16 resize-none"
                      placeholder={data.messagePlaceholder ?? " "}
                    />
                  </div>

                  {error ? (
                    <p className="va-body text-sm text-red-800">{error}</p>
                  ) : null}

                  <button type="submit" disabled={loading} className="va-btn">
                    {loading ? "Slanje…" : data.buttonText || "Pošalji"}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FormConfirmMessage
                    attendance={formData.attendance}
                    onClick={() => setSubmitted(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
