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

const RSVP: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value;
  const ink = theme.colors?.base?.secondary?.value;

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
    <section id={id} className="v3-section bg-v3-ink text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-v3-champagne/20 blur-3xl" />
      </div>

      <div className="v3-container-narrow">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="v3-eyebrow mb-4 text-v3-champagne-soft"
          >
            Potvrda
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {data.title}
          </motion.h2>
          <p className="mt-4 text-base text-white/60">
            {data.description}
            {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              onSubmit={handleSubmit}
              className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-10"
            >
              <div>
                <label className="v3-label text-white/50" htmlFor="fullName">
                  Ime i prezime
                </label>
                <input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="v3-input border-white/15 bg-white/10 text-white placeholder:text-white/35"
                  placeholder="Vaše ime i prezime"
                />
              </div>

              <div>
                <label className="v3-label text-white/50" htmlFor="email">
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
                  className="v3-input border-white/15 bg-white/10 text-white placeholder:text-white/35"
                  placeholder="vas@email.com"
                />
              </div>

              <div>
                <p className="v3-label text-white/50">Da li dolazite?</p>
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
                      <div className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm transition peer-checked:border-transparent peer-checked:bg-white peer-checked:text-v3-ink hover:bg-white/10">
                        {option.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {formData.attendance === "yes" ? (
                <div>
                  <label className="v3-label text-white/50" htmlFor="guests">
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
                    className="v3-input border-white/15 bg-white/10 text-white"
                  />
                </div>
              ) : null}

              <div>
                <label className="v3-label text-white/50" htmlFor="message">
                  Poruka
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="v3-input min-h-24 resize-none border-white/15 bg-white/10 text-white placeholder:text-white/35"
                  placeholder="Vaša poruka mladencima"
                />
              </div>

              {error ? (
                <p className="text-sm text-red-400">{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                style={{ background: accent ?? ink }}
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
    </section>
  );
};

export default RSVP;
