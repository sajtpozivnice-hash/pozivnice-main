"use client";

import { usePublicRsvpSubmit } from "@/components/invitation/usePublicRsvpSubmit";
import { FormEvent, FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Send } from "lucide-react";
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
    <section id={id} className="kd-section bg-kd-sand">
      <div className="kd-glow -bottom-16 -left-16 h-72 w-72" />

      <div className="kd-container">
        <div className="mb-12 text-center">
          <p className="kd-eyebrow mb-4">Potvrda</p>
          <h2 className="kd-heading">{data.title}</h2>
        </div>

        {/* Chapel register — open book spread: left page of vigil rules, right page of signing lines */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              onSubmit={handleSubmit}
              className="kd-book"
            >
              <div className="kd-book-page kd-book-page--left">
                <span className="kd-register-flame kd-register-flame--lit">
                  <Flame className="h-4 w-4" />
                </span>
                <p className="kd-script mt-4">Knjiga gostiju</p>
                <p className="mt-3 text-sm leading-relaxed text-kd-muted">
                  {data.description}
                  {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
                </p>
                <ol className="kd-book-rules">
                  <li>Upišite ime i prezime u knjigu</li>
                  <li>Potvrdite prisustvo na obredu</li>
                  <li>Ostavite poruku porodici</li>
                </ol>
              </div>

              <div className="kd-book-page kd-book-page--right">
              <ol className="kd-signing-lines">
                <li className="kd-signing-line">
                  <span className="kd-signing-num">01</span>
                  <div className="kd-signing-field">
                    <label className="kd-label" htmlFor="fullName">
                      Ime i prezime
                    </label>
                    <input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="kd-register-input"
                      placeholder="Vaše ime i prezime"
                    />
                  </div>
                </li>

                <li className="kd-signing-line">
                  <span className="kd-signing-num">02</span>
                  <div className="kd-signing-field">
                    <label className="kd-label" htmlFor="email">
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
                      className="kd-register-input"
                      placeholder="vas@email.com"
                    />
                  </div>
                </li>

                <li className="kd-signing-line kd-signing-line--tight">
                  <span className="kd-signing-num">03</span>
                  <div className="kd-signing-field">
                    <p className="kd-label">Da li dolazite?</p>
                    <div className="flex gap-5">
                      {(
                        [
                          { value: "yes", label: "Da, dolazimo" },
                          { value: "no", label: "Nažalost ne" },
                        ] as const
                      ).map((option) => (
                        <label
                          key={option.value}
                          className="flex cursor-pointer items-center gap-2"
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
                          <span className="kd-register-flame">
                            <Flame className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-sm text-kd-ink-soft">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </li>

                {formData.attendance === "yes" ? (
                  <li className="kd-signing-line">
                    <span className="kd-signing-num">04</span>
                    <div className="kd-signing-field">
                      <label className="kd-label" htmlFor="guests">
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
                        className="kd-register-input"
                      />
                    </div>
                  </li>
                ) : null}

                <li className="kd-signing-line kd-signing-line--last">
                  <span className="kd-signing-num">
                    {formData.attendance === "yes" ? "05" : "04"}
                  </span>
                  <div className="kd-signing-field">
                    <label className="kd-label" htmlFor="message">
                      Poruka
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="kd-register-input min-h-16 resize-none"
                      placeholder="Vaša poruka za porodicu"
                    />
                  </div>
                </li>
              </ol>

                {error ? (
                  <p className="mt-5 text-sm text-red-400">{error}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-kd-champagne/40 bg-kd-champagne/15 px-6 py-4 text-sm font-medium text-kd-champagne transition hover:bg-kd-champagne/25 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-kd-champagne border-t-transparent" />
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {data.buttonText || "Pošalji potvrdu"}
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-xl"
            >
              <FormConfirmMessage
                attendance={formData.attendance}
                onClick={() => setSubmitted(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RSVP;
