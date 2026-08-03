"use client";

import { formatDate } from "@/helpers/formatDate";
import { EventConfig, ThemeConfig } from "@/types/config";
import { RSVPSection } from "@/types/sections";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import FormMessage, { Attendance } from "../components/FormConfirmMessage";

type Props = {
  section: RSVPSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const RSVP: React.FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { rsvpDate } = event;
  const { colors } = theme;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    attendance: Attendance.YES,
    guests: 1,
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section
      id={id}
      className="section-padding bg-wedding-dark text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"
          alt="RSVP Background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-display mb-4 text-white"
          >
            {data.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg opacity-60 font-serif italic"
          >
            {data.description} {formatDate(rsvpDate, "DD_MMM_YYYY")}
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 md:p-12 rounded-3xl space-y-6"
            >
              <div className="grid grid-cols-1  gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-semibold opacity-60">
                    Ime i Prezime
                  </label>
                  <input
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    type="text"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-wedding-gold transition-colors"
                    placeholder="Unesite Vaše Ime i Prezime"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold opacity-60">
                  Email Adresa
                </label>
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  type="email"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-wedding-gold transition-colors"
                  placeholder="Unesite Vašu Email adresu"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold opacity-60">
                  Da li prisustvujete?
                </label>
                <div className="flex flex-col md:flex-row gap-4">
                  <label className="flex-1 cursor-pointer group">
                    <input
                      type="radio"
                      name="attendance"
                      value={Attendance.YES}
                      checked={formData.attendance === Attendance.YES}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          attendance: e.target.value as any,
                        })
                      }
                      className="hidden peer"
                      required
                    />
                    <div className="text-center py-3 rounded-xl border border-white/20 peer-checked:bg-wedding-gold peer-checked:border-wedding-gold transition-all duration-300 group-hover:bg-white/10">
                      Naravno, vidimo se!
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer group">
                    <input
                      type="radio"
                      name="attendance"
                      value={Attendance.NO}
                      checked={formData.attendance === Attendance.NO}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          attendance: e.target.value as any,
                        })
                      }
                      className="hidden peer"
                    />
                    <div className="text-center py-3 rounded-xl border border-white/20 peer-checked:bg-red-500/50 peer-checked:border-red-500 transition-all duration-300 group-hover:bg-white/10">
                      Nažalost, nećemo moći
                    </div>
                  </label>
                </div>
              </div>
              {formData.attendance === Attendance.YES && (
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-semibold opacity-60">
                    Broj Gostiju
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guests: Number(e.target.value),
                      })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-wedding-gold transition-colors"
                    placeholder="Unesite broj gostiju"
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold opacity-60">
                  Poruka Mladencima
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-wedding-gold transition-colors h-24 resize-none"
                  placeholder="Vaša Poruka"
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                style={{ background: colors?.base?.secondary?.value }}
                className="w-full bg-wedding-gold hover:bg-wedding-gold/80 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-wedding-dark border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Pošalji
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <FormMessage
              onClick={() => setSubmitted(false)}
              attendance={formData.attendance}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RSVP;
