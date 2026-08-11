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
    const formatted = formatDate(event.date, "DD_MMMM_YYYY");
    return formatted ? formatted.toUpperCase() : event.date;
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
    { key: "DATUM", value: dateLabel },
    { key: "VREME", value: card?.time || "20:00" },
    {
      key: "LOKACIJA",
      value: (card?.subtitle || event.location?.address || "BEOGRAD").toUpperCase(),
    },
  ];

  return (
    <section id={id} className="bn-section overflow-hidden">
      <div className="bn-shell relative z-10">
        <div className="max-w-3xl">
          <p className="bn-label mb-4">{data.subtitle || "INFORMACIJE"}</p>
          <h2 className="bn-display text-4xl sm:text-5xl lg:text-6xl">
            {data.title || "DETALJI"}
          </h2>
          {data.description ? (
            <p className="mt-4 max-w-xl text-[color:var(--bn-muted)]">
              {data.description}
            </p>
          ) : null}
        </div>

        <div className="bn-details__grid">
          {rows.map((row, index) => (
            <motion.div
              key={row.key}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="bn-details__row"
            >
              <p className="bn-label">{row.key}</p>
              <p className="bn-details__val bn-mono">{row.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bn-where"
        >
          <div className="bn-where__copy space-y-5">
            <p className="bn-label">Gde</p>
            <p className="bn-where__city">
              {card?.subtitle || event.location?.address || "BEOGRAD"}
            </p>
            <div>
              <p className="bn-label mb-2">Mesto</p>
              <p className="bn-display text-2xl sm:text-3xl">
                {card?.title || event.location?.name || "Skyline Club"}
              </p>
              <p className="mt-2 text-[color:var(--bn-muted)]">
                {card?.location || "Adresa će biti potvrđena"}
              </p>
            </div>
            <p className="bn-display text-3xl bn-mono">{card?.time || "20:00"}</p>
            {card?.text ? (
              <p className="text-sm text-[color:var(--bn-muted)]">{card.text}</p>
            ) : null}
            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bn-btn bn-btn--ghost"
              >
                Uputstva
              </a>
            ) : null}
          </div>
          <div className="bn-where__media">
            {card?.image ? (
              <img src={card.image} alt="" referrerPolicy="no-referrer" />
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;
