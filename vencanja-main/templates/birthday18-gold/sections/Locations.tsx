"use client";

import { FC, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
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

  return (
    <section id={id} className="gala-section overflow-hidden">
      <div className="gala-shell relative z-10">
        <div className="mb-10 max-w-2xl">
          <p className="gala-kicker mb-3">Kada &amp; gde</p>
          <h2 className="gala-display text-4xl sm:text-5xl">
            {data.title || "Detalji večeri"}
          </h2>
          {data.description ? (
            <p className="mt-4 text-[var(--gala-muted)]">{data.description}</p>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gala-loc-card"
        >
          <div className="gala-loc-cols">
            <div className="gala-loc-col">
              <p className="gala-loc-col__label">Datum</p>
              <p className="gala-loc-col__value">{dateLabel}</p>
            </div>
            <div className="gala-loc-col">
              <p className="gala-loc-col__label">Vreme</p>
              <p className="gala-loc-col__value">{card?.time || "20:00"}</p>
            </div>
            <div className="gala-loc-col">
              <p className="gala-loc-col__label">Mesto</p>
              <p className="gala-loc-col__value">
                {card?.title || event.location?.name || "Lokacija"}
              </p>
            </div>
          </div>

          <div className="gala-loc-footer">
            {card?.image ? (
              <div className="gala-loc-medallion">
                <img src={card.image} alt="" referrerPolicy="no-referrer" />
              </div>
            ) : null}
            <div className="gala-loc-address">
              <p className="flex items-start gap-2 text-[var(--gala-muted)]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gala-gold)]" />
                <span>
                  {card?.location ||
                    event.location?.address ||
                    "Adresa će biti potvrđena"}
                </span>
              </p>
              {card?.text ? (
                <p className="mt-2 text-sm text-[var(--gala-muted)]">
                  {card.text}
                </p>
              ) : null}
              {mapsUrl ? (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gala-btn mt-4"
                >
                  Kako stići
                </a>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;
