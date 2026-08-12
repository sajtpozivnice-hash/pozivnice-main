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
    <section id={id} className="b18c-band b18c-band--sand">
      <div className="b18c-shell">
        <p className="b18c-kicker mb-3">Informacije</p>
        <h2 className="b18c-display mb-10 text-3xl sm:text-4xl">
          {data.title || "Kada i gde"}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18c-loc"
        >
          <div className="b18c-loc__media">
            {card?.image ? (
              <img src={card.image} alt="" referrerPolicy="no-referrer" />
            ) : null}
          </div>
          <div className="b18c-loc__copy">
            <div>
              <p className="b18c-kicker mb-1">Datum</p>
              <p className="b18c-display text-xl">{dateLabel || event.date}</p>
            </div>
            <div>
              <p className="b18c-kicker mb-1">Vreme</p>
              <p className="b18c-display text-xl">{card?.time || "17:00"}</p>
            </div>
            <div>
              <p className="b18c-kicker mb-1">Mesto</p>
              <p className="flex items-start gap-2 text-[var(--coast-ink)]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--coast-sea)]" />
                <span>
                  {card?.location ||
                    event.location?.address ||
                    "Adresa će biti potvrđena"}
                </span>
              </p>
            </div>
            {card?.text ? (
              <p className="text-sm text-[var(--coast-muted)]">{card.text}</p>
            ) : null}
            {mapsUrl ? (
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="b18c-btn-ghost self-start">
                Kako stići
              </a>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;
