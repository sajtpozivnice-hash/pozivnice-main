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

  const mapsUrl = card?.location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.location)}`
    : null;

  return (
    <section id={id} className="b18-section overflow-hidden">
      {data.imageUrl ? (
        <div className="pointer-events-none absolute inset-0 opacity-[0.22]">
          <img
            src={data.imageUrl}
            alt=""
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050506] via-[#050506]/75 to-[#050506]" />
        </div>
      ) : null}

      <div className="b18-shell relative z-10">
        <div className="mb-12 max-w-2xl">
          <p className="b18-eyebrow mb-4">{data.subtitle}</p>
          <h2 className="b18-heading">{data.title}</h2>
          {data.description ? (
            <p className="mt-4 text-white/55">{data.description}</p>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18-panel grid overflow-hidden lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="space-y-8 p-7 sm:p-10">
            <div>
              <p className="b18-eyebrow mb-2">Datum</p>
              <p
                className="text-2xl font-bold tracking-wide sm:text-3xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {dateLabel}
              </p>
            </div>
            <div>
              <p className="b18-eyebrow mb-2">Vreme</p>
              <p
                className="text-2xl font-bold tracking-wide sm:text-3xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {card?.time || "20:00"}
              </p>
            </div>
            <div>
              <p className="b18-eyebrow mb-2">Lokacija</p>
              <p
                className="text-2xl font-bold tracking-wide uppercase sm:text-3xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {card?.title || event.location?.name || "Lokacija"}
              </p>
              <p className="mt-2 flex items-start gap-2 text-white/55">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {card?.location ||
                    event.location?.address ||
                    "Adresa će biti potvrđena"}
                </span>
              </p>
              {card?.text ? (
                <p className="mt-3 text-sm text-white/45">{card.text}</p>
              ) : null}
            </div>

            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="b18-btn-ghost"
              >
                Kako stići
              </a>
            ) : null}
          </div>

          <div className="relative min-h-[260px] lg:min-h-full">
            {card?.image || data.imageUrl ? (
              <img
                src={card?.image || data.imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="absolute inset-0 bg-white/5" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-l" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;
