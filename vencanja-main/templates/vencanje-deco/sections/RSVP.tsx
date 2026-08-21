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
  const accent = theme.colors?.base?.primary?.value ?? "#A8893A";

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
    <section id={id} className="vd-section">
      <div className="vd-shell-narrow">
        <div className="mb-10 text-center">
          <p className="vd-eyebrow">RSVP</p>
          <h2 className="vd-display mt-4">{data.title}</h2>
          <div className="vd-diamond mt-6" />
          <p className="vd-body mx-auto mt-6 max-w-md">
            {data.description}
            {formatDate(event.rsvpDate, "D_MMMM_YYYY")}
          </p>
        </div>

        <div className="vd-double-frame">
          <span className="vd-corner tl" aria-hidden />
          <span className="vd-corner tr" aria-hidden />
          <span className="vd-corner bl" aria-hidden />
          <span className="vd-corner br" aria-hidden />

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
                    <label className="vd-label" htmlFor="vd-fullName">
                      Ime i prezime
                    </label>
                    <input
                      id="vd-fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="vd-input"
                      placeholder="Vaše ime"
                    />
                  </div>

                </div>

                <div>
                  <p className="vd-label">Prisustvo</p>
                  <div className="grid grid-cols-2 gap-3">
                    {ATTENDANCE_OPTIONS.map((option) => (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="vd-attendance"
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
                        <span className="vd-choice block">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.attendance === "yes" ? (
                  <div className="sm:max-w-[12rem]">
                    <label className="vd-label" htmlFor="vd-guests">
                      Broj gostiju
                    </label>
                    <input
                      id="vd-guests"
                      type="number"
                      min={1}
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guests: Number(e.target.value),
                        })
                      }
                      className="vd-input"
                    />
                  </div>
                ) : null}

                <div>
                  <label className="vd-label" htmlFor="vd-message">
                    {data.messageLabel ?? "Poruka"}
                  </label>
                  <textarea
                    id="vd-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="vd-input min-h-20 resize-none"
                    placeholder={
                      data.messagePlaceholder ?? "Opciono — par reči za nas"
                    }
                  />
                </div>

                {error ? (
                  <p className="vd-body text-red-700">{error}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="vd-btn w-full sm:w-auto"
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
    </section>
  );
};

export default RSVP;
