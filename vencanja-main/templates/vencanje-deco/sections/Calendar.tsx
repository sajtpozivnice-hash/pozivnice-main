"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate, parseDate } from "@/helpers/formatDate";
import { generateCalendar } from "@/helpers/generateCalendar";

type Props = {
  section: CalendarSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const WEEKDAYS = ["P", "U", "S", "Č", "P", "S", "N"];

const Calendar: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const eventDate = parseDate(event.date) ?? new Date(event.date);
  const days = generateCalendar(eventDate);

  return (
    <section id={id} className="vd-section bg-[var(--color-vd-ivory-deep)]">
      <div className="vd-shell">
        <div className="mb-12 text-center">
          <p className="vd-eyebrow">Kalendar</p>
          <h2 className="vd-display-sm mt-4">
            {data.title ?? "Sačuvajte datum"}
          </h2>
          <div className="vd-diamond mt-6" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="vd-double-frame mx-auto max-w-lg"
        >
          <span className="vd-corner tl" aria-hidden />
          <span className="vd-corner tr" aria-hidden />
          <span className="vd-corner bl" aria-hidden />
          <span className="vd-corner br" aria-hidden />

          <p className="vd-meta text-center">
            {formatDate(event.date, "MMMM")} {eventDate.getFullYear()}
          </p>
          <p className="vd-display mt-3 text-center">
            {eventDate.getDate()}
          </p>
          <p className="vd-meta mt-2 text-center">
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </p>

          <div className="mt-8 grid grid-cols-7 gap-1 border-t border-[var(--color-vd-gold-soft)] pt-4">
            {WEEKDAYS.map((day, index) => (
              <span
                key={`${day}-${index}`}
                className="pb-2 text-center text-[10px] uppercase tracking-[0.2em] text-[var(--color-vd-muted)]"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {day}
              </span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <span
                key={`${day.date.toISOString()}-${index}`}
                className={`flex aspect-square items-center justify-center text-sm tabular-nums ${
                  day.isEventDay
                    ? "bg-[var(--color-vd-ink)] text-[var(--color-vd-ivory)]"
                    : day.currentMonth
                      ? "text-[var(--color-vd-ink)]"
                      : "text-[var(--color-vd-muted)] opacity-40"
                }`}
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {day.day}
              </span>
            ))}
          </div>

          {data.description ? (
            <p className="vd-body mt-6 text-center text-sm">
              {data.description}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default Calendar;
