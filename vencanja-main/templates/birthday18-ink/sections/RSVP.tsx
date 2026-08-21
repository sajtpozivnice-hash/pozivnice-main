"use client";

import { usePublicRsvpSubmit } from "@/components/invitation/usePublicRsvpSubmit";
import { FormEvent, FC, useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Send } from "lucide-react";
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
    <section id={id} className="b18i-section scroll-mt-8">
      <div className="b18i-shell max-w-xl">
        <div className="b18i-coupon">
          <span className="b18i-coupon__snip">
            <Scissors className="h-3.5 w-3.5" />
            Isecite ovde
          </span>

          <p className="b18i-eyebrow mb-3">Kupon za prijavu</p>
          <h2 className="b18i-display text-3xl sm:text-4xl">{data.title}</h2>
          <p className="mt-3 text-[var(--ink-muted)]">
            {data.description} {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            {submitted ? (
              <div className="py-8 text-center">
                <p className="b18i-display text-3xl text-[var(--ink-red)]">
                  Hvala
                </p>
                <p className="mt-3 text-[var(--ink-muted)]">
                  Prijava je zavedena u redakciji. Vidimo se na izdanju.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="b18i-field">
                  <label>Ime i prezime</label>
                  <input
                    required
                    className="b18i-input"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="b18i-field">
                  <label>Dolazite?</label>
                  <div className="b18i-attend">
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
                  <div className="b18i-field">
                  <label>Broj osoba</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    className="b18i-input"
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
                <div className="b18i-field">
                  <label>{data.messageLabel || "Poruka"}</label>
                  <textarea
                    rows={4}
                    className="b18i-textarea"
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
                  <p className="text-sm text-red-700">{error}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={loading}
                  className="b18i-btn w-full"
                >
                  {loading ? "Šaljem…" : data.buttonText || "Pošalji prijavu"}
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
