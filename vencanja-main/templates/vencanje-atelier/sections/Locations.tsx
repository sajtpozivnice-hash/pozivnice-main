"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { Media } from "../components/Media";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const cards = data.cards ?? [];

  return (
    <section id={id} className="va-section">
      <div className="va-shell">
        <div className="mb-10 max-w-xl">
          <p className="va-eyebrow">Lokacije</p>
          <h2 className="va-display mt-4">{data.title}</h2>
          {data.subtitle ? (
            <p className="va-caption mt-3">{data.subtitle}</p>
          ) : null}
        </div>

        <div className="grid gap-10 sm:gap-12 lg:grid-cols-2">
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.06 }}
            >
              {card.image ? (
                <Media
                  src={card.image}
                  alt={card.title ?? ""}
                  className="aspect-[5/4] w-full"
                />
              ) : null}

              <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="va-loc-title">{card.title}</h3>
                {card.time ? (
                  <span className="va-caption normal-case tracking-[0.12em]">
                    {card.time}
                  </span>
                ) : null}
              </div>

              {card.location ? (
                <p className="va-body mt-3 font-medium text-va-ink">
                  {card.location}
                </p>
              ) : null}
              {card.text ? (
                <p className="va-body mt-2 text-va-muted">{card.text}</p>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
