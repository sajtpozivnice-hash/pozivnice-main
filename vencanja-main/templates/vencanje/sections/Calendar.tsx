"use client";

import { formatDate } from "@/helpers/formatDate";
import { generateCalendar } from "@/helpers/generateCalendar";
import { EventConfig, ThemeConfig } from "@/types/config";
import { CalendarSection } from "@/types/sections";
import { motion } from "framer-motion";

type Props = {
  section: CalendarSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Calendar: React.FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { date } = event;
  const { colors } = theme;
  const calendar = generateCalendar(new Date(date));

  return (
    <section
      id={id}
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display mb-12"
          style={{ color: colors?.base?.secondary?.value }}
        >
          {data.title}
        </motion.h2>

        <div className="bg-wedding-cream/30 border border-wedding-gold/20 rounded-3xl p-6 md:p-10 backdrop-blur-sm">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-3xl font-display mb-12"
            style={{ color: colors?.base?.primary?.value }}
          >
            {formatDate(date, "MMMM")}
          </motion.h4>

          <div className="grid grid-cols-7 gap-3 mb-6">
            {["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"].map((d) => (
              <div
                key={d}
                className="text-xs md:text-sm uppercase tracking-widest font-semibold opacity-60"
                style={{ color: colors?.base?.primary?.value }}
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-3">
            {calendar.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.01 }}
                className={`relative h-12 md:h-14 flex items-center justify-center rounded-xl text-sm md:text-base
              ${
                day.currentMonth
                  ? "bg-white border border-wedding-gold/10"
                  : "opacity-20"
              }
            `}
              >
                {day.isEventDay && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                      style={{ background: colors?.base?.secondary?.value }}
                    />
                  </div>
                )}

                <span
                  className={`relative z-10 font-medium ${
                    day.isEventDay
                      ? "text-wedding-gold font-semibold"
                      : "text-neutral-700"
                  }`}
                >
                  {day.day}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-wedding-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-wedding-gold/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
    </section>
  );
};

export default Calendar;
