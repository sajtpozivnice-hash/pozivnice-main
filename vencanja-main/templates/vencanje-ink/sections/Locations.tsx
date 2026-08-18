"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { Media } from "../components/Media";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#111111";
  const cards = data.cards ?? [];

  return (
    <section id={id} className="vi-section">
      <div className="vi-shell">
        <div className="vi-rule-ink" />
        <div className="flex flex-wrap items-baseline justify-between gap-3 py-4">
          <p className="vi-eyebrow">Lokacije</p>
          <p className="vi-caption">{data.subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <h2 className="vi-display lg:col-span-5">{data.title}</h2>
          <div className="lg:col-span-7">
            <Media src={data.imageUrl} alt="" className="vi-plate-strip" />
          </div>
        </div>

        <div className="vi-accent mt-12" style={{ background: accent }} />

        <div className="mt-4">
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
              className="grid grid-cols-1 gap-6 border-t border-vi-line py-10 lg:grid-cols-12"
            >
              <div className="flex items-start gap-5 lg:col-span-4">
                <div className="w-20 shrink-0">
                  <Media
                    src={card.image}
                    alt={card.title ?? ""}
                    className="vi-plate-square"
                  />
                </div>
                <div>
                  <p className="vi-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="vi-display-sm mt-2">{card.title}</h3>
                </div>
              </div>

              <div className="lg:col-span-3">
                <p className="vi-caption">Vreme</p>
                <p className="vi-num mt-2 text-lg text-vi-ink">{card.time}</p>
              </div>

              <div className="lg:col-span-5">
                <p className="vi-caption">Adresa</p>
                <p className="vi-body mt-2 font-medium text-vi-ink">
                  {card.location}
                </p>
                {card.text ? (
                  <p className="vi-body mt-3">{card.text}</p>
                ) : null}
              </div>
            </motion.article>
          ))}
          <div className="vi-rule" />
        </div>
      </div>
    </section>
  );
};

export default Locations;
