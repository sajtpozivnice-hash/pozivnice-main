"use client";

import { usePublicRsvpSubmit } from "@/components/invitation/usePublicRsvpSubmit";
import { FormEvent, FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RSVPSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import FormConfirmMessage, {
  Attendance,
} from "../components/FormConfirmMessage";

type Props = {
  section: RSVPSection;
  event: EventConfig;
  theme: ThemeConfig;
};

type FormState = {
  fullName: string;
  email: string;
  attendance: Attendance;
  guests: number;
  message: string;
};

const RSVP: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

  const { loading, submitted, error, handleSubmit: submitRsvp, setSubmitted } =
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
    <section id={id} className="km-section bg-white">
      <div className="km-container-narrow">
        <div className="km-spec-header">
          <span className="km-spec-header-index">RSVP / 01</span>
          <h2 className="km-heading">{data.title}</h2>
          <p className="mt-3 text-sm text-km-muted">
            {data.description}
            {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
          </p>
        </div>

        {/* Modern minimal — numbered spec-sheet manifest, full-width rows, no card wrapper anywhere */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              onSubmit={handleSubmit}
              className="km-spec-sheet"
            >
              <div className="km-spec-row">
                <span className="km-spec-index">01</span>
                <label className="km-label" htmlFor="fullName">
                  Ime i prezime
                </label>
                <input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="km-input"
                  placeholder="Vaše ime i prezime"
                />
              </div>

              <div className="km-spec-row">
                <span className="km-spec-index">02</span>
                <label className="km-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="km-input"
                  placeholder="vas@email.com"
                />
              </div>

              <div className="km-spec-row">
                <span className="km-spec-index">03</span>
                <p className="km-label">Dolazak</p>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { value: "yes", label: "Da" },
                      { value: "no", label: "Ne" },
                    ] as const
                  ).map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value={option.value}
                        checked={formData.attendance === option.value}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            attendance: option.value,
                          })
                        }
                        className="peer sr-only"
                      />
                      <div className="border border-km-ink/15 px-4 py-3 text-center text-sm uppercase tracking-[0.15em] text-km-ink-soft transition peer-checked:border-km-ink peer-checked:bg-km-ink peer-checked:text-white">
                        {option.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {formData.attendance === "yes" ? (
                <div className="km-spec-row">
                  <span className="km-spec-index">04</span>
                  <label className="km-label" htmlFor="guests">
                    Broj gostiju
                  </label>
                  <input
                    id="guests"
                    type="number"
                    min={1}
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guests: Number(e.target.value),
                      })
                    }
                    className="km-input"
                  />
                </div>
              ) : null}

              <div className="km-spec-row">
                <span className="km-spec-index">
                  {formData.attendance === "yes" ? "05" : "04"}
                </span>
                <label className="km-label" htmlFor="message">
                  Poruka
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="km-input min-h-20 resize-none"
                  placeholder="Vaša poruka za porodicu"
                />
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 bg-km-ink px-6 py-4 text-xs font-medium uppercase tracking-[0.25em] text-white transition hover:opacity-85 disabled:opacity-50"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    {data.buttonText || "Pošalji potvrdu"}
                    <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FormConfirmMessage
                attendance={formData.attendance}
                onClick={() => setSubmitted(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RSVP;
