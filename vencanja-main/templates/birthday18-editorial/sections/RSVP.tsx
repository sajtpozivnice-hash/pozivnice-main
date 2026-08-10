"use client";

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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    attendance: "yes",
    guests: 1,
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id={id} className="ed-section scroll-mt-8 overflow-hidden">
      <div className="ed-shell relative z-10 max-w-3xl">
        <div className="mb-8">
          <p className="ed-label mb-3">RSVP desk</p>
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
          className="ed-rsvp__panel"
        >
          {submitted ? (
            <div className="py-10 text-center">
              <p className="ed-display text-4xl text-[var(--ed-cherry)]">
                YOU&apos;RE ON THE LIST
              </p>
              <p className="mt-3 text-[var(--ed-muted)]">
                Potvrda je zabeležena. Vidimo se na naslovnoj.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="ed-label mb-1.5 block">Ime i prezime</label>
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
              <div>
                <label className="ed-label mb-1.5 block">Email</label>
                <input
                  type="email"
                  required
                  className="ed-input"
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
                <label className="ed-label mb-2 block">Dolaziš?</label>
                <div className="ed-attend">
                  {(
                    [
                      ["yes", "Yes"],
                      ["no", "No"],
                      ["maybe", "Maybe"],
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
                <label className="ed-label mb-1.5 block">Broj osoba</label>
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
              <div>
                <label className="ed-label mb-1.5 block">
                  {data.messageLabel || "Poruka za slavljenika"}
                </label>
                <textarea
                  rows={4}
                  className="ed-input resize-none"
                  placeholder={
                    data.messagePlaceholder || "Leave a message…"
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
              <button
                type="submit"
                disabled={loading}
                className="ed-btn w-full"
              >
                {loading ? "Sending…" : data.buttonText || "I'M IN"}
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;
