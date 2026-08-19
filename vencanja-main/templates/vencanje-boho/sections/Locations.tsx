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
    <section id={id} className="vb-section">
      <div className="vb-shell-wide">
        <div className="mb-12 text-center">
          <p className="vb-kicker">{data.subtitle ?? "Adrese"}</p>
          <h2 className="vb-script-sm mt-4">{data.title}</h2>
          <div className="vb-arch mt-6" />
        </div>

        <div className="vb-loc-grid mx-auto max-w-4xl">
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="vb-loc-card"
            >
              <p className="vb-kicker">{card.title}</p>
              {card.time ? (
                <p
                  className="mt-4 text-xl tracking-[0.06em]"
                  style={{
                    color: "var(--color-vb-clay)",
                    fontFamily: "var(--font-secondary)",
                    fontWeight: 500,
                  }}
                >
                  {card.time}
                </p>
              ) : null}
              {card.location ? (
                <h3 className="vb-display mt-5 text-[1.4rem]">
                  {card.location}
                </h3>
              ) : null}
              {card.text ? (
                <p className="vb-body mt-4 text-sm">{card.text}</p>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
