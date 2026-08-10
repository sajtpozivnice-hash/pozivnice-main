"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { generateCalendar } from "@/helpers/generateCalendar";
import { SceneFrame } from "../components/SceneFrame";

type Props = {
  section: CalendarSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Calendar: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { date } = event;
  const accent = theme.colors?.base?.primary?.value ?? "#d4a574";
  const calendar = generateCalendar(new Date(date));

  return (
    <SceneFrame id={id} backgroundImage={data.imageUrl} overlay="heavy">
      <div className="vc-stage-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vc-eyebrow mb-5"
          style={{ color: accent }}
        >
          Umetak
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vc-title mb-10"
        >
          {data.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-white/15 bg-black/40 px-4 py-8 backdrop-blur-md sm:px-8"
        >
          <p
            className="mb-8 text-2xl capitalize sm:text-3xl"
            style={{ fontFamily: "var(--font-primary)", color: accent }}
          >
            {formatDate(date, "MMMM")}
          </p>

          <div className="mb-3 grid grid-cols-7 gap-1">
            {["P", "U", "S", "Č", "P", "S", "N"].map((day, i) => (
              <div
                key={`${day}-${i}`}
                className="text-center text-[10px] uppercase tracking-[0.2em] text-white/40"
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
        </motion.div>
      </div>
    </SceneFrame>
  );
};

export default Calendar;
