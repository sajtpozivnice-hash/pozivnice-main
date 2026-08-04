"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value;
  const ink = theme.colors?.base?.secondary?.value;
  const cards = data.cards ?? [];

  return (
    <section id={id} className="v3-section bg-v3-sand">
      <div className="v3-container">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="v3-eyebrow mb-4"
          >
            Gde se nalazimo
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="v3-heading"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="v3-subheading">{data.subtitle}</p>
          ) : null}
        </div>

        <div
          className={`grid gap-6 ${
            cards.length === 1
              ? "md:grid-cols-1 md:max-w-xl md:mx-auto"
              : "md:grid-cols-2"
          }`}
        >
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="v3-card group p-7 sm:p-9"
            >
              <div
                className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full"
                style={{ background: `${accent}22`, color: accent }}
              >
                <MapPin className="h-5 w-5" />
              </div>
              <p
                className="text-xs uppercase tracking-[0.28em]"
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
                <p className="mt-3 text-sm font-medium text-v3-ink-soft">
                  {card.location}
                </p>
              ) : null}
              {card.text ? (
                <p className="mt-4 text-sm leading-relaxed text-v3-muted">
                  {card.text}
                </p>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
