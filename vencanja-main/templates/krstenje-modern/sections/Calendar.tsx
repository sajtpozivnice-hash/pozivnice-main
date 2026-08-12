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

const Calendar: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const { date } = event;
  const dateObj = new Date(date);
  const weekday = new Intl.DateTimeFormat("sr-Latn-RS", {
    weekday: "long",
  }).format(dateObj);

  return (
    <section id={id} className="km-section bg-km-ivory">
      <div className="km-container-narrow">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="km-eyebrow mb-4"
        >
          Kalendar
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="km-heading"
        >
          {data.title}
        </motion.h2>

        {/* Single agenda row — oversized day numeral, no calendar grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="km-agenda-row mt-12"
        >
          <p className="km-agenda-day">{dateObj.getDate()}</p>
          <div className="km-agenda-meta">
            <p
              className="text-lg text-km-ink sm:text-xl"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {formatDate(date, "MMMM")} {dateObj.getFullYear()}.
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-km-muted">
              {weekday}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Calendar;
