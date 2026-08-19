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
    <section id={id} className="kcart-section scroll-mt-8">
      <div className="kcart-shell max-w-xl">
        <div className="mb-8 text-center">
          <p className="kcart-eyebrow mb-4">RSVP</p>
          <h2 className="kcart-heading">{data.title}</h2>
          <p className="kcart-body mx-auto mt-3 max-w-md">
            {data.description}
            {formatDate(event.rsvpDate, "D_MMMM_YYYY")}
          </p>
        </div>

        <div className="kcart-panel p-6 sm:p-8">
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
                  <label className="kcart-label" htmlFor="kcart-name">
                    Ime i prezime
                  </label>
                  <input
                    id="kcart-name"
                    required
                    className="kcart-input"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Tvoje ime"
                  />
                </div>
                <div>
                  <label className="kcart-label" htmlFor="kcart-email">
                    Email
                  </label>
                  <input
                    id="kcart-email"
                    required
                    type="email"
                    className="kcart-input"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="ime@email.com"
                  />
                </div>
                <div>
                  <p className="kcart-label">Prisustvo</p>
                  <div className="grid grid-cols-2 gap-3">
                    {OPTIONS.map((opt) => (
                      <label key={opt.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="kcart-att"
                          className="peer sr-only"
                          checked={formData.attendance === opt.value}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              attendance: opt.value,
                            })
                          }
                        />
                        <span className="kcart-choice">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {formData.attendance === "yes" ? (
                  <div className="max-w-[10rem]">
                    <label className="kcart-label" htmlFor="kcart-guests">
                      Broj gostiju
                    </label>
                    <input
                      id="kcart-guests"
                      type="number"
                      min={1}
                      className="kcart-input"
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
                  <label className="kcart-label" htmlFor="kcart-msg">
                    {data.messageLabel ?? "Poruka"}
                  </label>
                  <textarea
                    id="kcart-msg"
                    className="kcart-input min-h-24 resize-none"
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
                <button type="submit" disabled={loading} className="kcart-btn">
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
                className="py-6 text-center"
              >
                <div className="kcart-badge-1 mx-auto text-2xl sm:text-3xl">
                  ✓
                </div>
                <h3 className="kcart-heading mt-6 text-3xl">Hvala!</h3>
                <p className="kcart-body mx-auto mt-3 max-w-sm">
                  {formData.attendance === "yes"
                    ? "Tvoje mesto u stripu je sačuvano. Vidimo se!"
                    : "Hvala što si javio/la — čuvamo ti mesto u sledećoj epizodi."}
                </p>
                <button
                  type="button"
                  className="kcart-btn mt-8"
                  onClick={() => setSubmitted(false)}
                >
                  Pošalji novi odgovor
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
