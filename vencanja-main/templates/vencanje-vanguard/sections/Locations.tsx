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

const Locations: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const cards = data.cards ?? [];

  return (
    <section id={id} className="vg-section">
      <div className="vg-shell">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="vg-kicker">{data.subtitle ?? "Mesta"}</p>
            <h2 className="vg-display mt-3">{data.title}</h2>
          </div>
          {data.description ? (
            <p className="vg-body max-w-sm sm:text-right">{data.description}</p>
          ) : null}
        </div>

        {cards.map((card, index) => (
          <motion.article
            key={card.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: index * 0.07 }}
            className="vg-loc"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="vg-meta">
                {String(index + 1).padStart(2, "0")} / {card.title}
              </p>
              {card.time ? <p className="vg-loc-time">{card.time}</p> : null}
            </div>
            {card.location ? (
              <h3 className="vg-loc-title mt-5">{card.location}</h3>
            ) : null}
            {card.text ? (
              <p className="vg-body mt-4 max-w-xl">{card.text}</p>
            ) : null}
          </motion.article>
        ))}

        <div className="border-t border-[var(--color-vg-ink)]" />
      </div>
    </section>
  );
};

export default Locations;
