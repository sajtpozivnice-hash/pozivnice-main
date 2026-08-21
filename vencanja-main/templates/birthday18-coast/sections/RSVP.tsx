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
    <section id={id} className="b18c-band b18c-band--sand scroll-mt-8">
      <div className="b18c-shell max-w-xl">
        <p className="b18c-kicker mb-3">Potvrda</p>
        <h2 className="b18c-display text-3xl sm:text-4xl">{data.title}</h2>
        <p className="mt-3 text-[var(--coast-muted)]">
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
              <p className="b18c-display text-3xl text-[var(--coast-sea)]">
                Hvala
              </p>
              <p className="mt-3 text-[var(--coast-muted)]">
                Potvrda je zabeležena. Vidimo se na obali.
              </p>
            </div>
          ) : (
            // Beach-pass wristband: rounded capsule with a perforated tear-off stub holding the attendance chips
            <form onSubmit={handleSubmit} className="b18c-wristband">
              <div className="b18c-wristband__main">
                <div className="b18c-field">
                  <label>Ime i prezime</label>
                  <input
                    required
                    className="b18c-input"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                </div>
                {formData.attendance === "yes" ? (
                    <div className="b18c-field">
                  <label>Broj osoba</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    className="b18c-input"
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
                <div className="b18c-field">
                  <label>{data.messageLabel || "Poruka"}</label>
                  <textarea
                    rows={3}
                    className="b18c-textarea"
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
                  <p className="text-sm text-red-600">{error}</p>
                ) : null}
              </div>

              <span className="b18c-wristband__perf" aria-hidden />

              <div className="b18c-wristband__stub">
                <span className="b18c-wristband__stub-label">Dolaziš?</span>
                <div className="b18c-attend b18c-attend--stub">
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
                <button
                  type="submit"
                  disabled={loading}
                  className="b18c-btn mt-4 w-full"
                >
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
