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
import { SceneShell } from "../components/SceneShell";

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

const STEPS = ["Vaši podaci", "Prisustvo", "Poruka za mladence"];

const RSVP: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#c9a86a";

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
    <SceneShell id={id} backgroundImage={data.imageUrl} overlay="dark">
      <div className="v4-content">
        <div className="v4-rsvp-desk">
          <div className="v4-rsvp-desk-aside">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="v4-eyebrow mb-5"
              style={{ color: accent }}
            >
              Potvrda
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="v4-heading"
            >
              {data.title}
            </motion.h2>
            <p className="mt-4 text-sm text-white/60 sm:text-base">
              {data.description}
              {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
            </p>

            <div className="v4-line my-8" />

            <ol className="v4-rsvp-steps">
              {STEPS.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="v4-rsvp-desk-main">
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
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="v4-label" htmlFor="v4-fullName">
                        Ime i prezime
                      </label>
                      <input
                        id="v4-fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="v4-input"
                        placeholder="Vaše ime i prezime"
                      />
                    </div>

                    <div>
                      <label className="v4-label" htmlFor="v4-email">
                        Email
                      </label>
                      <input
                        id="v4-email"
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="v4-input"
                        placeholder="vas@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="v4-label">Da li dolazite?</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {(
                        [
                          { value: "yes", label: "Da, dolazimo" },
                          { value: "no", label: "Nažalost ne" },
                        ] as const
                      ).map((option) => (
                        <label key={option.value} className="cursor-pointer">
                          <input
                            type="radio"
                            name="v4-attendance"
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
                          <div className="rounded-2xl border border-white/20 px-4 py-3.5 text-center text-sm text-white/80 transition peer-checked:border-transparent peer-checked:bg-white peer-checked:text-black hover:bg-white/10">
                            {option.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.attendance === "yes" ? (
                    <div>
                      <label className="v4-label" htmlFor="v4-guests">
                        Broj gostiju
                      </label>
                      <input
                        id="v4-guests"
                        type="number"
                        min={1}
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guests: Number(e.target.value),
                          })
                        }
                        className="v4-input"
                      />
                    </div>
                  ) : null}

                  <div>
                    <label className="v4-label" htmlFor="v4-message">
                      Poruka
                    </label>
                    <textarea
                      id="v4-message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="v4-input min-h-24 resize-none"
                      placeholder="Vaša poruka mladencima"
                    />
                  </div>

                  {error ? (
                    <p className="text-sm text-red-400">{error}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-50"
                    style={{ background: accent }}
                  >
                    {loading ? (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
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
                    accent={accent}
                    onClick={() => setSubmitted(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SceneShell>
  );
};

export default RSVP;
