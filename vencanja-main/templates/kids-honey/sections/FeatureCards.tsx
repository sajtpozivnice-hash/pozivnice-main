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
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#E9A825";
  const cards = data.cards ?? [];

  return (
    <section id={id} className="khny-section">
      <div className="khny-shell">
        <div className="mb-10 text-center">
          <p className="khny-lid mx-auto mb-4">{data.subtitle ?? "Info"}</p>
          <h2 className="khny-heading">{data.title}</h2>
        </div>

        <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
          {cards.map((card, index) => {
            const Icon = resolveFeatureIcon(card.icon);
            const color = card.accent || accent;

            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="khny-pot"
              >
                <span
                  className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full"
                  style={{
                    background: color,
                    color: "var(--color-khny-ink)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="khny-heading text-xl">{card.title}</h3>
                {card.description ? (
                  <p className="khny-body mt-2 text-sm">{card.description}</p>
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
