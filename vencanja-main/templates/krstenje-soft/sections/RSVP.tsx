"use client";

import { usePublicRsvpSubmit } from "@/components/invitation/usePublicRsvpSubmit";
import { FormEvent, FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
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
    <section id={id} className="ks-section bg-ks-sand">
      <div className="ks-wash -bottom-24 -right-16 h-80 w-80 bg-ks-champagne-soft/40" />

      <div className="ks-container-narrow">
        <div className="mb-12 text-center">
          <p className="ks-script mb-2">Recite nam</p>
          <h2 className="ks-heading">{data.title}</h2>
          <p className="mt-4 text-base text-ks-muted">
            {data.description}
            {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
          </p>
        </div>

        {/* Envelope letter — a handwritten note read as flowing sentences with underlined blanks */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              onSubmit={handleSubmit}
              className="ks-letter space-y-7 px-6 pt-16 pb-10 sm:px-10 sm:pt-20"
            >
              <span className="ks-letter-seal" aria-hidden />

              <p className="ks-script text-2xl">Draga porodice,</p>

              <p className="ks-letter-line">
                <label htmlFor="fullName" className="sr-only">
                  Ime i prezime
                </label>
                Ja,{" "}
                <input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="ks-blank"
                  placeholder="vaše ime i prezime"
                />
                , javljam se sa adrese{" "}
                <label htmlFor="email" className="sr-only">
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
                  className="ks-blank"
                  placeholder="vas@email.com"
                />
              </p>

              <p className="ks-letter-line">
                <label htmlFor="attendance" className="sr-only">
                  Da li dolazite?
                </label>
                Na proslavu{" "}
                <select
                  id="attendance"
                  value={formData.attendance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      attendance: e.target.value as Attendance,
                    })
                  }
                  className="ks-blank ks-blank--select"
                >
                  <option value="yes">dolazimo</option>
                  <option value="no">nažalost ne dolazimo</option>
                </select>
              </p>

              {formData.attendance === "yes" ? (
                <p className="ks-letter-line">
                  Biće nas ukupno{" "}
                  <label htmlFor="guests" className="sr-only">
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
                    className="ks-blank ks-blank--num"
                  />{" "}
                  osoba.
                </p>
              ) : null}

              <div className="ks-letter-note">
                <label className="ks-label" htmlFor="message">
                  Poruka
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="ks-letter-textarea min-h-20 resize-none"
                  placeholder="Vaša poruka za porodicu"
                />
              </div>

              {error ? <p className="text-sm text-red-500">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-ks-champagne px-6 py-4 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
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
