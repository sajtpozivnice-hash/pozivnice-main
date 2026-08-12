"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const ink = theme.colors?.base?.secondary?.value;
  const cards = data.cards ?? [];

  return (
    <section id={id} className="km-section bg-white">
      <div className="km-container">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="km-eyebrow mb-4"
            >
              Gde se nalazimo
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="km-heading"
              style={{ color: ink }}
            >
              {data.title}
            </motion.h2>
          </div>
          {data.subtitle ? (
            <p className="max-w-xs text-sm text-km-muted sm:text-right">
              {data.subtitle}
            </p>
          ) : null}
        </div>

        {/* Typographic address poster — big index numerals, no cards, no photos */}
        <div className="km-poster-list">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="km-poster-row"
            >
              <span className="km-poster-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3
                    className="km-poster-title"
                    style={{ color: ink }}
                  >
                    {card.title}
                  </h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-km-champagne">
                    {card.time}
                  </span>
                </div>
                {card.location ? (
                  <p className="mt-2 text-sm uppercase tracking-[0.15em] text-km-ink-soft">
                    {card.location}
                  </p>
                ) : null}
                {card.text ? (
                  <p className="mt-2 max-w-md text-sm text-km-muted">
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
