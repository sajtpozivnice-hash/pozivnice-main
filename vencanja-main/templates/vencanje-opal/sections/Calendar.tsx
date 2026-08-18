"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { generateCalendar } from "@/helpers/generateCalendar";
import { OpalMedia } from "../components/Media";

type Props = {
  section: CalendarSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Calendar: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { date } = event;
  const accent = theme.colors?.base?.primary?.value ?? "#C9A9A0";
  const ink = theme.colors?.base?.secondary?.value ?? "#3A3532";
  const calendar = generateCalendar(new Date(date));

  return (
    <section id={id} className="vo-section bg-vo-pearl-deep">
      <div className="vo-container grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vo-eyebrow mb-4"
            style={{ color: accent }}
          >
            Kalendar
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vo-display mb-10"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[1.75rem] border-2 bg-vo-pearl px-4 py-8 shadow-[0_16px_40px_-24px_rgba(58,53,50,0.2)] sm:px-8"
            style={{ borderColor: "rgba(232, 213, 208, 0.95)" }}
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
                  className="text-center text-[10px] uppercase tracking-[0.18em] text-vo-muted"
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
                      day.isEventDay
                        ? "font-semibold text-vo-pearl"
                        : "text-vo-charcoal"
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
          <OpalMedia
            src={data.imageUrl}
            alt={data.title || "Kalendar"}
            className="aspect-[5/6] w-full rounded-[2rem]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Calendar;
