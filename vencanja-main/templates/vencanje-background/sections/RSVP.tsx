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
import { GlassPanel } from "../components/GlassPanel";

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
  const accent = theme.colors?.base?.primary?.value ?? "#e2c4a0";

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
    <section id={id} className="vb-section">
      <div className="vb-wrap-narrow">
        <div className="mb-8 text-center">
          <GlassPanel className="inline-block px-8 py-6">
            <p className="vb-eyebrow mb-3" style={{ color: accent }}>
              RSVP
            </p>
            <h2 className="vb-title text-3xl sm:text-4xl">{data.title}</h2>
            <p className="mt-3 text-sm text-white/55">
              {data.description}
              {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
            </p>
          </GlassPanel>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
            >
              <GlassPanel strong className="space-y-5 p-6 sm:p-10">
                <div>
                  <label className="vb-label" htmlFor="vb-fullName">
                    Ime i prezime
                  </label>
                  <input
                    id="vb-fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="vb-input"
                    placeholder="Vaše ime i prezime"
                  />
                </div>

                <div>
                  <label className="vb-label" htmlFor="vb-email">
                    Email
                  </label>
                  <input
                    id="vb-email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="vb-input"
                    placeholder="vas@email.com"
                  />
                </div>

                <div>
                  <p className="vb-label">Da li dolazite?</p>
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
                          name="vb-attendance"
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
                    <label className="vb-label" htmlFor="vb-guests">
                      Broj gostiju
                    </label>
                    <input
                      id="vb-guests"
                      type="number"
                      min={1}
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guests: Number(e.target.value),
                        })
                      }
                      className="vb-input"
                    />
                  </div>
                ) : null}

                <div>
                  <label className="vb-label" htmlFor="vb-message">
                    Poruka
                  </label>
                  <textarea
                    id="vb-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="vb-input min-h-24 resize-none"
                    placeholder="Vaša poruka mladencima"
                  />
                </div>

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
              </GlassPanel>
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
    </section>
  );
};

export default RSVP;
