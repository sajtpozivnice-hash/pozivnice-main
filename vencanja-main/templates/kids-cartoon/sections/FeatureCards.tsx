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
  const accent = theme.colors?.base?.primary?.value ?? "#FF6B4A";
  const cards = data.cards ?? [];

  return (
    <section id={id} className="kcart-section">
      <div className="kcart-shell">
        <div className="mb-10 text-center">
          <p className="kcart-eyebrow mb-4">{data.subtitle ?? "Info"}</p>
          <h2 className="kcart-heading">{data.title}</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card, index) => {
            const Icon = resolveFeatureIcon(card.icon);
            const color = card.accent || accent;

            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="kcart-panel overflow-hidden"
              >
                {card.image ? (
                  <div className="h-36 border-b-[3.5px] border-[var(--color-kcart-ink)]">
                    <img
                      src={card.image}
                      alt=""
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : null}
                <div className="p-5 sm:p-6">
                  <span
                    className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[var(--color-kcart-ink)]"
                    style={{ background: color }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3
                    className="text-xl font-black sm:text-2xl"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {card.title}
                  </h3>
                  {card.description ? (
                    <p className="kcart-body mt-2 text-sm sm:text-base">
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
