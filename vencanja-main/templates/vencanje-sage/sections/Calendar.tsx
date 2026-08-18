"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate, parseDate } from "@/helpers/formatDate";
import { SageMedia } from "../components/Media";

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
      <div className="vs-container grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <p className="vs-eyebrow mb-8" style={{ color: accent }}>
            {data.title}
          </p>

          <div className="flex flex-wrap items-end gap-x-6 gap-y-2 border-t border-vs-line pt-8">
            <span
              className="text-[6rem] leading-[0.82] tracking-[-0.04em] sm:text-[9rem] lg:text-[11rem]"
              style={{ fontFamily: "var(--font-primary)", color: ink }}
            >
              {dayNumber}
            </span>
            <div className="pb-3">
              <p
                className="text-3xl capitalize leading-none sm:text-4xl"
                style={{ fontFamily: "var(--font-primary)", color: accent }}
              >
                {formatDate(event.date, "MMMM")}
              </p>
              <p className="mt-4 text-sm uppercase tracking-[0.4em] text-vs-muted">
                {year}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-vs-line pt-6">
            <p className="text-sm capitalize tracking-[0.2em] text-vs-ink-soft">
              {weekday}
            </p>
            {event.location?.name ? (
              <p className="text-sm tracking-[0.12em] text-vs-muted">
                {event.location.name}
              </p>
            ) : null}
          </div>

          {data.description ? (
            <p className="vs-body mt-10 max-w-md text-vs-muted">
              {data.description}
            </p>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <SageMedia
            src={data.imageUrl}
            alt={data.title ?? "Sačuvajte datum"}
            className="aspect-[3/4] w-full"
          />
          <p className="mt-5 text-[10px] uppercase tracking-[0.36em] text-vs-muted">
            Sačuvajte datum
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Calendar;
