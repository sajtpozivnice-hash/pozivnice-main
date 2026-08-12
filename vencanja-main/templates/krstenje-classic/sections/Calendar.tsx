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

  return (
    <section id={id} className="kc-section bg-kc-sand">
      <div className="kc-container-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kc-eyebrow mb-4"
        >
          Kalendar
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kc-heading mb-12"
          style={{ color: ink }}
        >
          {data.title}
        </motion.h2>

        {/* Framed single-day plaque — no month grid, just the ceremony date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kc-plaque"
        >
          <span className="kc-corner top-3 left-3 border-t border-l" />
          <span className="kc-corner top-3 right-3 border-t border-r" />
          <span className="kc-corner bottom-3 left-3 border-b border-l" />
          <span className="kc-corner bottom-3 right-3 border-b border-r" />

          <p className="kc-plaque-weekday">{weekday}</p>
          <p className="kc-plaque-day" style={{ color: ink }}>
            {dateObj.getDate()}
          </p>
          <p className="kc-plaque-month">
            {formatDate(date, "MMMM")} {dateObj.getFullYear()}.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Calendar;
