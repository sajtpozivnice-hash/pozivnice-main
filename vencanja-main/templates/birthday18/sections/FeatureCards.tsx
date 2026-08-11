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
  const cards = data.cards || [];

  return (
    <section id={id} className="b18-section overflow-hidden">
      <div className="b18-shell">
        <div className="mb-12 text-center">
          <p className="b18-eyebrow mb-4">{data.subtitle}</p>
          <h2 className="b18-heading">{data.title}</h2>
          {data.description ? (
            <p className="mx-auto mt-4 max-w-xl text-white/55">
              {data.description}
            </p>
          ) : null}
        </div>

        <div
          className={`mx-auto grid gap-5 ${
            cards.length === 1 ? "max-w-3xl" : "md:grid-cols-2"
          }`}
        >
          {cards.map((card, index) => {
            const Icon = resolveFeatureIcon(card.icon);
            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="b18-panel overflow-hidden"
              >
                {card.image ? (
                  <div className="relative h-56 overflow-hidden sm:h-64">
                    <img
                      src={card.image}
                      alt=""
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--b18-bg)] via-transparent to-transparent" />
                  </div>
                ) : null}
                <div className="space-y-4 p-7 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5"
                      style={{
                        color: card.accent || undefined,
                        borderColor: card.accent
                          ? `${card.accent}55`
                          : undefined,
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3
                      className="text-2xl font-bold tracking-wide uppercase"
                      style={{
                        fontFamily: "var(--font-primary)",
                        color: card.accent || undefined,
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  {card.description ? (
                    <p className="text-white/55">{card.description}</p>
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
