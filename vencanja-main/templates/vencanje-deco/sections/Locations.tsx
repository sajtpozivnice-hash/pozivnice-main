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
    <section id={id} className="vd-section">
      <div className="vd-shell">
        <div className="mb-12 text-center">
          <p className="vd-eyebrow">{data.subtitle ?? "Adrese"}</p>
          <h2 className="vd-display mt-4">{data.title}</h2>
          <div className="vd-diamond mt-6" />
          {data.description ? (
            <p className="vd-body mx-auto mt-6 max-w-md">{data.description}</p>
          ) : null}
        </div>

        <div className="vd-loc-grid">
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="vd-loc-card"
            >
              <span className="vd-corner tl" aria-hidden />
              <span className="vd-corner tr" aria-hidden />
              <span className="vd-corner bl" aria-hidden />
              <span className="vd-corner br" aria-hidden />

              <p className="vd-eyebrow">{card.title}</p>
              {card.time ? (
                <p
                  className="mt-4 text-xl tracking-[0.12em]"
                  style={{
                    color: "var(--color-vd-gold)",
                    fontFamily: "var(--font-secondary)",
                    fontWeight: 500,
                  }}
                >
                  {card.time}
                </p>
              ) : null}
              {card.location ? (
                <h3 className="vd-display-sm mt-5">{card.location}</h3>
              ) : null}
              {card.text ? (
                <p className="vd-body mt-4 text-sm">{card.text}</p>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
