"use client";

import { FC, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";

type Props = {
  section: CalendarSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Calendar: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { date } = event;
  const ink = theme.colors?.base?.secondary?.value;
  const dateObj = new Date(date);
  const eventDay = dateObj.getDate();
  const daysInMonth = new Date(
    dateObj.getFullYear(),
    dateObj.getMonth() + 1,
    0,
  ).getDate();
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, []);

  return (
    <section id={id} className="ks-section bg-ks-sand">
      <div className="ks-wash -top-20 -left-16 h-72 w-72 bg-ks-champagne-soft/30" />

      <div className="ks-container-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ks-eyebrow mb-4"
        >
          Kalendar
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ks-heading mb-12"
          style={{ color: ink }}
        >
          {data.title}
        </motion.h2>

        {/* Big day numeral above a horizontally scrollable monthly strip — no month grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ks-card px-6 py-10 sm:px-10 sm:py-14"
        >
          <p className="ks-script mb-2">
            {formatDate(date, "MMMM")} {dateObj.getFullYear()}.
          </p>
          <p className="ks-date-num">{eventDay}</p>

          <div className="ks-strip mt-8">
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
              (day) => {
                const isActive = day === eventDay;
                return (
                  <div
                    key={day}
                    ref={isActive ? activeRef : undefined}
                    className={`ks-strip-day ${isActive ? "ks-strip-day--active" : ""}`}
                  >
                    {day}
                  </div>
                );
              },
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Calendar;
