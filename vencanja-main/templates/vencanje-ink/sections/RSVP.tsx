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
  const accent = theme.colors?.base?.primary?.value ?? "#111111";

  const {
    loading,
    submitted,
    error,
    handleSubmit: submitRsvp,
    setSubmitted,
  } = usePublicRsvpSubmit();

  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    attendance: "yes",
    guests: 1,
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    void submitRsvp(e, {
      fullName: formData.fullName,
      attendance: formData.attendance,
      guests: formData.attendance === "yes" ? formData.guests : 0,
      message: formData.message,
    });
  };

  return (
    <section id={id} className="vi-section">
      <div className="vi-shell">
        <div className="vi-rule-ink" />
        <div className="flex flex-wrap items-baseline justify-between gap-3 py-4">
          <p className="vi-eyebrow">Potvrda</p>
          <p className="vi-caption">
            Rok — {formatDate(event.rsvpDate, "DD.MM.YYYY")}
          </p>
        </div>

        <div className="vi-grid mt-10 items-start">
          <div className="lg:col-span-5">
            <h2 className="vi-display max-w-sm">{data.title}</h2>
            <div className="vi-accent mt-8" style={{ background: accent }} />
            <p className="vi-body mt-6 max-w-sm">
              {data.description}
              {formatDate(event.rsvpDate, "D_MMMM_YYYY")}
            </p>

            <div className="mt-10 w-32 sm:w-40">
              <Media
                src={data.imageUrl}
                alt=""
                className="vi-plate-portrait"
                caption={event.names}
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="space-y-8 border-t border-vi-line pt-8"
                >
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <label className="vi-label" htmlFor="vi-fullName">
                        Ime i prezime
                      </label>
                      <input
                        id="vi-fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="vi-input"
                        placeholder="Vaše ime"
                      />
                    </div>

                  </div>

                  <div>
                    <p className="vi-label">Prisustvo</p>
                    <div className="grid grid-cols-2 gap-3">
                      {ATTENDANCE_OPTIONS.map((option) => (
                        <label key={option.value} className="cursor-pointer">
                          <input
                            type="radio"
                            name="vi-attendance"
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
                          <span className="vi-choice block">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.attendance === "yes" ? (
                    <div className="sm:max-w-[12rem]">
                      <label className="vi-label" htmlFor="vi-guests">
                        Broj gostiju
                      </label>
                      <input
                        id="vi-guests"
                        type="number"
                        min={1}
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guests: Number(e.target.value),
                          })
                        }
                        className="vi-input"
                      />
                    </div>
                  ) : null}

                  <div>
                    <label className="vi-label" htmlFor="vi-message">
                      {data.messageLabel ?? "Poruka"}
                    </label>
                    <textarea
                      id="vi-message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="vi-input min-h-20 resize-none"
                      placeholder={
                        data.messagePlaceholder ?? "Opciono — par reči za nas"
                      }
                    />
                  </div>

                  {error ? (
                    <p className="vi-body text-red-700">{error}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className="vi-btn w-full sm:w-auto"
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
      </div>
    </section>
  );
};

export default RSVP;
