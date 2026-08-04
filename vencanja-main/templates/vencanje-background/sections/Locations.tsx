"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { GlassPanel } from "../components/GlassPanel";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#e2c4a0";
  const cards = data.cards ?? [];

  return (
    <section id={id} className="vb-section">
      <div className="vb-wrap">
        <div className="mb-10 text-center">
          <GlassPanel className="inline-block px-8 py-6">
            <p className="vb-eyebrow mb-3" style={{ color: accent }}>
              Lokacije
            </p>
            <h2 className="vb-title text-3xl sm:text-4xl">{data.title}</h2>
            {data.subtitle ? (
              <p className="mt-2 text-sm text-white/55">{data.subtitle}</p>
            ) : null}
          </GlassPanel>
        </div>

        <div
          className={`grid gap-5 ${
            cards.length === 1 ? "mx-auto max-w-xl" : "md:grid-cols-2"
          }`}
        >
          {cards.map((card, index) => {
            const cardImage = card.image?.trim() ? card.image.trim() : "";
            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <GlassPanel strong className="overflow-hidden p-0">
                  {cardImage ? (
                    <img
                      src={cardImage}
                      alt={card.title || "Lokacija"}
                      className="aspect-[16/10] w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : null}
                  <div className="p-6 sm:p-8">
                    <p
                      className="text-[11px] uppercase tracking-[0.28em]"
                      style={{ color: accent }}
                    >
                      {card.time}
                    </p>
                    <h3
                      className="mt-2 text-3xl text-white"
                      style={{ fontFamily: "var(--font-primary)" }}
                    >
                      {card.title}
                    </h3>
                    {card.location ? (
                      <p className="mt-2 text-sm text-white/75">{card.location}</p>
                    ) : null}
                    {card.text ? (
                      <p className="mt-3 text-sm leading-relaxed text-white/55">
                        {card.text}
                      </p>
                    ) : null}
                  </div>
                </GlassPanel>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Locations;
