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
import { TerraMedia } from "../components/Media";

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
  const accent = theme.colors?.base?.primary?.value ?? "#C45C26";
  const ink = theme.colors?.base?.secondary?.value ?? "#3D3429";

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
    <section id={id} className="vt-section bg-vt-sand">
      <div className="vt-container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vt-eyebrow mb-6"
            style={{ color: accent }}
          >
            Potvrda dolaska
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vt-display"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          <p className="vt-body mt-5 text-vt-muted">
            {data.description}
            {formatDate(event.rsvpDate, "D_MMMM_YYYY")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-10 hidden lg:block"
          >
            <TerraMedia
              src={data.imageUrl}
              alt={data.title}
              className="vt-soft aspect-[4/5] w-full"
            />
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <div className="vt-soft border border-vt-line bg-vt-cream px-6 py-10 sm:px-10">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label className="vt-label" htmlFor="vt-fullName">
                      Ime i prezime
                    </label>
                    <input
                      id="vt-fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="vt-input"
                      placeholder="Vaše ime i prezime"
                    />
                  </div>

                  <div>
                    <label className="vt-label" htmlFor="vt-email">
                      Email
                    </label>
                    <input
                      id="vt-email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="vt-input"
                      placeholder="vas@email.com"
                    />
                  </div>

                  <div>
                    <p className="vt-label">Da li ćete nam se pridružiti?</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {ATTENDANCE_OPTIONS.map((option) => (
                        <label key={option.value} className="cursor-pointer">
                          <input
                            type="radio"
                            name="vt-attendance"
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
                          <span className="block rounded-2xl border border-vt-line px-5 py-4 text-center text-sm text-vt-ink-soft transition hover:border-vt-terracotta/50 peer-checked:border-vt-terracotta peer-checked:bg-vt-terracotta/10 peer-checked:text-vt-ink">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.attendance === "yes" ? (
                    <div>
                      <label className="vt-label" htmlFor="vt-guests">
                        Broj gostiju
                      </label>
                      <input
                        id="vt-guests"
                        type="number"
                        min={1}
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guests: Number(e.target.value),
                          })
                        }
                        className="vt-input"
                      />
                    </div>
                  ) : null}

                  <div>
                    <label className="vt-label" htmlFor="vt-message">
                      {data.messageLabel ?? "Poruka"}
                    </label>
                    <textarea
                      id="vt-message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="vt-input min-h-24 resize-none"
                      placeholder={
                        data.messagePlaceholder ?? "Poruka za mladence"
                      }
                    />
                  </div>

                  {error ? (
                    <p className="text-sm text-red-600">{error}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className="vt-btn w-full sm:w-auto"
                  >
                    {loading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-vt-cream border-t-transparent" />
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
      </div>
    </section>
  );
};

export default RSVP;
