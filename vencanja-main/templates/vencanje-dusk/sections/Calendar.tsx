"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { generateCalendar } from "@/helpers/generateCalendar";
import Media from "../components/Media";

type Props = {
  section: CalendarSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const WEEKDAYS = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];

/** Copper outlined plaque: engraved date first, quiet month grid underneath. */
const Calendar: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const eventDate = new Date(event.date);
  const calendar = generateCalendar(eventDate);
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section id={id} className="vd-section">
      <div className={hasImage ? "vd-shell" : "vd-shell--narrow"}>
        <div className="mb-9 text-center">
          <p className="vd-eyebrow">Kalendar</p>
          <h2 className="vd-title mt-3">{data.title}</h2>
          {data.description ? (
            <p className="vd-body mt-4">{data.description}</p>
          ) : null}
        </div>

        <div className={hasImage ? "vd-split" : undefined}>
          {hasImage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Media src={data.imageUrl} className="vd-split__still" />
            </motion.div>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: hasImage ? 0.08 : 0 }}
            className="vd-plaque"
          >
            <div className="vd-plaque__date">
              <span className="vd-plaque__day">
                {String(eventDate.getDate()).padStart(2, "0")}
              </span>
              <span className="vd-plaque__month">
                {formatDate(event.date, "MMMM")} {eventDate.getFullYear()}
              </span>
            </div>

            <p className="vd-eyebrow vd-eyebrow--muted mt-4 text-center">
              {formatDate(event.date, "DAY_D_MMMM_YYYY")}
            </p>

            <div className="vd-rule mx-auto my-8" />

            <div className="vd-grid7">
              {WEEKDAYS.map((day) => (
                <div key={day} className="vd-grid7__head">
                  {day}
                </div>
              ))}
            </div>

            <div className="vd-grid7">
              {calendar.map((day, index) => (
                <div
                  key={`${day.date.toISOString()}-${index}`}
                  className={`vd-grid7__day ${
                    day.currentMonth ? "" : "is-outside"
                  } ${day.isEventDay ? "is-event" : ""}`}
                >
                  <span>{day.day}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
