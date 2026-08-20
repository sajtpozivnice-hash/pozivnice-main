"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate, parseDate } from "@/helpers/formatDate";

type Props = {
  section: CalendarSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Calendar: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#6b7f6a";
  const ink = theme.colors?.base?.secondary?.value ?? "#2c2a26";
  const parsed = parseDate(event.date);
  const dayNumber = parsed ? String(parsed.getDate()).padStart(2, "0") : "";
  const year = parsed ? String(parsed.getFullYear()) : "";
  const weekday = formatDate(event.date, "DAY_D_MMMM_YYYY").split(",")[0];

  return (
    <section id={id} className="vs-section bg-vs-oat">
      <div className="vs-container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="vs-eyebrow mb-8" style={{ color: accent }}>
            {data.title}
          </p>

          <div className="flex flex-wrap items-end justify-center gap-x-6 gap-y-2 border-t border-vs-line pt-8">
            <span
              className="text-[6rem] leading-[0.82] tracking-[-0.04em] sm:text-[9rem]"
              style={{ fontFamily: "var(--font-primary)", color: ink }}
            >
              {dayNumber}
            </span>
            <div className="pb-3 text-left">
              <p
                className="text-3xl capitalize leading-none sm:text-4xl"
                style={{ fontFamily: "var(--font-primary)", color: accent }}
              >
                {formatDate(event.date, "MMMM")}
              </p>
              <p className="mt-4 text-base uppercase tracking-[0.32em] text-vs-muted">
                {year}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-vs-line pt-6">
            <p className="text-base capitalize tracking-[0.18em] text-vs-ink-soft">
              {weekday}
            </p>
            {event.location?.name ? (
              <p className="text-base tracking-[0.1em] text-vs-muted">
                {event.location.name}
              </p>
            ) : null}
          </div>

          {data.description ? (
            <p className="vs-body mx-auto mt-10 max-w-md text-vs-muted">
              {data.description}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default Calendar;
