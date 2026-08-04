"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { generateCalendar } from "@/helpers/generateCalendar";
import { PremiumMedia } from "../components/PremiumMedia";

type Props = {
  section: CalendarSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Calendar: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { date } = event;
  const accent = theme.colors?.base?.primary?.value ?? "#9c7a45";
  const ink = theme.colors?.base?.secondary?.value ?? "#1c1917";
  const calendar = generateCalendar(new Date(date));

  return (
    <section id={id} className="vp-section bg-vp-paper">
      <div className="vp-container grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vp-eyebrow mb-4"
            style={{ color: accent }}
          >
            Calendar
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vp-display mb-10"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-vp-line bg-vp-ivory px-4 py-8 sm:px-8"
          >
            <p
              className="mb-8 text-center text-2xl capitalize sm:text-3xl"
              style={{ fontFamily: "var(--font-primary)", color: accent }}
            >
              {formatDate(date, "MMMM")}
            </p>

            <div className="mb-3 grid grid-cols-7 gap-1">
              {["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"].map((day) => (
                <div
                  key={day}
                  className="text-center text-[10px] uppercase tracking-[0.18em] text-vp-muted"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendar.map((day, index) => (
                <div
                  key={`${day.date.toISOString()}-${index}`}
                  className={`relative flex h-10 items-center justify-center text-sm sm:h-11 ${
                    day.currentMonth ? "" : "opacity-25"
                  }`}
                >
                  {day.isEventDay ? (
                    <span
                      className="absolute inset-1 rounded-full"
                      style={{ background: ink }}
                    />
                  ) : null}
                  <span
                    className={`relative z-10 ${
                      day.isEventDay ? "font-semibold text-white" : "text-vp-ink"
                    }`}
                  >
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2 lg:col-span-6"
        >
          <PremiumMedia
            src={data.imageUrl}
            alt={data.title || "Calendar"}
            className="aspect-[5/6] w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Calendar;
