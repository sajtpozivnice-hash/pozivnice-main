"use client";

import { CSSProperties, FC } from "react";
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

const weekdayShort = (date: Date) =>
  new Intl.DateTimeFormat("sr-Latn-RS", { weekday: "short" }).format(date);

const Calendar: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { date } = event;
  const accent = theme.colors?.base?.primary?.value ?? "#c9a86a";
  const eventDate = new Date(date);
  const calendar = generateCalendar(eventDate);

  const eventIndex = calendar.findIndex((day) => day.isEventDay);
  const windowStart = Math.max(0, eventIndex - 3);
  const week = calendar.slice(windowStart, windowStart + 7);

  return (
    <SceneShell id={id} backgroundImage={data.imageUrl} overlay="default">
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

        {/* Production-desk calendar — a tear-off day page plus a week strip, not a full month grid */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="v4-deskcal"
        >
          <div className="v4-deskcal__page">
            <span className="v4-deskcal__ring" aria-hidden />
            <span className="v4-deskcal__ring v4-deskcal__ring--right" aria-hidden />
            <span className="v4-deskcal__weekday">
              {weekdayShort(eventDate)}
            </span>
            <span className="v4-deskcal__day" style={{ color: accent }}>
              {eventDate.getDate()}
            </span>
            <span className="v4-deskcal__month">
              {formatDate(date, "MMMM")} {eventDate.getFullYear()}
            </span>
          </div>

          <div className="v4-deskcal__strip">
            {week.map((day, index) => (
              <div
                key={`${day.date.toISOString()}-${index}`}
                className={`v4-deskcal__chip${
                  day.isEventDay ? " is-active" : ""
                }`}
                style={
                  day.isEventDay
                    ? ({ "--v4-chip-accent": accent } as CSSProperties)
                    : undefined
                }
              >
                <span className="v4-deskcal__chip-label">
                  {weekdayShort(day.date)}
                </span>
                <span className="v4-deskcal__chip-day">{day.day}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SceneShell>
  );
};

export default Calendar;
