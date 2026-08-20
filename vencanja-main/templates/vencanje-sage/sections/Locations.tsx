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
  const accent = theme.colors?.base?.primary?.value ?? "#6b7f6a";
  const ink = theme.colors?.base?.secondary?.value ?? "#2c2a26";
  const cards = data.cards ?? [];

  return (
    <section id={id} className="vs-section bg-vs-linen">
      <div className="vs-container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vs-eyebrow mb-6"
            style={{ color: accent }}
          >
            Mesta
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vs-display"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="vs-body mx-auto mt-5 max-w-md text-vs-muted">
              {data.subtitle}
            </p>
          ) : null}
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 md:gap-10">
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              className="border-t border-vs-line pt-8 text-center"
            >
              <p
                className="text-[13px] uppercase tracking-[0.32em] sm:text-sm"
                style={{ color: accent }}
              >
                {card.time}
              </p>
              <h3
                className="mt-4 text-3xl sm:text-[2.75rem]"
                style={{ fontFamily: "var(--font-primary)", color: ink }}
              >
                {card.title}
              </h3>
              {card.location ? (
                <p className="mt-3 text-base uppercase tracking-[0.14em] text-vs-ink-soft">
                  {card.location}
                </p>
              ) : null}
              {card.text ? (
                <p className="vs-body mx-auto mt-5 max-w-sm text-vs-muted">
                  {card.text}
                </p>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
