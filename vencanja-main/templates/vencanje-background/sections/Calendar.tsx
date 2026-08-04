"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { generateCalendar } from "@/helpers/generateCalendar";
import { GlassPanel } from "../components/GlassPanel";

type Props = {
  section: CalendarSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Calendar: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { date } = event;
  const accent = theme.colors?.base?.primary?.value ?? "#e2c4a0";
  const calendar = generateCalendar(new Date(date));

  return (
    <section id={id} className="vb-section">
      <div className="vb-wrap-narrow">
        <GlassPanel strong className="px-4 py-10 text-center sm:px-8 sm:py-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vb-eyebrow mb-4"
            style={{ color: accent }}
          >
            Kalendar
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vb-title mb-8"
          >
            {data.title}
          </motion.h2>

          <p
            className="mb-6 text-2xl capitalize sm:text-3xl"
            style={{ fontFamily: "var(--font-primary)", color: accent }}
          >
            {formatDate(date, "MMMM")}
          </p>

          <div className="mb-3 grid grid-cols-7 gap-1">
            {["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"].map((day) => (
              <div
                key={day}
                className="text-[10px] uppercase tracking-[0.14em] text-white/45"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendar.map((day, index) => (
              <div
                key={`${day.date.toISOString()}-${index}`}
                className={`relative flex h-10 items-center justify-center text-sm sm:h-11 ${
                  day.currentMonth ? "text-white/85" : "text-white/20"
                }`}
              >
                {day.isEventDay ? (
                  <span
                    className="absolute inset-1 rounded-full"
                    style={{ background: accent }}
                  />
                ) : null}
                <span
                  className={`relative z-10 ${
                    day.isEventDay ? "font-semibold text-black" : ""
                  }`}
                >
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
};

export default Calendar;
