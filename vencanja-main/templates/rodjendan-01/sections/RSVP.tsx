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

const RSVP: FC<Props> = ({ section, event, theme }) => {
  const { data, id, name } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#FF5C8A";

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
    <section id={id} className="bday-section scroll-mt-8">
      <div className="bday-shell max-w-3xl">
        <div className="mb-10 text-center">
          <p className="bday-eyebrow mb-4">{name}</p>
          <h2 className="bday-heading">{data.title}</h2>
          <p className="mt-3 text-black/55">
            {data.description}
            {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bday-card-strong relative overflow-hidden p-6 sm:p-8"
        >
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.08]"
              referrerPolicy="no-referrer"
            />
          ) : null}

          <div className="relative z-10">
            {submitted ? (
              <div className="py-10 text-center">
                <p
                  className="text-3xl"
                  style={{ fontFamily: "var(--font-primary)", color: accent }}
                >
                  Hvala!
                </p>
                <p className="mt-3 text-black/55">
                  Tvoja potvrda je zabeležena. Vidimo se na proslavi!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-black/45">
                    Ime i prezime
                  </label>
                  <input
                    required
                    className="bday-input"
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
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-black/45">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="bday-input"
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
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-black/45">
                      Dolazak
                    </label>
                    <select
                      className="bday-input"
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
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-black/45">
                      Broj gostiju
                    </label>
                    <input
                      type="number"
                      min={1}
                      className="bday-input"
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
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-black/45">
                    {data.messageLabel ?? "Poruka"}
                  </label>
                  <textarea
                    rows={4}
                    className="bday-input resize-none"
                    placeholder={
                      data.messagePlaceholder ?? "Napiši poruku…"
                    }
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
                <button type="submit" className="bday-btn w-full sm:w-auto" disabled={loading}>
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
