"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section, theme }) => {
  const { data, id, name } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#FF5C8A";
  const card = data.cards?.[0];
  const image = card?.image || data.imageUrl;

  return (
    <section id={id} className="bday-section">
      <div className="bday-shell">
        <div className="mb-10 text-center">
          <p className="bday-eyebrow mb-4">{name}</p>
          <h2 className="bday-heading">{data.title}</h2>
          {data.subtitle ? (
            <p className="mt-3 text-black/55">{data.subtitle}</p>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bday-map mx-auto max-w-3xl"
        >
          <div className="bday-map-media">
            {image ? (
              <img src={image} alt="" referrerPolicy="no-referrer" />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(140deg, ${accent}, #3D8BFF)`,
                }}
              />
            )}
            <span className="bday-map-pin" style={{ background: accent }}>
              <MapPin className="h-5 w-5 text-white" />
            </span>
          </div>

          <div className="bday-map-body">
            {card?.title ? (
              <h3
                className="text-2xl sm:text-3xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {card.title}
              </h3>
            ) : null}
            {card?.subtitle ? (
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-black/45">
                {card.subtitle}
              </p>
            ) : null}

            <div className="bday-chip-row">
              {card?.time ? (
                <span className="bday-chip">
                  <Clock className="h-3.5 w-3.5" style={{ color: accent }} />
                  {card.time}
                </span>
              ) : null}
              {card?.location ? (
                <span className="bday-chip">
                  <MapPin className="h-3.5 w-3.5" style={{ color: accent }} />
                  {card.location}
                </span>
              ) : null}
            </div>

            {card?.text || data.description ? (
              <p className="mt-5 text-sm leading-relaxed text-black/55">
                {card?.text || data.description}
              </p>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;
