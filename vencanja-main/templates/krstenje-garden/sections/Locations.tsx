"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
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
    <section id={id} className="kg-section bg-kg-sand">
      <div className="kg-container">
        <div className="mb-14 text-center">
          <div className="kg-eyebrow justify-center">
            <Leaf className="h-3.5 w-3.5" />
            Gde se nalazimo
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kg-heading mt-4"
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="kg-subheading">{data.subtitle}</p>
          ) : null}
        </div>

        {/* Split nature map: botanical route on the left, image panel on the right */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
          <div className="kg-map-path">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="kg-map-stop"
              >
                <span className="kg-map-node">
                  <Leaf className="h-3.5 w-3.5" />
                </span>
                <p className="text-xs uppercase tracking-[0.28em] text-kg-champagne">
                  {card.time}
                </p>
                <h3
                  className="mt-1 text-2xl text-kg-ink sm:text-3xl"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {card.title}
                </h3>
                {card.location ? (
                  <p className="mt-2 text-sm font-medium text-kg-ink-soft">
                    {card.location}
                  </p>
                ) : null}
                {card.text ? (
                  <p className="mt-2 text-sm leading-relaxed text-kg-muted">
                    {card.text}
                  </p>
                ) : null}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="kg-map-panel"
          >
            {data.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.imageUrl} alt={data.title} />
            ) : (
              <div className="kg-map-panel-fallback">
                <Leaf className="h-10 w-10" />
                <p className="mt-3 text-xs uppercase tracking-[0.3em]">
                  Put do proslave
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
