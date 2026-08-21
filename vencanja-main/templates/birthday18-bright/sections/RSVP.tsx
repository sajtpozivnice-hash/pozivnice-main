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

type Attendance = "yes" | "no";

type FormState = {
  fullName: string;
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
    <section id={id} className="b18b-section scroll-mt-8 overflow-hidden">
      <div className="b18b-blob b18b-blob--coral b18b-float absolute -left-12 top-8 h-44 w-44" />
      <div className="b18b-shell relative z-10">
        <div className="b18b-rsvp-split">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="b18b-rsvp-aside"
          >
            <span className="b18b-rsvp-aside__mark">RSVP</span>
            <h2 className="b18b-heading">{data.title}</h2>
            <p className="b18b-copy">
              {data.description}
              {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="b18b-rsvp-form-card"
          >
          {submitted ? (
            <div className="py-10 text-center">
              <p
                className="text-4xl font-extrabold uppercase"
                style={{
                  fontFamily: "var(--font-primary)",
                  background:
                    "linear-gradient(135deg, var(--b18b-coral), var(--b18b-lilac))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                HVALA!
              </p>
              <p className="mt-3 text-[var(--b18b-muted)]">
                Tvoja potvrda je zabeležena. Vidimo se na proslavi!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[11px] font-bold tracking-[0.16em] text-[var(--b18b-muted)] uppercase">
                  Ime i prezime
                </label>
                <input
                  required
                  className="b18b-input"
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
                <label className="mb-2 block text-[11px] font-bold tracking-[0.16em] text-[var(--b18b-muted)] uppercase">
                  Dolaziš?
                </label>
                <div className="b18b-attend">
                  {(
                    [
                      ["yes", "Da"],
                      ["no", "Ne"]
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
              {formData.attendance === "yes" ? (
                  <div>
                <label className="mb-1.5 block text-[11px] font-bold tracking-[0.16em] text-[var(--b18b-muted)] uppercase">
                  Broj osoba
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  className="b18b-input"
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      guests: Number(e.target.value) || 1,
                    }))
                  }
                />
              </div>
                ) : null}
              <div>
                <label className="mb-1.5 block text-[11px] font-bold tracking-[0.16em] text-[var(--b18b-muted)] uppercase">
                  {data.messageLabel || "Poruka za slavljenika"}
                </label>
                <textarea
                  rows={4}
                  className="b18b-input resize-none"
                  placeholder={
                    data.messagePlaceholder ||
                    "Napiši kratku poruku ili čestitku…"
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
              <button
                type="submit"
                disabled={loading}
                className="b18b-btn w-full"
              >
                {loading ? "Šaljem…" : data.buttonText || "Pošalji potvrdu"}
                <Send className="h-3.5 w-3.5" />
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
