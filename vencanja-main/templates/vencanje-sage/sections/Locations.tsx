"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SageMedia } from "../components/Media";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#6b7f6a";
  const ink = theme.colors?.base?.secondary?.value ?? "#2c2a26";
  const cards = data.cards ?? [];

  return (
    <section id={id} className="vs-section bg-vs-linen">
      <div className="vs-container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="vs-eyebrow mb-6"
              style={{ color: accent }}
            >
              Mesta
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="vs-display"
              style={{ color: ink }}
            >
              {data.title}
            </motion.h2>
          </div>
          {data.subtitle ? (
            <p className="vs-body text-vs-muted lg:col-span-5">
              {data.subtitle}
            </p>
          ) : null}
        </div>

        {data.imageUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-14"
          >
            <SageMedia
              src={data.imageUrl}
              alt={data.title}
              className="h-52 w-full sm:h-72"
            />
          </motion.div>
        ) : null}

        <div className="mt-16 space-y-16 lg:mt-20 lg:space-y-24">
          {cards.map((card, index) => {
            const reversed = index % 2 === 1;

            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16"
              >
                <div
                  className={`lg:col-span-7 ${
                    reversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <SageMedia
                    src={card.image}
                    alt={card.title ?? "Lokacija"}
                    className="aspect-[16/10] w-full"
                  />
                </div>

                <div
                  className={`lg:col-span-5 ${
                    reversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.4em]"
                    style={{ color: accent }}
                  >
                    {card.time}
                  </p>
                  <h3
                    className="mt-4 text-3xl sm:text-4xl"
                    style={{ fontFamily: "var(--font-primary)", color: ink }}
                  >
                    {card.title}
                  </h3>
                  {card.location ? (
                    <p className="mt-3 text-sm uppercase tracking-[0.18em] text-vs-ink-soft">
                      {card.location}
                    </p>
                  ) : null}
                  {card.text ? (
                    <p className="vs-body mt-5 text-vs-muted">{card.text}</p>
                  ) : null}
                  <div className="vs-rule mt-8" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Locations;
