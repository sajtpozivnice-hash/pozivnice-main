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
  const card = data.cards?.[0];
  const Icon = resolveFeatureIcon(card?.icon);
  const accent = card?.accent || theme.colors?.base?.primary?.value || "var(--coast-sea)";

  return (
    <section id={id} className="b18c-band">
      <div className="b18c-shell">
        <div className="mb-8 text-center">
          <p className="b18c-kicker mb-3">{data.subtitle}</p>
          <h2 className="b18c-display text-3xl sm:text-4xl">{data.title}</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18c-feature mx-auto max-w-4xl"
        >
          <div className="b18c-feature__icon" style={{ color: accent }}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="b18c-display text-2xl">
              {card?.title || data.subtitle}
            </h3>
            <p className="mt-2 text-[var(--coast-muted)]">
              {card?.description || data.description}
            </p>
          </div>
          {card?.image ? (
            <div className="b18c-feature__swatch">
              <img src={card.image} alt="" referrerPolicy="no-referrer" />
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
