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
    <section id={id} className="vb-section">
      <div className="vb-shell">
        <div className="mb-10 text-center">
          <p className="vb-kicker">Kalendar</p>
          <h2 className="vb-script-sm mt-4">
            {data.title ?? "Sačuvajte datum"}
          </h2>
          <div className="vb-arch mt-6" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-md rounded-[2rem] px-5 py-8 sm:px-8"
          style={{
            background:
              "color-mix(in srgb, var(--color-vb-sand-deep) 55%, white)",
          }}
        >
          <p className="vb-meta text-center capitalize">
            {formatDate(event.date, "MMMM")} {eventDate.getFullYear()}
          </p>
          <p
            className="mt-3 text-center text-6xl font-medium tabular-nums sm:text-7xl"
            style={{
              color: "var(--color-vb-clay)",
              fontFamily: "var(--font-secondary)",
            }}
          >
            {eventDate.getDate()}
          </p>
          <p className="vb-meta mt-2 text-center">
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </p>

          <div className="mt-8 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day, index) => (
              <span
                key={`${day}-${index}`}
                className="pb-2 text-center text-[10px] uppercase tracking-[0.18em] text-[var(--color-vb-muted)]"
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
                className={`flex aspect-square items-center justify-center rounded-full text-sm tabular-nums ${
                  day.isEventDay
                    ? "bg-[var(--color-vb-clay)] text-[var(--color-vb-sand)]"
                    : day.currentMonth
                      ? "text-[var(--color-vb-ink)]"
                      : "text-[var(--color-vb-muted)] opacity-40"
                }`}
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {day.day}
              </span>
            ))}
          </div>

          {data.description ? (
            <p className="vb-body mt-6 text-center text-sm">
              {data.description}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default Calendar;
