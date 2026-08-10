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
    <section id={id} className="b18b-section overflow-hidden">
      <div className="b18b-shell relative z-10 space-y-14">
        <div>
          <div className="mb-10 max-w-2xl">
            <p className="b18b-eyebrow mb-3">Info</p>
            <h2 className="b18b-heading">{data.title || "KADA & GDE"}</h2>
            {data.description ? (
              <p className="mt-4 text-[var(--b18b-muted)]">{data.description}</p>
            ) : null}
          </div>

          <div className="b18b-info-grid">
            {[
              { label: "DATUM", value: dateLabel },
              { label: "VREME", value: card?.time || "20:00" },
              {
                label: "LOKACIJA",
                value: card?.title || event.location?.name || "BEOGRAD",
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="b18b-info-card"
              >
                <p className="b18b-info-label">{item.label}</p>
                <p className="b18b-info-value">{item.value}</p>
              </motion.div>
            ))}
          </div>

          {mapsUrl ? (
            <div className="mt-8">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="b18b-btn-ghost"
              >
                Prikaži lokaciju
              </a>
            </div>
          ) : null}
        </div>

        <div>
          <div className="mb-8 max-w-2xl">
            <p className="b18b-eyebrow mb-3">Lokacija</p>
            <h3
              className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              Kako stići
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="b18b-location-panel"
          >
            <div className="b18b-location-copy space-y-6">
              <div>
                <p className="b18b-eyebrow mb-2">Mesto</p>
                <p
                  className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {card?.title || event.location?.name || "Lokacija"}
                </p>
              </div>
              <div>
                <p className="b18b-eyebrow mb-2">Adresa</p>
                <p className="flex items-start gap-2 text-[var(--b18b-muted)]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--b18b-coral)]" />
                  <span>
                    {card?.location ||
                      event.location?.address ||
                      "Adresa će biti potvrđena"}
                  </span>
                </p>
              </div>
              <div>
                <p className="b18b-eyebrow mb-2">Vreme</p>
                <p
                  className="text-2xl font-extrabold"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {card?.time || "20:00"}
                </p>
              </div>
              {card?.text ? (
                <p className="text-sm text-[var(--b18b-muted)]">{card.text}</p>
              ) : null}
              {mapsUrl ? (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="b18b-btn"
                >
                  Kako stići
                </a>
              ) : null}
            </div>

            <div className="b18b-location-media">
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
      </div>
    </section>
  );
};

export default Locations;
