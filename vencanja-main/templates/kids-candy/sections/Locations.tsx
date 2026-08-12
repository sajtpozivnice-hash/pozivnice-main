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
    <section id={id} className="kcan-section">
      <div className="kcan-shell">
        <div className="mb-10 text-center">
          <p className="kcan-eyebrow mb-4">{name}</p>
          <h2 className="kcan-heading">{data.title}</h2>
          {data.subtitle ? (
            <p className="mt-3 text-black/55">{data.subtitle}</p>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kcan-stub"
        >
          <div className={`kcan-stub-photo ${image ? "" : "kcan-stub-photo--empty"}`}>
            {image ? (
              <img src={image} alt="" referrerPolicy="no-referrer" />
            ) : (
              <MapPin className="h-8 w-8" style={{ color: accent }} />
            )}
          </div>

          <div className="kcan-stub-info">
            {card?.title ? (
              <h3
                className="text-2xl sm:text-3xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {card.title}
              </h3>
            ) : null}
            {card?.subtitle ? (
              <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-black/45">
                {card.subtitle}
              </p>
            ) : null}
            {card?.text || data.description ? (
              <p className="mt-3 text-sm leading-relaxed text-black/55">
                {card?.text || data.description}
              </p>
            ) : null}

            <dl className="mt-4">
              {card?.location ? (
                <div className="kcan-stub-stat">
                  <dt>Lokacija</dt>
                  <dd className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" style={{ color: accent }} />
                    {card.location}
                  </dd>
                </div>
              ) : null}
              {card?.time ? (
                <div className="kcan-stub-stat">
                  <dt>Vreme</dt>
                  <dd>{card.time}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;
