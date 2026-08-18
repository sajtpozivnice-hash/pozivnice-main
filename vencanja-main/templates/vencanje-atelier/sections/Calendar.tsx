"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate, parseDate } from "@/helpers/formatDate";
import { Media } from "../components/Media";

type Props = {
  section: CalendarSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Calendar: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const eventDate = parseDate(event.date) ?? new Date(event.date);
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section id={id} className="va-section bg-va-paper">
      <div
        className={
          hasImage
            ? "va-shell grid items-center gap-10 lg:grid-cols-12 lg:gap-12"
            : "va-shell"
        }
      >
        <div className={hasImage ? "lg:col-span-6" : undefined}>
          <p className="va-eyebrow mb-6">{data.title ?? "Datum"}</p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8 }}
          >
            <span className="va-month">{formatDate(event.date, "MMMM")}</span>
            <span className="va-day mt-2">
              {String(eventDate.getDate()).padStart(2, "0")}
            </span>
            <p className="va-caption mt-6">
              {formatDate(event.date, "DAY_D_MMMM_YYYY")}
            </p>
            {data.description ? (
              <p className="va-body mt-5 max-w-md text-va-muted">
                {data.description}
              </p>
            ) : null}
          </motion.div>
        </div>

        {hasImage ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="lg:col-span-6"
          >
            <Media
              src={data.imageUrl}
              alt={data.title ?? "Kalendar"}
              className="aspect-[5/4] w-full lg:aspect-[4/5]"
            />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default Calendar;
