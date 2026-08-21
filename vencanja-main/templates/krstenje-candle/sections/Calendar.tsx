"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: CalendarSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Calendar: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const { date } = event;
  const dateObj = new Date(date);
  const dow = dateObj.getDay();
  const mondayOffset = dow === 0 ? -6 : 1 - dow;
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(dateObj);
    d.setDate(dateObj.getDate() + mondayOffset + i);
    return d;
  });

  return (
    <section id={id} className="kd-section">
      <div className="kd-glow -top-16 left-1/2 h-72 w-72 -translate-x-1/2" />

      <div className="kd-container-narrow relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kd-eyebrow mb-4"
        >
          Kalendar
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kd-heading mb-12"
        >
          {data.title}
        </motion.h2>

        <div className="kd-ribbon">
          {week.map((d, index) => {
            const isLit =
              d.getDate() === dateObj.getDate() &&
              d.getMonth() === dateObj.getMonth() &&
              d.getFullYear() === dateObj.getFullYear();

            return (
              <motion.div
                key={d.toISOString()}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`kd-ribbon-row ${isLit ? "kd-ribbon-row--lit" : ""}`}
              >
                <span className="kd-ribbon-flame">
                  <Flame className="h-3.5 w-3.5" />
                </span>
                <p className="kd-ribbon-day">
                  {d.getDate()}.{" "}
                  {new Intl.DateTimeFormat("sr-Latn-RS", {
                    month: "short",
                  }).format(d)}
                </p>
                <span className="kd-ribbon-weekday">
                  {new Intl.DateTimeFormat("sr-Latn-RS", {
                    weekday: "short",
                  }).format(d)}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Calendar;