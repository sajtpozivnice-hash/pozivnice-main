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
  const { data, id } = section;
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
    <section id={id} className="gala-section gala-rsvp scroll-mt-8">
      <div className="gala-shell max-w-2xl">
        <p className="gala-kicker mb-3">Potvrda</p>
        <h2 className="gala-display text-4xl sm:text-5xl">{data.title}</h2>
        <p className="mt-4 text-[var(--gala-muted)]">
          {data.description} {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gala-rsvp__card"
        >
          {submitted ? (
            <div className="py-8 text-center">
              <p className="gala-display text-4xl text-[var(--gala-gold)]">
                Hvala
              </p>
              <p className="mt-3 text-[var(--gala-muted)]">
                Potvrda je zabeležena. Vidimo se na proslavi.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="gala-rsvp__grid">
                <div>
                  <label className="gala-label">Ime i prezime</label>
                  <input
                    required
                    className="gala-input"
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
                  <label className="gala-label">Email</label>
                  <input
                    type="email"
                    required
                    className="gala-input"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="gala-label">Dolaziš?</label>
                  <div className="gala-attend">
                    {(
                      [
                        ["yes", "Da"],
                        ["no", "Ne"],
                        ["maybe", "Možda"],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            attendance: value,
                          }))
                        }
                        className={
                          formData.attendance === value ? "is-active" : ""
                        }
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="gala-label">Broj osoba</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    className="gala-input"
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        guests: Number(e.target.value) || 1,
                      }))
                    }
                  />
                </div>
                <div className="gala-rsvp__full">
                  <label className="gala-label">
                    {data.messageLabel || "Poruka"}
                  </label>
                  <textarea
                    rows={3}
                    className="gala-textarea"
                    placeholder={data.messagePlaceholder || "Kratka poruka…"}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              {error ? (
                <p className="mt-4 text-sm text-red-400">{error}</p>
              ) : null}
              <div className="gala-rsvp__submit-row">
                <button type="submit" disabled={loading} className="gala-btn">
                  {loading ? "Šaljem…" : data.buttonText || "Pošalji potvrdu"}
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;
