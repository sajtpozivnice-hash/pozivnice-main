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

/** Lookbook hang tag: top plate photo + stacked info rows, not the coast mirrored media split. */
const Locations: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const card = data.cards?.[0];

  const dateLabel = useMemo(
    () => formatDate(event.date, "DD_MMMM_YYYY"),
    [event.date],
  );

  const mapsQuery =
    card?.location || event.location?.address || event.location?.name || "";
  const mapsUrl = mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
    : null;

  return (
    <section id={id} className="b18a-section">
      <div className="b18a-shell max-w-2xl">
        <p className="b18a-label mb-3">Informacije</p>
        <h2 className="b18a-display mb-10 text-2xl sm:text-3xl">
          {data.title || "Mesto i vreme"}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18a-tag"
        >
          {card?.image ? (
            <div className="b18a-tag__media">
              <img src={card.image} alt="" referrerPolicy="no-referrer" />
            </div>
          ) : null}
          <div className="b18a-tag__rows">
            <div className="b18a-tag__row">
              <span className="b18a-muted-label">Datum</span>
              <span className="b18a-display">{dateLabel || event.date}</span>
            </div>
            <div className="b18a-tag__row">
              <span className="b18a-muted-label">Vreme</span>
              <span className="b18a-display">{card?.time || "20:00"}</span>
            </div>
            <div className="b18a-tag__row">
              <span className="b18a-muted-label">Mesto</span>
              <span className="b18a-display">
                {card?.title || event.location?.name || "Lokacija"}
              </span>
            </div>
          </div>
          <div className="b18a-tag__footer">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--atelier-rust)]" />
              <span>
                {card?.location ||
                  event.location?.address ||
                  "Adresa će biti potvrđena"}
              </span>
            </p>
            {card?.text ? (
              <p className="mt-2 text-sm text-[var(--atelier-muted)]">
                {card.text}
              </p>
            ) : null}
            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="b18a-link mt-4"
              >
                Kako stići →
              </a>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;
