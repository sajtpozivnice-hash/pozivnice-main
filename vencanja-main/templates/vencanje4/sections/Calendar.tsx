"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { generateCalendar } from "@/helpers/generateCalendar";
import { SceneShell } from "../components/SceneShell";

type Props = {
  section: CalendarSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Calendar: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { date } = event;
  const accent = theme.colors?.base?.primary?.value ?? "#c9a86a";
  const calendar = generateCalendar(new Date(date));

  return (
    <SceneShell
      id={id}
      backgroundImage={data.imageUrl}
      overlay="default"
    >
      <div className="v4-content-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="v4-eyebrow mb-5"
          style={{ color: accent }}
        >
          Kalendar
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="v4-heading mb-12"
        >
          {data.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="v4-glass-strong px-4 py-8 sm:px-8 sm:py-10"
        >
          <p
            className="mb-8 text-2xl capitalize text-white sm:text-3xl"
            style={{ fontFamily: "var(--font-primary)", color: accent }}
          >
            {formatDate(date, "MMMM")}
          </p>

          <div className="mb-4 grid grid-cols-7 gap-1 sm:gap-2">
            {["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"].map((day) => (
              <div
                key={day}
                className="text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-xs"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendar.map((day, index) => (
              <div
                key={`${day.date.toISOString()}-${index}`}
                className={`relative flex h-10 items-center justify-center rounded-lg text-sm sm:h-12 ${
                  day.currentMonth ? "bg-white/8" : "opacity-25"
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
                    day.isEventDay
                      ? "font-semibold text-black"
                      : "text-white/85"
                  }`}
                >
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SceneShell>
  );
};

export default Calendar;
