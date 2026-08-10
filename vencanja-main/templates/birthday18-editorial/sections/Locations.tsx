"use client";

import { FC, useMemo } from "react";
import { motion } from "framer-motion";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const card = data.cards?.[0];

  const dateLabel = useMemo(() => {
    const formatted = formatDate(event.date, "DD_DOT_MM_DOT_YYYY");
    return formatted || event.date;
  }, [event.date]);

  const mapsQuery =
    card?.location ||
    event.location?.address ||
    event.location?.name ||
    "";
  const mapsUrl = mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
    : null;

  const rows = [
    { key: "DATE", value: dateLabel },
    { key: "TIME", value: card?.time || "20:00" },
    {
      key: "LOCATION",
      value: event.location?.address || card?.title || "BEOGRAD",
    },
    {
      key: "DRESS CODE",
      value: card?.subtitle || "YOUR BEST LOOK",
    },
  ];

  return (
    <section id={id} className="ed-section overflow-hidden">
      <div className="ed-grain" aria-hidden />
      <div className="ed-shell relative z-10">
        <div className="max-w-3xl">
          <p className="ed-label mb-3">{data.subtitle || "THE DETAILS"}</p>
          <h2 className="ed-display text-4xl sm:text-5xl lg:text-6xl">
            {data.title}
          </h2>
          {data.description ? (
            <p className="mt-4 max-w-xl text-[var(--ed-muted)]">
              {data.description}
            </p>
          ) : null}
        </div>

        <div className="ed-about__rows">
          {rows.map((row, index) => (
            <motion.div
              key={row.key}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="ed-about__row"
            >
              <p className="ed-about__key">{row.key}</p>
              <p className="ed-about__val">{row.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ed-where"
        >
          <div className="ed-where__copy space-y-5">
            <p className="ed-where__eyebrow">WHERE</p>
            <p className="ed-where__city">
              {event.location?.address || "BEOGRAD"}
            </p>
            <div>
              <p className="ed-label mb-1">Venue</p>
              <p className="text-xl font-extrabold uppercase tracking-tight">
                {card?.title || event.location?.name || "Studio 18"}
              </p>
              <p className="mt-2 text-[var(--ed-muted)]">
                {card?.location || "Adresa će biti potvrđena"}
              </p>
            </div>
            <p className="ed-display text-3xl">{card?.time || "20:00"}</p>
            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ed-btn ed-btn--ghost"
              >
                Get directions
              </a>
            ) : null}
          </div>
          <div className="ed-where__media">
            {card?.image || data.imageUrl ? (
              <img
                src={card?.image || data.imageUrl}
                alt=""
                referrerPolicy="no-referrer"
              />
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;
