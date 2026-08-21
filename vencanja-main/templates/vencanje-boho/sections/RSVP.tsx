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

const RSVP: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

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
    <section id={id} className="vb-section">
      <div className="vb-shell">
        <div className="mb-10 text-center">
          <p className="vb-kicker">RSVP</p>
          <h2 className="vb-script-sm mt-4">{data.title}</h2>
          <div className="vb-arch mt-6" />
          <p className="vb-body mx-auto mt-6 max-w-md">
            {data.description}
            {formatDate(event.rsvpDate, "D_MMMM_YYYY")}
          </p>
        </div>

        <div
          className="rounded-[2rem] px-5 py-10 sm:px-8 sm:py-12"
          style={{
            background:
              "color-mix(in srgb, var(--color-vb-sand-deep) 55%, white)",
          }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="space-y-7"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                      placeholder="Vaše ime"
                    />
                  </div>

                </div>

                <div>
                  <p className="vb-label">Prisustvo</p>
                  <div className="grid grid-cols-2 gap-3">
                    {ATTENDANCE_OPTIONS.map((option) => (
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
                        <span className="vb-choice block">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.attendance === "yes" ? (
                  <div className="sm:max-w-[12rem]">
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
                    {data.messageLabel ?? "Poruka"}
                  </label>
                  <textarea
                    id="vb-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="vb-input min-h-24 resize-none"
                    placeholder={
                      data.messagePlaceholder ?? "Opciono — par reči za nas"
                    }
                  />
                </div>

                {error ? (
                  <p className="vb-body text-red-700">{error}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="vb-btn w-full sm:w-auto"
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
