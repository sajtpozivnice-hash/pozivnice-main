"use client";

import { CSSProperties, FC } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
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
  const accent = theme.colors?.base?.primary?.value ?? "#5EEAD4";
  const cards = data.cards ?? [];
  const count = Math.max(cards.length, 1);

  return (
    <section id={id} className="kspc-section">
      <div className="kspc-shell">
        <div className="mb-10 max-w-2xl">
          <p className="kspc-eyebrow mb-4">{name}</p>
          <h2 className="kspc-heading">{data.title}</h2>
          {data.subtitle ? (
            <p className="mt-2 text-lg font-medium text-white/70">
              {data.subtitle}
            </p>
          ) : null}
          {data.description ? (
            <p className="mt-3 text-white/55">{data.description}</p>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="kspc-orbit-field"
        >
          <span className="kspc-orbit-field-ring" aria-hidden="true" />
          <span
            className="kspc-orbit-field-ring kspc-orbit-field-ring--inner"
            aria-hidden="true"
          />
          <div className="kspc-orbit-field-hub">
            <Sparkles className="h-6 w-6" />
          </div>

          {cards.map((card, index) => {
            const Icon = resolveFeatureIcon(card.icon);
            const color = card.accent || accent;
            const angle = (360 / count) * index - 90;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="kspc-orbit-field-node"
                style={{ "--angle": `${angle}deg` } as CSSProperties}
              >
                <span
                  className="kspc-orbit-field-dot"
                  style={{ "--gauge-color": color } as CSSProperties}
                >
                  {card.image ? (
                    <img src={card.image} alt="" referrerPolicy="no-referrer" />
                  ) : (
                    <Icon className="relative h-5 w-5" style={{ color }} />
                  )}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        <ol className="kspc-orbit-legend">
          {cards.map((card, index) => {
            const Icon = resolveFeatureIcon(card.icon);
            const color = card.accent || accent;

            return (
              <motion.li
                key={card.id}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="kspc-orbit-legend-row"
              >
                <span className="kspc-orbit-legend-index" style={{ color }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="kspc-orbit-legend-icon"
                  style={{ borderColor: color, color }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="kspc-orbit-legend-title">{card.title}</h3>
                  {card.description ? (
                    <p className="kspc-orbit-legend-desc">
                      {card.description}
                    </p>
                  ) : null}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default FeatureCards;
