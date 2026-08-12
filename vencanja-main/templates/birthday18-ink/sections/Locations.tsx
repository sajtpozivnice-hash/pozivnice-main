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
    card?.location || event.location?.address || event.location?.name || "";
  const mapsUrl = mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
    : null;

  return (
    <section id={id} className="b18i-section">
      <div className="b18i-shell">
        <p className="b18i-eyebrow mb-3">Rubrika</p>
        <h2 className="b18i-display mb-8 text-3xl sm:text-4xl">
          {data.title || "Kada & gde"}
        </h2>

        <div className="b18i-classified">
          <div className="b18i-classified__grid">
            {[
              { label: "Datum", value: dateLabel },
              { label: "Vreme", value: card?.time || "20:00" },
              {
                label: "Lokacija",
                value: card?.title || event.location?.name || "Beograd",
              },
            ].map((item) => (
              <div key={item.label} className="b18i-classified__item">
                <p className="b18i-eyebrow">{item.label}</p>
                <p className="b18i-display mt-1 text-xl">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18i-loc__panel"
        >
          <div className="b18i-loc__media">
            {card?.image ? (
              <img src={card.image} alt="" referrerPolicy="no-referrer" />
            ) : null}
          </div>
          <div className="flex flex-col justify-center gap-5">
            <div>
              <p className="b18i-eyebrow mb-2">Adresa</p>
              <p className="flex items-start gap-2 text-lg">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--ink-red)]" />
                <span>
                  {card?.location ||
                    event.location?.address ||
                    "Adresa će biti potvrđena"}
                </span>
              </p>
            </div>
            {card?.text ? (
              <p className="text-[var(--ink-muted)]">{card.text}</p>
            ) : null}
            {mapsUrl ? (
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="b18i-btn-ghost">
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
