"use client";

import { usePublicRsvpSubmit } from "@/components/invitation/usePublicRsvpSubmit";
import { FormEvent, FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Leaf, Send, X } from "lucide-react";
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
    <section id={id} className="kg-section">
      <div className="kg-container-narrow">
        <div className="mb-12 text-center">
          <div className="kg-eyebrow justify-center">
            <Leaf className="h-3.5 w-3.5" />
            Potvrda
          </div>
          <h2 className="kg-heading mt-4">{data.title}</h2>
          <p className="mt-4 text-base text-kg-muted">
            {data.description}
            {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
          </p>
        </div>

        {/* Garden clipboard — kraft form board with a clip bar and checkbox-style lines */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              onSubmit={handleSubmit}
              className="kg-clipboard px-6 pt-12 pb-8 sm:px-10 sm:pt-14"
            >
              <span className="kg-clipboard-clip" />

              <div className="kg-clipboard-field">
                <label className="kg-label" htmlFor="fullName">
                  Ime i prezime
                </label>
                <input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="kg-clipboard-input"
                  placeholder="Vaše ime i prezime"
                />
              </div>

              <div className="kg-clipboard-field">
                <label className="kg-label" htmlFor="email">
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
                  className="kg-clipboard-input"
                  placeholder="vas@email.com"
                />
              </div>

              <div className="kg-clipboard-field border-none">
                <p className="kg-label mb-3">Da li dolazite?</p>
                <div className="kg-attendance-tiles">
                  {(
                    [
                      { value: "yes", label: "Dolazimo", Icon: Check },
                      { value: "no", label: "Ne dolazimo", Icon: X },
                    ] as const
                  ).map((option) => (
                    <label
                      key={option.value}
                      className="kg-attendance-tile-wrap"
                    >
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
                      <span className="kg-attendance-tile">
                        <option.Icon className="h-6 w-6" />
                        <span className="kg-attendance-tile-label">
                          {option.label}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.attendance === "yes" ? (
                <div className="kg-clipboard-field">
                  <label className="kg-label" htmlFor="guests">
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
                    className="kg-clipboard-input"
                  />
                </div>
              ) : null}

              <div className="kg-clipboard-field border-none">
                <label className="kg-label" htmlFor="message">
                  Poruka
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="kg-clipboard-input min-h-20 resize-none"
                  placeholder="Vaša poruka za porodicu"
                />
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-tl-xl rounded-br-xl bg-kg-champagne px-6 py-4 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {data.buttonText || "Pošalji potvrdu"}
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
