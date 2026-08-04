"use client";

import { FormEvent, FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RSVPSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import FormConfirmMessage, {
  Attendance,
} from "../components/FormConfirmMessage";
import { SceneFrame } from "../components/SceneFrame";

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

const RSVP: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#d4a574";

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
    }, 1200);
  };

  return (
    <SceneFrame id={id} backgroundImage={data.imageUrl} overlay="heavy">
      <div className="vc-stage-narrow">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vc-eyebrow mb-5"
            style={{ color: accent }}
          >
            Final dialogue
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vc-title"
          >
            {data.title}
          </motion.h2>
          <p className="mt-4 text-sm text-white/50">
            {data.description}
            {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div>
                <label className="vc-label" htmlFor="vc-fullName">
                  Name
                </label>
                <input
                  id="vc-fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="vc-input"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="vc-label" htmlFor="vc-email">
                  Email
                </label>
                <input
                  id="vc-email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="vc-input"
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <p className="vc-label">Presence</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {(
                    [
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ] as const
                  ).map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="vc-attendance"
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
                      <div className="border border-white/20 py-3.5 text-center text-xs uppercase tracking-[0.28em] text-white/70 transition peer-checked:border-white peer-checked:bg-white peer-checked:text-black">
                        {option.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {formData.attendance === "yes" ? (
                <div>
                  <label className="vc-label" htmlFor="vc-guests">
                    Guests
                  </label>
                  <input
                    id="vc-guests"
                    type="number"
                    min={1}
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guests: Number(e.target.value),
                      })
                    }
                    className="vc-input"
                  />
                </div>
              ) : null}

              <div>
                <label className="vc-label" htmlFor="vc-message">
                  Note
                </label>
                <textarea
                  id="vc-message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="vc-input min-h-20 resize-none"
                  placeholder="Optional message"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer border border-white/30 py-4 text-[10px] uppercase tracking-[0.35em] text-white transition hover:bg-white hover:text-black disabled:opacity-50"
              >
                {loading ? "Sending..." : data.buttonText || "Confirm"}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FormConfirmMessage
                attendance={formData.attendance}
                accent={accent}
                onClick={() => setSubmitted(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneFrame>
  );
};

export default RSVP;
