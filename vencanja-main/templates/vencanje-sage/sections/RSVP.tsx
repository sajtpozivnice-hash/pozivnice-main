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
    <section id={id} className="vs-section bg-vs-linen">
      <div className="vs-container-narrow">
        <div className="mb-10 text-center">
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
          <p className="vs-body mx-auto mt-5 max-w-md text-vs-muted">
            {data.description}
            {formatDate(event.rsvpDate, "D_MMMM_YYYY")}
          </p>
        </div>

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
                  placeholder="Vaše ime"
                />
              </div>

              <div>
                <p className="vs-label">Prisustvo</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                      <span className="block border border-vs-line px-4 py-3.5 text-center text-base text-vs-ink-soft transition peer-checked:border-vs-ink peer-checked:bg-vs-ink peer-checked:text-vs-linen">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.attendance === "yes" ? (
                <div className="max-w-[10rem]">
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
                    data.messagePlaceholder ?? "Alergije, pratnja ili lepa želja"
                  }
                />
              </div>

              {error ? (
                <p className="vs-body text-red-700">{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 border border-vs-ink bg-vs-ink px-8 py-4 text-[12px] font-medium uppercase tracking-[0.26em] text-vs-linen transition hover:opacity-90 disabled:opacity-50 sm:w-auto sm:text-[13px]"
              >
                {loading ? "Slanje…" : data.buttonText || "Pošalji odgovor"}
                <Send className="h-3.5 w-3.5" />
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
    </section>
  );
};

export default RSVP;
