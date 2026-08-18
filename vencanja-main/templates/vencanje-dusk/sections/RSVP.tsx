"use client";

import { FC, FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { RSVPSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { usePublicRsvpSubmit } from "@/components/invitation/usePublicRsvpSubmit";
import FormConfirmMessage, {
  Attendance,
} from "../components/FormConfirmMessage";
import Media from "../components/Media";

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

const ATTENDANCE_OPTIONS = [
  { value: "yes", label: "Dolazimo" },
  { value: "no", label: "Ne možemo" },
] as const;

const RSVP: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const {
    loading,
    submitted,
    error,
    handleSubmit: submitRsvp,
    setSubmitted,
  } = usePublicRsvpSubmit();

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
    <section id={id} className="vd-section">
      {data.imageUrl?.trim() ? (
        <Media src={data.imageUrl} className="vd-backdrop" veil />
      ) : null}

      <div className="vd-shell--narrow relative z-10">
        <div className="mb-9 text-center">
          <p className="vd-eyebrow">Potvrda dolaska</p>
          <h2 className="vd-title mt-3">{data.title}</h2>
          <p className="vd-body mt-4">
            {data.description}
            {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              onSubmit={handleSubmit}
              className="vd-form"
            >
              <div className="vd-field">
                <label className="vd-label" htmlFor="vd-fullName">
                  Ime i prezime
                </label>
                <input
                  id="vd-fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="vd-input"
                  placeholder="Vaše ime i prezime"
                />
              </div>

              <div className="vd-field">
                <label className="vd-label" htmlFor="vd-email">
                  Email
                </label>
                <input
                  id="vd-email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="vd-input"
                  placeholder="vas@email.com"
                />
              </div>

              <div className="vd-field">
                <p className="vd-label">Da li dolazite?</p>
                <div className="vd-choice">
                  {ATTENDANCE_OPTIONS.map((option) => (
                    <label key={option.value} className="vd-choice__option">
                      <input
                        type="radio"
                        name="vd-attendance"
                        value={option.value}
                        checked={formData.attendance === option.value}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            attendance: option.value,
                          })
                        }
                        className="vd-sr"
                      />
                      <span className="vd-choice__box">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.attendance === "yes" ? (
                <div className="vd-field">
                  <label className="vd-label" htmlFor="vd-guests">
                    Broj gostiju
                  </label>
                  <input
                    id="vd-guests"
                    type="number"
                    min={1}
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guests: Number(e.target.value),
                      })
                    }
                    className="vd-input"
                  />
                </div>
              ) : null}

              <div className="vd-field">
                <label className="vd-label" htmlFor="vd-message">
                  {data.messageLabel || "Poruka"}
                </label>
                <textarea
                  id="vd-message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="vd-textarea"
                  placeholder={
                    data.messagePlaceholder || "Vaša poruka mladencima"
                  }
                />
              </div>

              {error ? <p className="vd-error">{error}</p> : null}

              <button type="submit" disabled={loading} className="vd-btn">
                {loading ? (
                  "Šaljemo…"
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
              key="confirm"
              initial={{ opacity: 0, scale: 0.98 }}
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
