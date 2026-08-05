"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
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
          className="bday-card-strong grid overflow-hidden lg:grid-cols-2"
        >
          <div className="relative min-h-[260px] sm:min-h-[320px]">
            {image ? (
              <img
                src={image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(140deg, ${accent}, #3D8BFF)`,
                }}
              />
            )}
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10">
            {card?.title ? (
              <h3
                className="text-3xl sm:text-4xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {card.title}
              </h3>
            ) : null}
            {card?.subtitle ? (
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-black/45">
                {card.subtitle}
              </p>
            ) : null}
            {card?.location ? (
              <p className="mt-5 flex items-start gap-2 text-base text-black/70">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0" style={{ color: accent }} />
                {card.location}
              </p>
            ) : null}
            {card?.time ? (
              <p className="mt-3 text-sm font-semibold" style={{ color: accent }}>
                {card.time}
              </p>
            ) : null}
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
