"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const cards = data.cards ?? [];

  return (
    <section id={id} className="kd-section bg-kd-sand">
      <div className="kd-glow top-10 right-10 h-64 w-64" />

      <div className="kd-container-narrow">
        <div className="mb-14 text-center">
          <p className="kd-eyebrow mb-4">Gde se nalazimo</p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kd-heading"
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="kd-subheading">{data.subtitle}</p>
          ) : null}
        </div>

        {/* Night venue rack — vertical glowing panels, like votives lit along a chapel aisle */}
        <div className="kd-venue-list">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="kd-venue-row"
            >
              <span className="kd-venue-flame">
                <Flame className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3
                    className="text-2xl text-kd-ink sm:text-3xl"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {card.title}
                  </h3>
                  <span className="text-xs uppercase tracking-[0.28em] text-kd-champagne">
                    {card.time}
                  </span>
                </div>
                {card.location ? (
                  <p className="mt-2 text-sm font-medium text-kd-ink-soft">
                    {card.location}
                  </p>
                ) : null}
                {card.text ? (
                  <p className="mt-2 text-sm leading-relaxed text-kd-muted">
                    {card.text}
                  </p>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
