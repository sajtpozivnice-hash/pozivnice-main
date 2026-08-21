"use client";

import { FC, FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RSVPSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { usePublicRsvpSubmit } from "@/components/invitation/usePublicRsvpSubmit";
import FormConfirmMessage, {
  Attendance,
} from "../components/FormConfirmMessage";
import { Media } from "../components/Media";

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
  { value: "yes", label: "Dolazim" },
  { value: "no", label: "Ne mogu" },
] as const;

const RSVP: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#D4AF7A";
  const hasImage = Boolean(data.imageUrl?.trim());

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
    <section id={id} className="vn-section">
      <div
        className={
          hasImage
            ? "vn-shell grid items-start gap-12 lg:grid-cols-12 lg:gap-14"
            : "vn-shell max-w-2xl"
        }
      >
        {hasImage ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <Media
              src={data.imageUrl}
              alt={data.title}
              className="aspect-[4/5] w-full"
            />
          </motion.div>
        ) : null}

        <div className={hasImage ? "lg:col-span-7" : undefined}>
          <div className="text-center lg:text-left">
            <p className="vn-eyebrow">RSVP</p>
            <h2 className="vn-display mt-4">{data.title}</h2>
            <p
              className={`vn-body mt-5 ${hasImage ? "max-w-md" : "mx-auto max-w-md"}`}
            >
              {data.description}
              {formatDate(event.rsvpDate, "D_MMMM_YYYY")}
            </p>
          </div>

          <div className="mt-12 border border-[var(--color-vn-line)] bg-[var(--color-vn-navy-deep)] px-5 py-10 sm:px-10 sm:py-12">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <label className="vn-label" htmlFor="vn-fullName">
                        Ime i prezime
                      </label>
                      <input
                        id="vn-fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="vn-input"
                        placeholder="Vaše ime"
                      />
                    </div>

                  </div>

                  <div>
                    <p className="vn-label">Prisustvo</p>
                    <div className="grid grid-cols-2 gap-3">
                      {ATTENDANCE_OPTIONS.map((option) => (
                        <label key={option.value} className="cursor-pointer">
                          <input
                            type="radio"
                            name="vn-attendance"
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
                          <span className="vn-choice block">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.attendance === "yes" ? (
                    <div className="sm:max-w-[12rem]">
                      <label className="vn-label" htmlFor="vn-guests">
                        Broj gostiju
                      </label>
                      <input
                        id="vn-guests"
                        type="number"
                        min={1}
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guests: Number(e.target.value),
                          })
                        }
                        className="vn-input"
                      />
                    </div>
                  ) : null}

                  <div>
                    <label className="vn-label" htmlFor="vn-message">
                      {data.messageLabel ?? "Poruka"}
                    </label>
                    <textarea
                      id="vn-message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="vn-input min-h-20 resize-none"
                      placeholder={
                        data.messagePlaceholder ?? "Opciono — par reči za nas"
                      }
                    />
                  </div>

                  {error ? (
                    <p className="vn-body text-red-300">{error}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className="vn-btn w-full sm:w-auto"
                  >
                    {loading ? "Slanje…" : data.buttonText || "Pošalji odgovor"}
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
        </div>
      </div>
    </section>
  );
};

export default RSVP;
