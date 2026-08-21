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
    <section id={id} className="ed-section scroll-mt-8 overflow-hidden">
      <div className="ed-shell relative z-10 max-w-3xl">
        <div className="mb-8">
          <p className="ed-label mb-3">RSVP pult</p>
          <h2 className="ed-display text-5xl sm:text-6xl lg:text-7xl">
            {data.title}
          </h2>
          <p className="mt-4 max-w-xl text-[var(--ed-muted)]">
            {data.description}
            {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {submitted ? (
            <div className="ed-rsvp__rows py-10 text-center">
              <p className="ed-display text-4xl text-[var(--ed-cherry)]">
                NA LISTI SI
              </p>
              <p className="mt-3 text-[var(--ed-muted)]">
                Potvrda je zabeležena. Vidimo se na naslovnoj.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="ed-rsvp__rows">
              <div className="ed-rsvp__row">
                <label className="ed-label">Ime i prezime</label>
                <input
                  required
                  className="ed-input"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="ed-rsvp__row">
                <label className="ed-label">Dolaziš?</label>
                <div className="ed-attend">
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
                <div className="ed-rsvp__row">
                <label className="ed-label">Broj osoba</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  className="ed-input"
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
              <div className="ed-rsvp__row">
                <label className="ed-label">
                  {data.messageLabel || "Poruka za slavljenika"}
                </label>
                <textarea
                  rows={3}
                  className="ed-input resize-none"
                  placeholder={
                    data.messagePlaceholder || "Ostavi poruku…"
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
                <p className="pt-3 text-sm text-red-600">{error}</p>
              ) : null}
              <div className="ed-rsvp__submit-row">
                <button type="submit" disabled={loading} className="ed-btn">
                  {loading ? "Slanje…" : data.buttonText || "DOLAZIM"}
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
