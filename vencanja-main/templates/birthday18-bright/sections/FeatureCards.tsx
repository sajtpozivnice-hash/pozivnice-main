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

const FeatureCards: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const card = data.cards?.[0];
  const Icon = resolveFeatureIcon(card?.icon);

  return (
    <section id={id} className="b18b-section b18b-dress overflow-hidden">
      <div className="b18b-shell relative z-10">
        <div className="mb-10 text-center">
          <p className="b18b-eyebrow mb-3">{data.subtitle}</p>
          <h2 className="b18b-heading">{data.title}</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18b-dress-panel mx-auto max-w-5xl"
        >
          <div className="b18b-dress-media">
            {card?.image || data.cards?.[0]?.image ? (
              <img
                src={card?.image}
                alt=""
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--b18b-coral)] to-[var(--b18b-lilac)] opacity-80" />
            )}
          </div>
          <div className="b18b-dress-copy">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--b18b-blush)] text-[var(--b18b-coral)]">
              <Icon className="h-5 w-5" />
            </div>
            <h3
              className="text-3xl font-extrabold tracking-wide uppercase sm:text-4xl"
              style={{
                fontFamily: "var(--font-primary)",
                color: card?.accent || "var(--b18b-coral)",
              }}
            >
              {card?.title || data.subtitle || "ŠARENO"}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[var(--b18b-muted)] sm:text-lg">
              {card?.description || data.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
