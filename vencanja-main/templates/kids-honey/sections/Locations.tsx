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
    <section id={id} className="khny-section">
      <div className="khny-shell">
        <div className="mb-10 text-center">
          <p className="khny-lid mx-auto mb-4">{data.subtitle ?? "Lokacija"}</p>
          <h2 className="khny-heading">{data.title}</h2>
        </div>

        <div className="mx-auto flex max-w-lg flex-col items-center gap-5">
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="khny-jar w-full overflow-hidden"
            >
              <span className="khny-jar-lid" aria-hidden />
              {card.image ? (
                <div className="aspect-[16/10]">
                  <img
                    src={card.image}
                    alt=""
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : null}
              <div className="p-6 text-center sm:p-8">
                <p className="khny-lid mx-auto mb-3 w-fit">{card.title}</p>
                {card.time ? (
                  <p
                    className="text-lg font-bold"
                    style={{ color: "var(--color-khny-red)" }}
                  >
                    {card.time}
                  </p>
                ) : null}
                {card.location ? (
                  <h3 className="khny-heading mt-3 text-2xl">{card.location}</h3>
                ) : null}
                {card.text ? (
                  <p className="khny-body mt-3">{card.text}</p>
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
