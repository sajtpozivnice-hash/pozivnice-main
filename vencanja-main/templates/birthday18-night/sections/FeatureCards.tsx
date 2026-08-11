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
    card?.accent || theme.colors?.base?.primary?.value || "var(--bn-accent)";

  return (
    <section id={id} className="bn-section overflow-hidden">
      <div className="bn-shell relative z-10">
        <div className="mb-8 max-w-2xl">
          <p className="bn-label mb-3">{data.subtitle || "STIL"}</p>
          <h2 className="bn-display text-4xl sm:text-5xl">{data.title}</h2>
          {data.description ? (
            <p className="mt-4 text-[color:var(--bn-muted)]">{data.description}</p>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bn-dress"
        >
          <div className="bn-dress__media">
            {card?.image ? (
              <img src={card.image} alt="" referrerPolicy="no-referrer" />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(145deg, ${accent}33, transparent 60%)`,
                }}
              />
            )}
          </div>
          <div className="bn-dress__copy">
            <Icon className="h-5 w-5" style={{ color: accent }} />
            <h3 className="bn-dress__headline" style={{ color: accent }}>
              {card?.title || "ELEGANNO LEŽERNO"}
            </h3>
            {card?.description ? (
              <p className="mt-4 max-w-md text-[color:var(--bn-muted)]">
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
