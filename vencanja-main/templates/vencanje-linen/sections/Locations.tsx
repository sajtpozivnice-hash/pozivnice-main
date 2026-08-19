"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { LinenMedia } from "../components/Media";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C4A574";
  const ink = theme.colors?.base?.secondary?.value ?? "#2A2420";
  const cards = data.cards ?? [];
  const hasBanner = Boolean(data.imageUrl?.trim());

  return (
    <section id={id} className="vl-section bg-vl-paper">
      <div className="vl-container">
        <div className="mb-14 text-center">
          <p className="vl-eyebrow mb-4" style={{ color: accent }}>
            Lokacije
          </p>
          <h2 className="vl-display" style={{ color: ink }}>
            {data.title}
          </h2>
          {data.subtitle ? (
            <p className="vl-body mt-4 text-vl-muted">{data.subtitle}</p>
          ) : null}
        </div>

        {hasBanner ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <LinenMedia
              src={data.imageUrl}
              alt={data.title}
              className="h-52 w-full sm:h-72"
            />
          </motion.div>
        ) : null}

        <div className="space-y-12 sm:space-y-16">
          {cards.map((card, index) => (
            <motion.div
              key={card.id ?? index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="flex gap-5 border-t border-vl-line pt-10 sm:gap-8"
            >
              <LinenMedia
                src={card.image}
                alt={card.title}
                className="h-20 w-20 shrink-0 overflow-hidden sm:h-24 sm:w-24"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
                  <h3
                    className="text-2xl sm:text-3xl"
                    style={{ fontFamily: "var(--font-primary)", color: ink }}
                  >
                    {card.title}
                  </h3>
                  {card.time ? (
                    <span
                      className="text-lg tracking-[0.1em] tabular-nums sm:text-xl"
                      style={{
                        fontFamily: "var(--font-secondary)",
                        color: accent,
                      }}
                    >
                      {card.time}
                    </span>
                  ) : null}
                </div>
                {card.location ? (
                  <p
                    className="mt-3 text-base tracking-[0.06em] text-vl-ink-soft sm:text-lg"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {card.location}
                  </p>
                ) : null}
                {card.text ? (
                  <p className="vl-body mt-3 text-vl-muted">{card.text}</p>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
