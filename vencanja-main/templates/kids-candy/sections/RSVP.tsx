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
    <section id={id} className="kcan-section scroll-mt-8">
      <div className="kcan-shell max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kcan-card-strong kcan-poster"
        >
          <div className="kcan-poster-art">
            <span
              className="kcan-tape"
              style={{ top: "-14px", left: "18%", transform: "rotate(-5deg)" }}
            />
            <span
              className="kcan-tape"
              style={{ top: "-14px", right: "12%", transform: "rotate(6deg)" }}
            />
            <p className="kcan-kicker w-fit">{name}</p>
            <p className="kcan-poster-scribble">RSVP</p>
          </div>

          <div className="kcan-poster-form">
            <h2 className="kcan-heading text-3xl sm:text-4xl">{data.title}</h2>
            <p className="mt-2 text-sm font-semibold text-kcan-ink/55">
              {data.description}
              {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
            </p>

            {submitted ? (
              <div className="py-10 text-center">
                <p
                  className="text-3xl font-black uppercase"
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "var(--color-kcan-pink)",
                  }}
                >
                  Hvala!
                </p>
                <p className="mt-3 text-kcan-ink/60">
                  Tvoja potvrda je zabeležena. Vidimo se na žurki!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-kcan-ink/50">
                    Ime i prezime
                  </label>
                  <input
                    required
                    className="kcan-input"
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
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-kcan-ink/50">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="kcan-input"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-kcan-ink/50">
                      Dolazak
                    </label>
                    <select
                      className="kcan-input"
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
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-kcan-ink/50">
                      Broj gostiju
                    </label>
                    <input
                      type="number"
                      min={1}
                      className="kcan-input"
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
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-kcan-ink/50">
                    {data.messageLabel ?? "Poruka"}
                  </label>
                  <textarea
                    rows={4}
                    className="kcan-input resize-none"
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
                  className="kcan-btn w-full sm:w-auto"
                  disabled={loading}
                >
                  <Send className="h-4 w-4" />
                  <span>{loading ? "Slanje…" : data.buttonText ?? "Pošalji"}</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;
