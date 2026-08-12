"use client";

import { usePublicRsvpSubmit } from "@/components/invitation/usePublicRsvpSubmit";
import { FormEvent, FC, useState } from "react";
import { motion } from "framer-motion";
import { Send, Compass } from "lucide-react";
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
    <section id={id} className="ksaf-section scroll-mt-8">
      <div className="ksaf-shell max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ksaf-card-strong ksaf-permit"
        >
          <div className="ksaf-permit-rail">
            <span className="ksaf-waypoint ksaf-permit-stamp">
              <Compass className="h-4 w-4" />
            </span>
            <p className="ksaf-coordinates">Dozvola za učešće</p>
            <p className="ksaf-eyebrow mt-5">{name}</p>
            <h2 className="ksaf-heading mt-2 text-2xl sm:text-3xl">{data.title}</h2>
            <p className="mt-3 text-sm text-ksaf-ink/60">
              {data.description}
              {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
            </p>
            <div className="ksaf-permit-stampmark">
              <span>Važi do</span>
              <strong>{formatDate(event.rsvpDate, "DD_MMM_YYYY")}</strong>
            </div>
          </div>

          <div className="ksaf-permit-form">
            {submitted ? (
              <div className="py-10 text-center">
                <p
                  className="text-3xl"
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "var(--color-ksaf-teal)",
                  }}
                >
                  Hvala!
                </p>
                <p className="mt-3 text-ksaf-ink/60">
                  Tvoja prijava je zabeležena. Vidimo se na ekspediciji!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ksaf-ink/50">
                    Ime i prezime
                  </label>
                  <input
                    required
                    className="ksaf-input"
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
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ksaf-ink/50">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="ksaf-input"
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
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ksaf-ink/50">
                      Dolazak
                    </label>
                    <select
                      className="ksaf-input"
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
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ksaf-ink/50">
                      Broj gostiju
                    </label>
                    <input
                      type="number"
                      min={1}
                      className="ksaf-input"
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
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ksaf-ink/50">
                    {data.messageLabel ?? "Poruka"}
                  </label>
                  <textarea
                    rows={4}
                    className="ksaf-input resize-none"
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
                  className="ksaf-btn w-full sm:w-auto"
                  disabled={loading}
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Slanje…" : data.buttonText ?? "Pošalji"}
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
