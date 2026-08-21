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
import { OpalMedia } from "../components/Media";

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
  const accent = theme.colors?.base?.primary?.value ?? "#C9A9A0";
  const ink = theme.colors?.base?.secondary?.value ?? "#3A3532";

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
    <section id={id} className="vo-section bg-vo-pearl-deep">
      <div className="vo-container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vo-eyebrow mb-5"
            style={{ color: accent }}
          >
            Potvrda dolaska
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vo-display"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          <p className="vo-body mt-5">
            {data.description}
            {formatDate(event.rsvpDate, "D_MMMM_YYYY")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 hidden lg:block"
          >
            <OpalMedia
              src={data.imageUrl}
              alt={data.title}
              className="aspect-[4/5] w-full rounded-[2rem]"
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
                className="vo-vellum-strong space-y-7 rounded-[1.75rem] px-6 py-8 sm:px-10 sm:py-10"
              >
                <div>
                  <label className="vo-label" htmlFor="vo-fullName">
                    Ime i prezime
                  </label>
                  <input
                    id="vo-fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="vo-input"
                    placeholder="Vaše ime i prezime"
                  />
                </div>

                <div>
                  <p className="vo-label">Da li ćete nam se pridružiti?</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {ATTENDANCE_OPTIONS.map((option) => (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="vo-attendance"
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
                        <span className="block rounded-2xl border border-vo-line bg-vo-pearl/50 px-5 py-4 text-center text-sm text-vo-charcoal-soft transition hover:border-vo-charcoal/30 peer-checked:border-vo-blush-deep peer-checked:bg-vo-blush/40 peer-checked:text-vo-charcoal">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.attendance === "yes" ? (
                  <div>
                    <label className="vo-label" htmlFor="vo-guests">
                      Broj gostiju
                    </label>
                    <input
                      id="vo-guests"
                      type="number"
                      min={1}
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guests: Number(e.target.value),
                        })
                      }
                      className="vo-input"
                    />
                  </div>
                ) : null}

                <div>
                  <label className="vo-label" htmlFor="vo-message">
                    Poruka
                  </label>
                  <textarea
                    id="vo-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="vo-input min-h-24 resize-none"
                    placeholder="Poruka za mladence"
                  />
                </div>

                {error ? <p className="text-sm text-red-600">{error}</p> : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl px-9 py-4 text-[10px] font-medium uppercase tracking-[0.32em] text-vo-pearl transition hover:opacity-90 disabled:opacity-50 sm:w-auto"
                  style={{ background: ink }}
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-vo-pearl border-t-transparent" />
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
