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

/** Lookbook order slip: numbered card with swatch attendance chips, not the coast field stack. */
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
    <section id={id} className="b18a-section scroll-mt-8">
      <div className="b18a-shell max-w-xl">
        <p className="b18a-label mb-3">Potvrda</p>
        <h2 className="b18a-display text-2xl sm:text-3xl">{data.title}</h2>
        <p className="mt-3 text-[var(--atelier-muted)]">
          {data.description} {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18a-order"
        >
          <span className="b18a-order__num">N° 02</span>
          {submitted ? (
            <div className="py-8 text-center">
              <p className="b18a-display text-3xl text-[var(--atelier-rust)]">
                Hvala
              </p>
              <p className="mt-3 text-[var(--atelier-muted)]">
                Potvrda je zabeležena. Vidimo se na reviji.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="b18a-order__grid">
              <div className="b18a-field">
                <label>Ime i prezime</label>
                <input
                  required
                  className="b18a-input"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="b18a-field">
                <label>Email</label>
                <input
                  type="email"
                  required
                  className="b18a-input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="b18a-field b18a-order__full">
                <label>Dolaziš?</label>
                <div className="b18a-swatches">
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
                        "b18a-swatch" +
                        (formData.attendance === value ? " is-active" : "")
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="b18a-field">
                <label>Broj osoba</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  className="b18a-input"
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      guests: Number(e.target.value) || 1,
                    }))
                  }
                />
              </div>
              <div className="b18a-field b18a-order__full">
                <label>{data.messageLabel || "Poruka"}</label>
                <textarea
                  rows={4}
                  className="b18a-textarea"
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
              {error ? (
                <p className="b18a-order__full text-sm text-red-400">
                  {error}
                </p>
              ) : null}
              <div className="b18a-order__full">
                <button type="submit" disabled={loading} className="b18a-btn">
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
