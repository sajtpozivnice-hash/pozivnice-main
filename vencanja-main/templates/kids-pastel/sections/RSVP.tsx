"use client";

import { usePublicRsvpSubmit } from "@/components/invitation/usePublicRsvpSubmit";
import { FormEvent, FC, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { RSVPSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";

type Props = {
  section: RSVPSection;
  event: EventConfig;
  theme: ThemeConfig;
};

type Attendance = "yes" | "no" | "maybe";

type FormState = {
  fullName: string;
  email: string;
  attendance: Attendance;
  guests: number;
  message: string;
};

const RSVP: FC<Props> = ({ section, event }) => {
  const { data, id, name } = section;

  const { loading, submitted, error, handleSubmit: submitRsvp } =
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
    <section id={id} className="kpas-section scroll-mt-8">
      <div className="kpas-shell max-w-xl">
        <div className="mb-2 text-center">
          <p className="kpas-eyebrow mb-4 justify-center">{name}</p>
          <h2 className="kpas-heading">{data.title}</h2>
          <p className="mt-3 text-kpas-ink/55">
            {data.description}
            {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
          </p>
        </div>

        <div className="kpas-envelope">
          <div className="kpas-envelope-flap" />
          <div className="kpas-envelope-pocket" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kpas-letter"
          >
            <span className="kpas-seal kpas-letter-seal">
              <Send className="h-5 w-5" />
            </span>

            {data.imageUrl ? (
              <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border-4 border-kpas-paper shadow-[0_12px_24px_-16px_rgba(74,63,82,0.4)]">
                <img
                  src={data.imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : null}

            {submitted ? (
              <div className="py-10 text-center">
                <p
                  className="text-3xl italic text-kpas-plum"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  Hvala!
                </p>
                <p className="mt-3 text-kpas-ink/55">
                  Tvoja potvrda je zabeležena. Vidimo se na proslavi!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-kpas-ink/45">
                    Ime i prezime
                  </label>
                  <input
                    required
                    className="kpas-input"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-kpas-ink/45">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="kpas-input"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-kpas-ink/45">
                      Dolazak
                    </label>
                    <select
                      className="kpas-input"
                      value={formData.attendance}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          attendance: e.target.value as Attendance,
                        }))
                      }
                    >
                      <option value="yes">Dolazim</option>
                      <option value="maybe">Možda</option>
                      <option value="no">Ne mogu</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-kpas-ink/45">
                      Broj gostiju
                    </label>
                    <input
                      type="number"
                      min={1}
                      className="kpas-input"
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          guests: Number(e.target.value) || 1,
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-kpas-ink/45">
                    {data.messageLabel ?? "Poruka"}
                  </label>
                  <textarea
                    rows={3}
                    className="kpas-input resize-none"
                    placeholder={data.messagePlaceholder ?? "Napiši poruku…"}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                  />
                </div>
                {error ? (
                  <p className="text-sm text-red-600">{error}</p>
                ) : null}
                <button
                  type="submit"
                  className="kpas-btn w-full sm:w-auto"
                  disabled={loading}
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Slanje…" : data.buttonText ?? "Pošalji"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
