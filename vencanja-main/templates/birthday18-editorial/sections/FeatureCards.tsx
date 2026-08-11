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
  const accent =
    card?.accent ||
    theme.colors?.base?.primary?.value ||
    "var(--ed-cherry)";

  return (
    <section id={id} className="ed-section ed-dress overflow-hidden">
      <div className="ed-shell relative z-10">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="ed-sticker">{data.subtitle || "STILSKA NAPOMENA"}</span>
          <h2 className="ed-display text-4xl sm:text-5xl">{data.title}</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ed-dress__panel"
          style={{ boxShadow: `10px 10px 0 ${accent}` }}
        >
          <div className="ed-dress__media">
            {card?.image ? (
              <img src={card.image} alt="" referrerPolicy="no-referrer" />
            ) : (
              <div className="absolute inset-0 bg-[var(--ed-ink)]" />
            )}
          </div>
          <div className="ed-dress__copy">
            <Icon className="h-5 w-5" style={{ color: accent }} />
            <p className="ed-label mt-4">
              {data.description || "DOĐI KAO SVOJA NAJBOLJA VERZIJA"}
            </p>
            <h3 className="ed-dress__headline" style={{ color: accent }}>
              {card?.title || "CRNO / CRVENO / ŠTA GOD TI STOJI"}
            </h3>
            {card?.description ? (
              <p className="mt-4 max-w-md text-[var(--ed-muted)]">
                {card.description}
              </p>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
