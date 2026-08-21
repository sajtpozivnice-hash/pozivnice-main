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
  const accent = theme.colors?.base?.primary?.value ?? "#C1801F";
  const cards = data.cards ?? [];

  return (
    <section id={id} className="ksaf-section">
      <div className="ksaf-shell">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="ksaf-eyebrow mb-4">{name}</p>
          <h2 className="ksaf-heading">{data.title}</h2>
          {data.subtitle ? (
            <p className="mt-2 text-lg font-medium text-black/70">
              {data.subtitle}
            </p>
          ) : null}
          {data.description ? (
            <p className="mt-3 text-black/55">{data.description}</p>
          ) : null}
        </div>

        <div className="ksaf-journal">
          {cards.map((card, index) => {
            const Icon = resolveFeatureIcon(card.icon);
            const color = card.accent || accent;

            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="ksaf-journal-card"
              >
                <div
                  className={`ksaf-journal-photo ${
                    card.image ? "" : "ksaf-journal-photo--empty"
                  }`}
                >
                  {card.image ? (
                    <img src={card.image} alt="" referrerPolicy="no-referrer" />
                  ) : (
                    <Icon className="h-8 w-8" style={{ color }} />
                  )}
                </div>
                <span className="ksaf-journal-icon">
                  <Icon className="h-4 w-4" />
                </span>
                <h3
                  className="text-xl leading-tight"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {card.title}
                </h3>
                {card.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-ksaf-ink/60">
                    {card.description}
                  </p>
                ) : null}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
