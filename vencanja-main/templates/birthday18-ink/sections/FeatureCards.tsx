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

/** Pull-quote rail: a bordered typographic rail with a big quote mark, not an image+text ad card. */
const FeatureCards: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const card = data.cards?.[0];
  const Icon = resolveFeatureIcon(card?.icon);
  const accent = card?.accent || theme.colors?.base?.primary?.value || "var(--ink-red)";

  return (
    <section id={id} className="b18i-section">
      <div className="b18i-shell max-w-3xl">
        <p className="b18i-eyebrow mb-3">{data.title || "Iz uredništva"}</p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18i-rail"
          style={{ borderColor: accent }}
        >
          {card?.image ? (
            <div className="mb-5 overflow-hidden border border-[var(--ink-ink)]/15">
              <img
                src={card.image}
                alt=""
                className="aspect-[21/9] w-full object-cover grayscale-[20%]"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}
          <span className="b18i-rail__mark" style={{ color: accent }} aria-hidden>
            “
          </span>
          <p className="b18i-rail__quote">
            {card?.title || data.subtitle}
          </p>
          {card?.description || data.description ? (
            <p className="b18i-rail__desc">
              {card?.description || data.description}
            </p>
          ) : null}
          <div className="b18i-rail__byline" style={{ color: accent }}>
            <Icon className="h-4 w-4" />
            <span>Oglas</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
