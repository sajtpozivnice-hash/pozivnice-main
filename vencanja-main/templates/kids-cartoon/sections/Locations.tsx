"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const cards = data.cards ?? [];

  return (
    <section id={id} className="kcart-section">
      <div className="kcart-shell">
        <div className="mb-10 text-center">
          <p className="kcart-eyebrow mb-4">{data.subtitle ?? "Lokacija"}</p>
          <h2 className="kcart-heading">{data.title}</h2>
        </div>

        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-5">
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="kcart-panel w-full max-w-lg overflow-hidden"
            >
              {card.image ? (
                <div className="aspect-[16/10] border-b-[3.5px] border-[var(--color-kcart-ink)]">
                  <img
                    src={card.image}
                    alt=""
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : null}
              <div className="p-6 text-center sm:p-8">
                <p className="kcart-eyebrow mx-auto mb-3 w-fit">{card.title}</p>
                {card.time ? (
                  <p
                    className="text-xl font-black"
                    style={{ color: "var(--color-kcart-tomato)" }}
                  >
                    {card.time}
                  </p>
                ) : null}
                {card.location ? (
                  <h3 className="kcart-heading mt-3 text-2xl sm:text-3xl">
                    {card.location}
                  </h3>
                ) : null}
                {card.text ? (
                  <p className="kcart-body mt-3">{card.text}</p>
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
