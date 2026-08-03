"use client";

import { EditableText } from "@/components/editor/EditableText";
import {
  CalendarSection,
  CountdownSection,
  OurStorySection,
  RSVPSection,
} from "@/types/sections";
import { SectionHeader } from "./SectionHeader";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

type Props = {
  section: RSVPSection;
  mode: "editor" | "view";
  onChange?: (sectionId: string, newData: RSVPSection["data"]) => void;
};

const RSVP: React.FC<Props> = ({ section, mode, onChange }) => {
  const { data, id } = section;

  const isEditor = mode === "editor";

  function update<K extends keyof RSVPSection["data"]>(
    key: K,
    value: RSVPSection["data"][K],
  ) {
    onChange?.(id, { ...data, [key]: value });
  }

  const [rsvpStatus, setRsvpStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpStatus("submitting");
    setTimeout(() => setRsvpStatus("success"), 1500);
  };

  return (
    <section
      id="rsvp"
      className="py-24 px-6 bg-wedding-sage/10 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-wedding-sage/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-wedding-gold/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="max-w-3xl mx-auto relative z-10">
        <SectionHeader
          title="RSVP"
          subtitle="Kindly respond by May 1st, 2026"
        />

        <div className="glass-card rounded-[40px] p-8 md:p-12">
          <AnimatePresence mode="wait">
            {rsvpStatus === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-display mb-4">Thank You!</h3>
                <p className="text-lg text-wedding-ink/70">
                  Your response has been received. We can't wait to celebrate
                  with you!
                </p>
                <button
                  onClick={() => setRsvpStatus("idle")}
                  className="mt-8 text-wedding-gold font-semibold hover:underline"
                >
                  Submit another response
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleRSVP}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-wedding-ink/60">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-white/50 border-b border-wedding-ink/10 py-3 focus:border-wedding-gold outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-wedding-ink/60">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="email@example.com"
                      className="w-full bg-white/50 border-b border-wedding-ink/10 py-3 focus:border-wedding-gold outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-wedding-ink/60 block">
                    Will you attend?
                  </label>
                  <div className="flex gap-8">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        className="w-4 h-4 accent-wedding-gold"
                        defaultChecked
                      />
                      <span className="text-lg">Joyfully Attend</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        className="w-4 h-4 accent-wedding-gold"
                      />
                      <span className="text-lg">Regretfully Decline</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-wedding-ink/60">
                    Number of Guests
                  </label>
                  <select className="w-full bg-white/50 border-b border-wedding-ink/10 py-3 focus:border-wedding-gold outline-none transition-colors">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-wedding-ink/60">
                    Special Notes (Dietary, etc.)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Let us know if you have any special requirements..."
                    className="w-full bg-white/50 border-b border-wedding-ink/10 py-3 focus:border-wedding-gold outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  disabled={rsvpStatus === "submitting"}
                  className="w-full bg-wedding-ink text-white py-5 rounded-2xl text-xs uppercase tracking-[0.3em] font-bold hover:bg-wedding-gold transition-all disabled:opacity-50"
                >
                  {rsvpStatus === "submitting" ? "Sending..." : "Send Response"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
