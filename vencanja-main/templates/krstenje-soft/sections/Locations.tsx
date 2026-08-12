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
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value;
  const ink = theme.colors?.base?.secondary?.value;
  const cards = data.cards ?? [];

  return (
    <section id={id} className="ks-section bg-ks-ivory">
      <div className="ks-wash -top-24 -left-20 h-72 w-72 bg-ks-champagne-soft/30" />
      <div className="ks-wash -bottom-16 -right-16 h-64 w-64 bg-ks-sand" />

      <div className="ks-container">
        <div className="mb-14 text-center">
          <p className="ks-script mb-2">Gde se nalazimo</p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="ks-heading"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="ks-subheading mx-auto max-w-xl">{data.subtitle}</p>
          ) : null}
        </div>

        {/* Floating soft photo + gentle meta, alternating sides */}
        <div className="ks-float-rows">
          {cards.map((card, index) => {
            const isReversed = index % 2 === 1;
            const photo = card.image || data.imageUrl;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className={`ks-float-row ${
                  isReversed ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div
                  className="ks-float-photo"
                  style={{
                    transform: `rotate(${isReversed ? "3deg" : "-3deg"})`,
                  }}
                >
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo} alt={card.title || ""} />
                  ) : (
                    <div className="ks-float-photo-fallback">
                      <MapPin className="h-8 w-8" />
                    </div>
                  )}
                </div>

                <div className="ks-float-meta">
                  <p
                    className="ks-script text-2xl sm:text-3xl"
                    style={{ color: accent }}
                  >
                    {card.time}
                  </p>
                  <h3
                    className="mt-1 text-2xl sm:text-3xl"
                    style={{ fontFamily: "var(--font-primary)", color: ink }}
                  >
                    {card.title}
                  </h3>
                  {card.location ? (
                    <p className="mt-3 text-sm font-medium text-ks-ink-soft">
                      {card.location}
                    </p>
                  ) : null}
                  {card.text ? (
                    <p className="mt-3 text-sm leading-relaxed text-ks-muted">
                      {card.text}
                    </p>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Locations;
