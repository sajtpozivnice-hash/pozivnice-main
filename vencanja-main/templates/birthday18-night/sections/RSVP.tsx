"use client";

import { usePublicRsvpSubmit } from "@/components/invitation/usePublicRsvpSubmit";
import { FormEvent, FC, useState } from "react";
import { motion } from "framer-motion";
import { RSVPSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";

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
    <section id={id} className="bn-section scroll-mt-8 overflow-hidden">
      <div className="bn-shell relative z-10 max-w-3xl">
        <p className="bn-label mb-4">Potvrda</p>
        <h2 className="bn-display text-5xl sm:text-6xl lg:text-7xl">
          {data.title}
        </h2>
        <p className="mt-4 max-w-xl text-[color:var(--bn-muted)]">
          {data.description}
          {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {submitted ? (
            <div className="bn-rsvp__ticket">
              <div className="bn-rsvp__main py-10 text-center">
                <p className="bn-display text-4xl text-[color:var(--bn-accent)]">
                  NA LISTI SI
                </p>
                <p className="mt-3 text-[color:var(--bn-muted)]">
                  Potvrda je zabeležena. Vidimo se večeras.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bn-rsvp__ticket">
              <div className="bn-rsvp__main space-y-4">
                <div className="bn-rsvp__grid-2">
                  <div>
                    <label className="bn-label mb-1.5 block">
                      Ime i prezime
                    </label>
                    <input
                      required
                      className="bn-input"
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
                    <label className="bn-label mb-1.5 block">Email</label>
                    <input
                      type="email"
                      required
                      className="bn-input"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="bn-rsvp__grid-2">
                  <div>
                    <p className="bn-label mb-1.5">Dolaziš?</p>
                    <div className="bn-attend">
                      {(
                        [
                          ["yes", "Da"],
                          ["no", "Ne"],
                        ] as const
                      ).map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          className={`bn-attend__btn ${
                            formData.attendance === value ? "is-on" : ""
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              attendance: value,
                            }))
                          }
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="bn-label mb-1.5 block">
                      Broj gostiju
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      className="bn-input"
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
                  <label className="bn-label mb-1.5 block">
                    {data.messageLabel || "PORUKA ZA SLAVLJENIKA"}
                  </label>
                  <textarea
                    rows={3}
                    className="bn-input"
                    placeholder={data.messagePlaceholder || "Ostavi poruku…"}
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
                  <p className="text-sm text-red-400">{error}</p>
                ) : null}
              </div>
              <div className="bn-rsvp__stub">
                <p className="bn-label">Ulaznica</p>
                <p className="bn-rsvp__stub-title">RSVP</p>
                <button type="submit" className="bn-btn" disabled={loading}>
                  {loading ? "Slanje…" : data.buttonText || "Potvrdi"}
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
