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
    <section id={id} className="vn-section">
      <div className="vn-shell">
        <div className="mb-12 text-center">
          <p className="vn-eyebrow">{data.subtitle ?? "Program"}</p>
          <h2 className="vn-display mt-4">{data.title}</h2>
          {data.description ? (
            <p className="vn-body mx-auto mt-5 max-w-md">{data.description}</p>
          ) : null}
        </div>

        <div className="mx-auto flex max-w-2xl flex-col gap-5">
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              className="vn-addr-card"
            >
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="vn-eyebrow">{card.title}</p>
                  {card.time ? (
                    <p className="vn-caption">{card.time}</p>
                  ) : null}
                </div>
                {card.location ? (
                  <h3 className="vn-display-sm mt-4">{card.location}</h3>
                ) : null}
                {card.text ? (
                  <p className="vn-body mt-4 max-w-lg">{card.text}</p>
                ) : null}
              </div>

              <div className="vn-addr-thumb">
                <Media
                  src={card.image}
                  alt={card.location ?? card.title ?? ""}
                  className="h-full w-full"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
