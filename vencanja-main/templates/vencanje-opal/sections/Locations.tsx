"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { OpalMedia } from "../components/Media";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C9A9A0";
  const ink = theme.colors?.base?.secondary?.value ?? "#3A3532";
  const cards = data.cards ?? [];

  return (
    <section id={id} className="vo-section bg-vo-pearl">
      <div className="vo-container">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vo-eyebrow mb-4"
            style={{ color: accent }}
          >
            Lokacije
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vo-display"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="vo-body mt-4">{data.subtitle}</p>
          ) : null}
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="vo-vellum-strong flex h-full flex-col rounded-[1.75rem] p-6 sm:p-8"
            >
              {card.image ? (
                <OpalMedia
                  src={card.image}
                  alt={card.title || "Lokacija"}
                  className="mb-5 aspect-[16/10] w-full rounded-2xl"
                />
              ) : null}
              <p
                className="text-[11px] uppercase tracking-[0.32em]"
                style={{ color: accent }}
              >
                {card.time}
              </p>
              <h3
                className="mt-3 text-2xl sm:text-3xl"
                style={{ fontFamily: "var(--font-primary)", color: ink }}
              >
                {card.title}
              </h3>
              {card.location ? (
                <p className="vo-body mt-2 font-medium">
                  {card.location}
                </p>
              ) : null}
              {card.text ? (
                <p className="vo-body mt-4">{card.text}</p>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
