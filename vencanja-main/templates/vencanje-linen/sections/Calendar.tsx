"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate, parseDate } from "@/helpers/formatDate";
import { LinenMedia } from "../components/Media";

type Props = {
  section: CalendarSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Calendar: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C4A574";
  const ink = theme.colors?.base?.secondary?.value ?? "#2A2420";
  const eventDate = parseDate(event.date) ?? new Date(event.date);
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section id={id} className="vl-section vl-linen-ground">
      <div
        className={
          hasImage
            ? "vl-container grid items-center gap-12 lg:grid-cols-12 lg:gap-14"
            : "vl-container"
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85 }}
          className={
            hasImage
              ? "vl-std-card lg:col-span-7"
              : "vl-std-card"
          }
        >
          <p className="vl-eyebrow mb-6" style={{ color: accent }}>
            Save the date
          </p>

          <p
            className="text-[11px] uppercase tracking-[0.35em] text-vl-muted"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {formatDate(event.date, "MMMM")}
          </p>

          <p
            className="mt-3 text-6xl leading-none tracking-tight sm:text-7xl"
            style={{ fontFamily: "var(--font-primary)", color: ink }}
          >
            {String(eventDate.getDate()).padStart(2, "0")}
          </p>

          <div
            className="mx-auto mt-6 h-px w-12"
            style={{ background: accent }}
          />

          <h2 className="vl-display-sm mt-6" style={{ color: ink }}>
            {data.title}
          </h2>

          <p className="vl-caption mt-4">
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </p>

          {data.description ? (
            <p className="vl-body mt-6 text-sm text-vl-muted">
              {data.description}
            </p>
          ) : null}
        </motion.div>

        {hasImage ? (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, delay: 0.08 }}
            className="lg:col-span-5"
          >
            <LinenMedia
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
