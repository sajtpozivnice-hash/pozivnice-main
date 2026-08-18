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
import { LinenMedia } from "../components/Media";

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
  const accent = theme.colors?.base?.primary?.value ?? "#C4A574";
  const ink = theme.colors?.base?.secondary?.value ?? "#2A2420";

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
    <section id={id} className="vl-section vl-linen-ground">
      <div className="vl-container grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5"
        >
          <LinenMedia
            src={data.imageUrl}
            alt={data.title}
            className="aspect-[4/5] w-full"
          />
        </motion.div>

        <div className="lg:col-span-7">
          <p className="vl-eyebrow mb-5" style={{ color: accent }}>
            Potvrda dolaska
          </p>
          <h2 className="vl-display" style={{ color: ink }}>
            {data.title}
          </h2>
          <p className="vl-body mt-5 text-vl-muted">
            {data.description}
            {formatDate(event.rsvpDate, "D_MMMM_YYYY")}
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="mt-10 space-y-8"
              >
                <div>
                  <label className="vl-label" htmlFor="vl-fullName">
                    Ime i prezime
                  </label>
                  <input
                    id="vl-fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="vl-input"
                    placeholder="Vaše ime i prezime"
                  />
                </div>

                <div>
                  <label className="vl-label" htmlFor="vl-email">
                    Email
                  </label>
                  <input
                    id="vl-email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="vl-input"
                    placeholder="vas@email.com"
                  />
                </div>

                <div>
                  <p className="vl-label">Da li ćete nam se pridružiti?</p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8">
                    {ATTENDANCE_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        <input
                          type="radio"
                          name="vl-attendance"
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
                        <span
                          className="flex h-4 w-4 items-center justify-center rounded-full border border-vl-line transition peer-checked:border-vl-champagne"
                          aria-hidden
                        >
                          <span
                            className={`h-2 w-2 rounded-full transition ${
                              formData.attendance === option.value
                                ? "bg-vl-champagne"
                                : "bg-transparent"
                            }`}
                          />
                        </span>
                        <span
                          className="text-sm text-vl-ink-soft underline-offset-4 peer-checked:text-vl-ink peer-checked:underline"
                          style={{ fontFamily: "var(--font-secondary)" }}
                        >
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.attendance === "yes" ? (
                  <div>
                    <label className="vl-label" htmlFor="vl-guests">
                      Broj gostiju
                    </label>
                    <input
                      id="vl-guests"
                      type="number"
                      min={1}
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guests: Number(e.target.value),
                        })
                      }
                      className="vl-input"
                    />
                  </div>
                ) : null}

                <div>
                  <label className="vl-label" htmlFor="vl-message">
                    {data.messageLabel ?? "Poruka"}
                  </label>
                  <textarea
                    id="vl-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="vl-input min-h-24 resize-none"
                    placeholder={
                      data.messagePlaceholder ?? "Poruka za mladence"
                    }
                  />
                </div>

                {error ? <p className="text-sm text-red-700">{error}</p> : null}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="vl-btn"
                    style={{ borderColor: accent }}
                  >
                    {loading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-vl-ink border-t-transparent" />
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        {data.buttonText || "Pošalji odgovor"}
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10"
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
