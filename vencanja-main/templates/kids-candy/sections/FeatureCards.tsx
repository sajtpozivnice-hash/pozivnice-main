"use client";

import { CSSProperties, FC } from "react";
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
    <section id={id} className="kcan-section">
      <div className="kcan-shell">
        <div className="mb-10 max-w-2xl">
          <p className="kcan-eyebrow mb-4">{name}</p>
          <h2 className="kcan-heading">{data.title}</h2>
          {data.subtitle ? (
            <p className="mt-2 text-lg font-medium text-black/70">
              {data.subtitle}
            </p>
          ) : null}
          {data.description ? (
            <p className="mt-3 text-black/55">{data.description}</p>
          ) : null}
        </div>

        <div className="kcan-sheet">
          {cards.map((card, index) => {
            const Icon = resolveFeatureIcon(card.icon);
            const color = card.accent || accent;
            const tilt = [-3, 2, -2, 3, -1.5][index % 5];

            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="kcan-sheet-card"
                style={{ "--tilt": `${tilt}deg` } as CSSProperties}
              >
                <span
                  className="kcan-number-tag kcan-sheet-tag"
                  style={{ background: color }}
                >
                  {index + 1}
                </span>

                {card.image ? (
                  <div className="kcan-sheet-photo">
                    <img src={card.image} alt="" referrerPolicy="no-referrer" />
                  </div>
                ) : null}

                <div className="kcan-sheet-body">
                  <span className="kcan-sheet-dot" style={{ background: color }}>
                    <Icon className="h-4 w-4 text-white" />
                  </span>
                  <h3
                    className="text-lg font-extrabold leading-tight"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {card.title}
                  </h3>
                  {card.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-kcan-ink/60">
                      {card.description}
                    </p>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
