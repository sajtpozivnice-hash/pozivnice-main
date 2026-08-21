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

const Calendar: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#111111";
  const eventDate = parseDate(event.date) ?? new Date(event.date);
  const days = generateCalendar(eventDate);

  return (
    <section id={id} className="vi-section">
      <div className="vi-shell">
        <div className="vi-rule-ink" />
        <div className="flex flex-wrap items-baseline justify-between gap-3 py-4">
          <p className="vi-eyebrow">Datum</p>
          <p className="vi-caption">{data.title}</p>
        </div>

        <div className="vi-grid mt-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-7"
          >
            <span className="vi-month">{formatDate(event.date, "MMMM")}</span>
            <div className="mt-6 flex items-end gap-6">
              <span
                className="vi-num text-vi-ink"
                style={{ fontSize: "clamp(3rem, 9vw, 6rem)", lineHeight: 0.9 }}
              >
                {String(eventDate.getDate()).padStart(2, "0")}
              </span>
              <div className="pb-2">
                <p className="vi-caption">{eventDate.getFullYear()}</p>
                <p className="vi-caption mt-2">
                  {formatDate(event.date, "DAY_D_MMMM_YYYY")}
                </p>
              </div>
            </div>

            <div className="vi-accent mt-8" style={{ background: accent }} />

            {data.description ? (
              <p className="vi-body mt-6 max-w-md">{data.description}</p>
            ) : null}
          </motion.div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-7">
              {WEEKDAYS.map((day, index) => (
                <span
                  key={`${day}-${index}`}
                  className="vi-caption pb-3 text-center"
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="vi-cal-grid">
              {days.map((day, index) => (
                <span
                  key={`${day.date.toISOString()}-${index}`}
                  className={`vi-cal-cell ${
                    day.currentMonth ? "text-vi-body" : "text-vi-muted/40"
                  } ${day.isEventDay ? "text-vi-paper" : ""}`}
                  style={
                    day.isEventDay ? { background: accent } : undefined
                  }
                >
                  {day.day}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
