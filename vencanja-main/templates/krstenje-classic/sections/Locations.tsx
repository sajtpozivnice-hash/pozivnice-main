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
    <section id={id} className="kc-section bg-kc-sand">
      <div className="kc-container-narrow">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kc-eyebrow mb-4"
          >
            Gde se nalazimo
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kc-heading"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="kc-subheading">{data.subtitle}</p>
          ) : null}
        </div>

        {/* Formal address card stack — offset index cards, letterpress double rule */}
        <div className="kc-address-stack">
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="kc-address-card"
              style={
                {
                  "--kc-tilt": index % 2 === 0 ? "-0.6deg" : "0.5deg",
                } as React.CSSProperties
              }
            >
              <span className="kc-address-index">
                Br. {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3
                  className="text-2xl sm:text-3xl"
                  style={{ fontFamily: "var(--font-primary)", color: ink }}
                >
                  {card.title}
                </h3>
                <p
                  className="flex items-center gap-2 text-xs uppercase tracking-[0.28em]"
                  style={{ color: accent }}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {card.time}
                </p>
              </div>

              <div className="kc-address-rule" />

              {card.location ? (
                <p className="text-sm font-medium text-kc-ink-soft">
                  {card.location}
                </p>
              ) : null}
              {card.text ? (
                <p className="mt-3 text-sm leading-relaxed text-kc-muted">
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
