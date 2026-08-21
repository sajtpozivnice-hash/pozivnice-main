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
  const { data, id, name } = section;

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
    <section id={id} className="kspc-section scroll-mt-8">
      <div className="kspc-shell max-w-2xl">
        <div className="mb-8 text-center">
          <p className="kspc-eyebrow mx-auto justify-center">{name}</p>
          <h2 className="kspc-heading mt-4">{data.title}</h2>
          <p className="mt-3 text-white/55">
            {data.description}
            {formatDate(event.rsvpDate, "DD_MMM_YYYY")}
          </p>
        </div>

        {data.imageUrl ? (
          <div className="mb-6 overflow-hidden rounded-xl border border-white/10">
            <img
              src={data.imageUrl}
              alt=""
              className="aspect-[21/9] w-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kspc-card-strong kspc-panel"
        >
          {submitted ? (
            <div className="py-10 text-center">
              <p
                className="kspc-heading text-3xl"
                style={{ color: "var(--color-kspc-cyan)" }}
              >
                Hvala!
              </p>
              <p className="mt-3 text-white/55">
                Tvoja potvrda je zabeležena. Vidimo se na misiji!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="kspc-panel-status">
                <span className="kspc-panel-light" />
                Sistem spreman za prijavu
              </div>

              <div className="kspc-panel-rows">
                <div className="kspc-panel-row">
                  <label>Ime i prezime</label>
                  <input
                    required
                    className="kspc-input"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="kspc-panel-row">
                  <label>Dolazak</label>
                  <select
                    className="kspc-input"
                    value={formData.attendance}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        attendance: e.target.value as Attendance,
                      }))
                    }
                  >
                    <option value="yes">Dolazim</option>
<option value="no">Ne mogu</option>
                  </select>
                </div>
                {formData.attendance === "yes" ? (
                  <div className="kspc-panel-row">
                  <label>Broj gostiju</label>
                  <input
                    type="number"
                    min={1}
                    className="kspc-input"
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
                <div className="kspc-panel-row kspc-panel-row--full">
                  <label>{data.messageLabel ?? "Poruka"}</label>
                  <textarea
                    rows={3}
                    className="kspc-input resize-none"
                    placeholder={data.messagePlaceholder ?? "Napiši poruku…"}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {error ? (
                <p className="text-sm text-red-400">{error}</p>
              ) : null}
              <button
                type="submit"
                className="kspc-btn w-full sm:w-auto"
                disabled={loading}
              >
                <Send className="h-4 w-4" />
                {loading ? "Slanje…" : data.buttonText ?? "Pošalji"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;
