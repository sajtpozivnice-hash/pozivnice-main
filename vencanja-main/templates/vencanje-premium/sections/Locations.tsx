"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { PremiumMedia } from "../components/PremiumMedia";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#9c7a45";
  const ink = theme.colors?.base?.secondary?.value ?? "#1c1917";
  const cards = data.cards ?? [];

  return (
    <section id={id} className="vp-section bg-vp-ivory">
      <div className="vp-container">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vp-eyebrow mb-4"
            style={{ color: accent }}
          >
            Locations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vp-display"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="vp-body mt-4 text-vp-muted">{data.subtitle}</p>
          ) : null}
        </div>

        {data.imageUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <PremiumMedia
              src={data.imageUrl}
              alt={data.title}
              className="aspect-[21/9] w-full"
            />
          </motion.div>
        ) : null}

        <div
          className={`grid gap-10 ${
            cards.length === 1 ? "mx-auto max-w-xl" : "lg:grid-cols-2"
          }`}
        >
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group"
            >
              {card.image ? (
                <PremiumMedia
                  src={card.image}
                  alt={card.title || "Location"}
                  className="mb-6 aspect-[16/11] w-full"
                />
              ) : null}
              <p
                className="text-[11px] uppercase tracking-[0.32em]"
                style={{ color: accent }}
              >
                {card.time}
              </p>
              <h3
                className="mt-3 text-3xl"
                style={{ fontFamily: "var(--font-primary)", color: ink }}
              >
                {card.title}
              </h3>
              {card.location ? (
                <p className="mt-2 text-sm font-medium text-vp-ink-soft">
                  {card.location}
                </p>
              ) : null}
              {card.text ? (
                <p className="mt-4 text-sm leading-relaxed text-vp-muted">
                  {card.text}
                </p>
              ) : null}
              <div
                className="mt-6 h-px w-12 transition-all group-hover:w-20"
                style={{ background: accent }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
