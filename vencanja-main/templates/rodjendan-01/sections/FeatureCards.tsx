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
  const { data, id, name } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#FF5C8A";
  const cards = data.cards ?? [];

  return (
    <section id={id} className="bday-section">
      <div className="bday-shell">
        <div className="mb-10 max-w-2xl">
          <p className="bday-eyebrow mb-4">{name}</p>
          <h2 className="bday-heading">{data.title}</h2>
          {data.subtitle ? (
            <p className="mt-2 text-lg font-medium text-black/70">
              {data.subtitle}
            </p>
          ) : null}
          {data.description ? (
            <p className="mt-3 text-black/55">{data.description}</p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {cards.map((card, index) => {
            const Icon = resolveFeatureIcon(card.icon);
            const color = card.accent || accent;
            const wide = index === 0 || index === 2;

            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`bday-card-strong overflow-hidden ${
                  wide ? "lg:col-span-3" : "lg:col-span-2"
                }`}
              >
                {card.image ? (
                  <div className="relative h-40 overflow-hidden sm:h-44">
                    <img
                      src={card.image}
                      alt=""
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div
                      className="absolute inset-0 opacity-35"
                      style={{
                        background: `linear-gradient(180deg, transparent, ${color})`,
                      }}
                    />
                  </div>
                ) : null}

                <div className="p-5 sm:p-6">
                  <div
                    className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white"
                    style={{ background: color }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3
                    className="text-2xl"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {card.title}
                  </h3>
                  {card.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-black/55">
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
