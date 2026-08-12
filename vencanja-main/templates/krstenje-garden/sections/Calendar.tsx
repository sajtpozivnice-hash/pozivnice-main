"use client";

import { FC } from "react";
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
  const weekday = new Intl.DateTimeFormat("sr-Latn-RS", {
    weekday: "long",
  }).format(dateObj);
  const ticks = Array.from({ length: 12 });

  return (
    <section id={id} className="kg-section bg-kg-sand">
      <div className="kg-container-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kg-eyebrow justify-center"
        >
          Kalendar
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kg-heading mt-4 mb-12"
          style={{ color: ink }}
        >
          {data.title}
        </motion.h2>

        {/* Circular date dial — day at the center, ticks around the rim, no month grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="kg-dial"
        >
          {ticks.map((_, index) => (
            <span
              key={index}
              className="kg-dial-tick"
              style={{
                transform: `rotate(${index * 30}deg)`,
                transformOrigin: "50% 118px",
              }}
            />
          ))}
          <div className="kg-dial-center">
            <p className="kg-dial-day" style={{ color: ink }}>
              {dateObj.getDate()}
            </p>
            <p className="kg-dial-month">{formatDate(date, "MMM")}</p>
          </div>
        </motion.div>

        <p className="kg-dial-caption">
          {weekday}, {dateObj.getFullYear()}.
        </p>
      </div>
    </section>
  );
};

export default Calendar;
