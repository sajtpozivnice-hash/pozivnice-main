"use client";

import { usePublicRsvpSubmit } from "@/components/invitation/usePublicRsvpSubmit";
import { FormEvent, FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { RSVPSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
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

const RSVP: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

  const { loading, submitted, error, handleSubmit: submitRsvp, setSubmitted } =
    usePublicRsvpSubmit();
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
    <section id={id} className="kc-section bg-kc-ivory">
      <div className="kc-container">
        {/* Two-panel formal spread — left seal & introduction, right bordered field plate */}
        <div className="kc-rsvp-grid">
          <div className="kc-rsvp-intro">
            <div className="kc-ornament mb-5 lg:justify-start">
              <span className="kc-ornament-dot" />
            </div>
            <p className="kc-eyebrow mb-4">Potvrda dolaska</p>
            <h2 className="kc-heading">{data.title}</h2>
            <p className="mt-4 text-base text-kc-muted">
              {data.description}
              {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
            </p>
            <div className="kc-rsvp-seal" aria-hidden>
              <span className="kc-rsvp-seal-ring">
                <span className="kc-rsvp-seal-inner" />
              </span>
            </div>
          </div>

          <div className="kc-rsvp-panel">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="kc-rsvp-duo">
                    <div>
                      <label className="kc-label" htmlFor="fullName">
                        Ime i prezime
                      </label>
                      <input
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="kc-input"
                        placeholder="Vaše ime i prezime"
                      />
                    </div>

                    <div>
                      <label className="kc-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="kc-input"
                        placeholder="vas@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="kc-label">Da li dolazite?</p>
                    <div className="kc-segmented">
                      {(
                        [
                          { value: "yes", label: "Da, dolazimo" },
                          { value: "no", label: "Nažalost ne" },
                        ] as const
                      ).map((option) => (
                        <label
                          key={option.value}
                          className="kc-segmented-option-wrap"
                        >
                          <input
                            type="radio"
                            name="attendance"
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
                          <span className="kc-segmented-option">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.attendance === "yes" ? (
                    <div>
                      <label className="kc-label" htmlFor="guests">
                        Broj gostiju
                      </label>
                      <input
                        id="guests"
                        type="number"
                        min={1}
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guests: Number(e.target.value),
                          })
                        }
                        className="kc-input"
                      />
                    </div>
                  ) : null}

                  <div>
                    <label className="kc-label" htmlFor="message">
                      Poruka
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="kc-input min-h-24 resize-none"
                      placeholder="Vaša poruka za porodicu"
                    />
                  </div>

                  {error ? (
                    <p className="text-sm text-red-600">{error}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 border border-kc-ink bg-kc-ink px-6 py-4 text-xs font-medium uppercase tracking-[0.25em] text-kc-ivory transition hover:opacity-90 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-kc-ivory border-t-transparent" />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {data.buttonText || "Pošalji potvrdu"}
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
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
