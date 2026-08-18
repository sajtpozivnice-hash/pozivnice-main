"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate, parseDate } from "@/helpers/formatDate";
import { generateCalendar } from "@/helpers/generateCalendar";
import { Media } from "../components/Media";

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
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section id={id} className="vn-section">
      <div
        className={
          hasImage
            ? "vn-shell grid items-center gap-12 lg:grid-cols-12 lg:gap-14"
            : "vn-shell"
        }
      >
        <div className={hasImage ? "lg:col-span-7" : undefined}>
          <div className="mb-12 text-center">
            <p className="vn-eyebrow">Kalendar</p>
            <h2 className="vn-display-sm mt-4">
              {data.title ?? "Sačuvajte datum"}
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85 }}
            className="vn-plaque"
          >
            <p className="vn-eyebrow text-center">
              {formatDate(event.date, "MMMM")} {eventDate.getFullYear()}
            </p>
            <p className="vn-plaque-title mt-3 text-center">
              {formatDate(event.date, "DAY_D_MMMM_YYYY")}
            </p>

            <div className="mt-8 grid grid-cols-7 gap-1">
              {WEEKDAYS.map((day, index) => (
                <span key={`${day}-${index}`} className="vn-cal-head pb-2">
                  {day}
                </span>
              ))}
            </div>

            <div className="vn-cal-grid">
              {days.map((day, index) => (
                <span
                  key={`${day.date.toISOString()}-${index}`}
                  className={`vn-cal-cell ${
                    day.currentMonth ? "" : "is-muted"
                  } ${day.isEventDay ? "is-event" : ""}`}
                >
                  {day.day}
                </span>
              ))}
            </div>

            {data.description ? (
              <p className="mt-6 text-center text-sm leading-relaxed text-[rgba(11,28,44,0.65)]">
                {data.description}
              </p>
            ) : null}
          </motion.div>
        </div>

        {hasImage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, delay: 0.08 }}
            className="lg:col-span-5"
          >
            <Media
              src={data.imageUrl}
              alt={data.title ?? "Kalendar"}
              className="aspect-[3/4] w-full"
            />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default Calendar;
