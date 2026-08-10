"use client";

import { FormEvent, FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { RSVPSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import FormConfirmMessage, {
  Attendance,
} from "../components/FormConfirmMessage";
import { PremiumMedia } from "../components/PremiumMedia";

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

const RSVP: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#9c7a45";
  const ink = theme.colors?.base?.secondary?.value ?? "#1c1917";

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    attendance: "yes",
    guests: 1,
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id={id} className="vp-section bg-vp-paper">
      <div className="vp-container grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5"
        >
          <PremiumMedia
            src={data.imageUrl}
            alt={data.title}
            className="aspect-[4/5] w-full"
          />
        </motion.div>

        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vp-eyebrow mb-4"
            style={{ color: accent }}
          >
            Potvrda
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vp-display mb-4"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          <p className="vp-body mb-10 text-vp-muted">
            {data.description}
            {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="space-y-7 border-t border-vp-line pt-8"
              >
                <div>
                  <label className="vp-label" htmlFor="vp-fullName">
                    Ime i prezime
                  </label>
                  <input
                    id="vp-fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="vp-input"
                    placeholder="Vaše ime i prezime"
                  />
                </div>

                <div>
                  <label className="vp-label" htmlFor="vp-email">
                    Email
                  </label>
                  <input
                    id="vp-email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="vp-input"
                    placeholder="you@email.com"
                  />
                </div>

                <div>
                  <p className="vp-label">Da li ćete doći?</p>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {(
                      [
                        { value: "yes", label: "Sa radošću, da" },
                        { value: "no", label: "Nažalost, ne" },
                      ] as const
                    ).map((option) => (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="vp-attendance"
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
                        <div className="border border-vp-line px-4 py-3.5 text-center text-sm transition peer-checked:border-vp-ink peer-checked:bg-vp-ink peer-checked:text-white hover:border-vp-ink/40">
                          {option.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.attendance === "yes" ? (
                  <div>
                    <label className="vp-label" htmlFor="vp-guests">
                      Broj gostiju
                    </label>
                    <input
                      id="vp-guests"
                      type="number"
                      min={1}
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guests: Number(e.target.value),
                        })
                      }
                      className="vp-input"
                    />
                  </div>
                ) : null}

                <div>
                  <label className="vp-label" htmlFor="vp-message">
                    Poruka
                  </label>
                  <textarea
                    id="vp-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="vp-input min-h-24 resize-none"
                    placeholder="Poruka za mladence"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 px-6 py-4 text-xs font-medium uppercase tracking-[0.28em] text-white transition hover:opacity-90 disabled:opacity-50 sm:w-auto"
                  style={{ background: ink }}
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      {data.buttonText || "Pošalji odgovor"}
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
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
    </section>
  );
};

export default RSVP;
