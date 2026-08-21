"use client";

import { FormEvent, FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { RSVPSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { usePublicRsvpSubmit } from "@/components/invitation/usePublicRsvpSubmit";

type Props = {
  section: RSVPSection;
  event: EventConfig;
  theme: ThemeConfig;
};

type Attendance = "yes" | "no";

type FormState = {
  fullName: string;
  email: string;
  attendance: Attendance;
  guests: number;
  message: string;
};

const OPTIONS = [
  { value: "yes" as const, label: "Dolazim!" },
  { value: "no" as const, label: "Ne mogu" },
];

const RSVP: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
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
    <section id={id} className="khny-section scroll-mt-8">
      <div className="khny-shell max-w-xl">
        <div className="mb-8 text-center">
          <p className="khny-lid mx-auto mb-4">RSVP</p>
          <h2 className="khny-heading">{data.title}</h2>
          <p className="khny-body mx-auto mt-3 max-w-md">
            {data.description}
            {formatDate(event.rsvpDate, "D_MMMM_YYYY")}
          </p>
        </div>

        <div className="khny-jar relative px-6 py-8 sm:px-8 sm:py-10">
          <span className="khny-jar-lid" aria-hidden />
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="khny-label" htmlFor="khny-name">
                    Ime i prezime
                  </label>
                  <input
                    id="khny-name"
                    required
                    className="khny-input"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Tvoje ime"
                  />
                </div>
                <div>
                  <label className="khny-label" htmlFor="khny-email">
                    Email
                  </label>
                  <input
                    id="khny-email"
                    required
                    type="email"
                    className="khny-input"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="ime@email.com"
                  />
                </div>
                <div>
                  <p className="khny-label">Prisustvo</p>
                  <div className="grid grid-cols-2 gap-3">
                    {OPTIONS.map((opt) => (
                      <label key={opt.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="khny-att"
                          className="peer sr-only"
                          checked={formData.attendance === opt.value}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              attendance: opt.value,
                            })
                          }
                        />
                        <span className="khny-choice">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {formData.attendance === "yes" ? (
                  <div className="max-w-[10rem]">
                    <label className="khny-label" htmlFor="khny-guests">
                      Broj gostiju
                    </label>
                    <input
                      id="khny-guests"
                      type="number"
                      min={1}
                      className="khny-input"
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guests: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                ) : null}
                <div>
                  <label className="khny-label" htmlFor="khny-msg">
                    {data.messageLabel ?? "Poruka"}
                  </label>
                  <textarea
                    id="khny-msg"
                    className="khny-input min-h-24 resize-none"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={data.messagePlaceholder ?? "Čestitka…"}
                  />
                </div>
                {error ? (
                  <p className="text-sm font-semibold text-red-600">{error}</p>
                ) : null}
                <button type="submit" disabled={loading} className="khny-btn">
                  <span>
                    {loading ? "Slanje…" : data.buttonText || "Pošalji"}
                  </span>
                  <Send className="h-4 w-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-8 text-center"
              >
                <p className="khny-script text-[clamp(2rem,6vw,3rem)]">Hvala!</p>
                <p className="khny-body mt-4">
                  Primili smo potvrdu. Vidimo se na picnicu!
                </p>
                <button
                  type="button"
                  className="khny-btn mt-8"
                  onClick={() => setSubmitted(false)}
                >
                  Pošalji još jednu
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
