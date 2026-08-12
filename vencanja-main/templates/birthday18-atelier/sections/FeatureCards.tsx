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

/** Pinned board: angled polaroid frames scattered on a board, not a single image+text note card. */
const FeatureCards: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const cards = data.cards?.length ? data.cards : [{ id: "note", title: data.title }];
  const rotations = [-6, 4, -3, 7, -8, 3];

  return (
    <section id={id} className="b18a-section">
      <div className="b18a-shell max-w-3xl">
        <p className="b18a-label mb-3">{data.subtitle || "Styling note"}</p>
        <h2 className="b18a-display mb-3 text-2xl sm:text-3xl">{data.title}</h2>
        {data.description ? (
          <p className="mb-8 max-w-xl text-[var(--atelier-muted)]">
            {data.description}
          </p>
        ) : null}

        <div className="b18a-board">
          {cards.map((card, index) => {
            const Icon = resolveFeatureIcon(card.icon);
            const accent =
              card.accent || theme.colors?.base?.primary?.value || "var(--atelier-rust)";
            return (
              <motion.figure
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="b18a-polaroid"
                style={
                  {
                    "--rotate": `${rotations[index % rotations.length]}deg`,
                  } as CSSProperties
                }
              >
                <span className="b18a-polaroid__pin" aria-hidden />
                <div className="b18a-polaroid__media">
                  {card.image ? (
                    <img src={card.image} alt="" referrerPolicy="no-referrer" />
                  ) : (
                    <Icon
                      className="h-8 w-8"
                      style={{ color: accent }}
                    />
                  )}
                </div>
                {card.title ? (
                  <figcaption className="b18a-polaroid__caption">
                    {card.title}
                  </figcaption>
                ) : null}
                {card.description ? (
                  <p className="b18a-polaroid__desc">{card.description}</p>
                ) : null}
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
