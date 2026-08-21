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
    <section id={id} className="b18-section scroll-mt-8 overflow-hidden">
      {data.imageUrl ? (
        <div className="pointer-events-none absolute inset-0 opacity-[0.2]">
          <img
            src={data.imageUrl}
            alt=""
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[var(--b18-bg)]/88" />
        </div>
      ) : null}

      <div className="b18-shell relative z-10 max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="b18-heading">{data.title}</h2>
          <p className="mt-4 text-white/55">
            {data.description}
            {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18-panel p-6 sm:p-8"
        >
          {submitted ? (
            <div className="py-10 text-center">
              <p
                className="b18-metal text-4xl font-bold"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                HVALA!
              </p>
              <p className="mt-3 text-white/55">
                Tvoja potvrda je zabeležena. Vidimo se na proslavi!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
                  Ime i prezime
                </label>
                <input
                  required
                  className="b18-input"
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
                <label className="mb-2 block text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
                  Dolaziš?
                </label>
                <div className="grid grid-cols-2 gap-2">
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
                        setFormData((prev) => ({ ...prev, attendance: value }))
                      }
                      className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                        formData.attendance === value
                          ? "border-white/50 bg-white text-black"
                          : "border-white/12 bg-black/30 text-white/70 hover:border-white/30"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {formData.attendance === "yes" ? (
                  <div>
                <label className="mb-1.5 block text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
                  Broj osoba
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  className="b18-input"
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
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
                  {data.messageLabel || "Poruka za slavljenika"}
                </label>
                <textarea
                  rows={4}
                  className="b18-input resize-none"
                  placeholder={
                    data.messagePlaceholder ||
                    "Napiši kratku poruku ili čestitku…"
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
                <p className="text-sm text-red-400">{error}</p>
              ) : null}
              <button type="submit" disabled={loading} className="b18-btn w-full">
                {loading ? "Šaljem…" : data.buttonText || "Pošalji potvrdu"}
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
