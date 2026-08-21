"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { TerraMedia } from "../components/Media";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C45C26";
  const ink = theme.colors?.base?.secondary?.value ?? "#3D3429";
  const olive = theme.colors?.base?.ternary?.value ?? "#5C6B4A";
  const cards = data.cards ?? [];

  return (
    <section id={id} className="vt-section bg-vt-cream">
      <div className="vt-container">
        <div className="mb-12 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vt-eyebrow mb-6"
            style={{ color: olive }}
          >
            Mesta
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vt-display"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="vt-body mt-5 text-vt-muted">{data.subtitle}</p>
          ) : null}
        </div>

        {data.imageUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <TerraMedia
              src={data.imageUrl}
              alt={data.title}
              className="vt-soft h-48 w-full sm:h-64"
            />
          </motion.div>
        ) : null}

        <div className="grid gap-8 md:grid-cols-2">
          {cards.map((card, index) => (
            <motion.article
              key={`location-${card.id ?? "x"}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.65 }}
              className="vt-soft overflow-hidden border border-vt-line bg-vt-sand"
            >
              <TerraMedia
                src={card.image}
                alt={card.title ?? "Lokacija"}
                className="aspect-[16/10] w-full"
              />
              <div className="px-6 py-8 sm:px-8">
                <p
                  className="text-xs uppercase tracking-[0.32em] sm:text-sm"
                  style={{ color: accent }}
                >
                  {card.time}
                </p>
                <h3
                  className="mt-3 text-3xl sm:text-4xl"
                  style={{ fontFamily: "var(--font-primary)", color: ink }}
                >
                  {card.title}
                </h3>
                {card.location ? (
                  <p className="mt-3 text-base tracking-[0.06em] text-vt-ink-soft sm:text-lg">
                    {card.location}
                  </p>
                ) : null}
                {card.text ? (
                  <p className="vt-body mt-4 text-vt-muted">{card.text}</p>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
