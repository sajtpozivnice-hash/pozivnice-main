"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FeatureCardsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { resolveFeatureIcon } from "../iconMap";

type Props = {
  section: FeatureCardsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const FeatureCards: FC<Props> = ({ section, theme }) => {
  const { data, id, name } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#FF5C8A";
  const cards = data.cards ?? [];

  return (
    <section id={id} className="kpas-section">
      <div className="kpas-shell">
        <div className="mb-10 max-w-2xl">
          <p className="kpas-eyebrow mb-4">{name}</p>
          <h2 className="kpas-heading">{data.title}</h2>
          {data.subtitle ? (
            <p className="mt-2 text-lg font-medium text-black/70">
              {data.subtitle}
            </p>
          ) : null}
          {data.description ? (
            <p className="mt-3 text-black/55">{data.description}</p>
          ) : null}
        </div>

        <div className="kpas-spread">
          {cards.map((card, index) => {
            const Icon = resolveFeatureIcon(card.icon);
            const color = card.accent || accent;
            const reverse = index % 2 === 1;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`kpas-spread-row ${reverse ? "is-reverse" : ""}`}
              >
                <div
                  className={`kpas-spread-media ${
                    card.image ? "" : "kpas-spread-media--empty"
                  }`}
                >
                  {card.image ? (
                    <img src={card.image} alt="" referrerPolicy="no-referrer" />
                  ) : (
                    <Icon className="h-10 w-10" style={{ color }} />
                  )}
                </div>

                <div className="kpas-spread-copy">
                  <span
                    className="kpas-seal"
                    style={{ borderColor: color, color }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {card.title}
                  </h3>
                  {card.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-black/55">
                      {card.description}
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

export default FeatureCards;
