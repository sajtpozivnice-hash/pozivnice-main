"use client";

import { FC, FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { RSVPSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { usePublicRsvpSubmit } from "@/components/invitation/usePublicRsvpSubmit";
import FormConfirmMessage, {
  Attendance,
} from "../components/FormConfirmMessage";
import { SageMedia } from "../components/Media";

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
  { value: "yes", label: "Radujem se, dolazim" },
  { value: "no", label: "Nažalost, ne mogu" },
] as const;

const RSVP: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#6b7f6a";
  const ink = theme.colors?.base?.secondary?.value ?? "#2c2a26";

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
    <section id={id} className="vs-section bg-vs-linen">
      <div className="vs-container grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vs-eyebrow mb-6"
            style={{ color: accent }}
          >
            Potvrda dolaska
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vs-display"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          <p className="vs-body mt-5 text-vs-muted">
            {data.description}
            {formatDate(event.rsvpDate, "D_MMMM_YYYY")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-12 hidden lg:block"
          >
            <SageMedia
              src={data.imageUrl}
              alt={data.title}
              className="aspect-[4/5] w-full"
            />
          </motion.div>
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
                className="space-y-8"
              >
                <div>
                  <label className="vs-label" htmlFor="vs-fullName">
                    Ime i prezime
                  </label>
                  <input
                    id="vs-fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="vs-input"
                    placeholder="Vaše ime i prezime"
                  />
                </div>

                <div>
                  <label className="vs-label" htmlFor="vs-email">
                    Email
                  </label>
                  <input
                    id="vs-email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="vs-input"
                    placeholder="vas@email.com"
                  />
                </div>

                <div>
                  <p className="vs-label">Da li ćete nam se pridružiti?</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {ATTENDANCE_OPTIONS.map((option) => (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="vs-attendance"
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
                        <span className="block border border-vs-line px-5 py-4 text-center text-sm text-vs-ink-soft transition hover:border-vs-ink/35 peer-checked:border-vs-sage peer-checked:bg-vs-sage-tint peer-checked:text-vs-ink">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.attendance === "yes" ? (
                  <div>
                    <label className="vs-label" htmlFor="vs-guests">
                      Broj gostiju
                    </label>
                    <input
                      id="vs-guests"
                      type="number"
                      min={1}
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guests: Number(e.target.value),
                        })
                      }
                      className="vs-input"
                    />
                  </div>
                ) : null}

                <div>
                  <label className="vs-label" htmlFor="vs-message">
                    {data.messageLabel ?? "Poruka"}
                  </label>
                  <textarea
                    id="vs-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="vs-input min-h-24 resize-none"
                    placeholder={
                      data.messagePlaceholder ?? "Poruka za mladence"
                    }
                  />
                </div>

                {error ? <p className="text-sm text-red-600">{error}</p> : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-3 px-9 py-4 text-[10px] font-medium uppercase tracking-[0.32em] text-vs-linen transition hover:opacity-90 disabled:opacity-50 sm:w-auto"
                  style={{ background: ink }}
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-vs-linen border-t-transparent" />
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
                key="confirm"
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
