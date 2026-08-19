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
    <section id={id} className="vg-section">
      <div className="vg-shell grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <p className="vg-kicker">{data.title ?? "Datum"}</p>
          <p className="vg-day mt-4">{eventDate.getDate()}</p>
          <p className="vg-display-sm mt-2">
            {formatDate(event.date, "MMMM")} {eventDate.getFullYear()}
          </p>
          <p className="vg-meta mt-6">
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </p>
          {data.description ? (
            <p className="vg-body mt-6 max-w-sm">{data.description}</p>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.06 }}
          className="lg:col-span-7"
        >
          <div className="border border-[var(--color-vg-ink)] p-5 sm:p-7">
            <div className="grid grid-cols-7 gap-1 border-b border-[var(--color-vg-line)] pb-3">
              {WEEKDAYS.map((day, index) => (
                <span
                  key={`${day}-${index}`}
                  className="text-center text-[10px] uppercase tracking-[0.2em] text-[var(--color-vg-muted)]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <span
                  key={`${day.date.toISOString()}-${index}`}
                  className={`flex aspect-square items-center justify-center text-sm tabular-nums ${
                    day.isEventDay
                      ? "bg-[var(--color-vg-ink)] text-[var(--color-vg-paper)]"
                      : day.currentMonth
                        ? "text-[var(--color-vg-ink)]"
                        : "text-[var(--color-vg-muted)] opacity-45"
                  }`}
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {day.day}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Calendar;
