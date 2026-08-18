"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import Media from "../components/Media";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

/** Dark cards with the still on top and the details engraved below. */
const Locations: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const cards = data.cards ?? [];
  const background = data.imageUrl?.trim() ?? "";

  return (
    <section id={id} className="vd-section">
      {background ? (
        <Media src={background} className="vd-backdrop" veil />
      ) : null}

      <div className="vd-shell relative z-10">
        <div className="mb-9 text-center">
          <p className="vd-eyebrow">Lokacije</p>
          <h2 className="vd-title mt-3">{data.title}</h2>
          {data.subtitle ? (
            <p className="vd-body mx-auto mt-4 max-w-xl">{data.subtitle}</p>
          ) : null}
        </div>

        <div className="vd-cards">
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="vd-place"
            >
              <Media src={card.image} className="vd-place__media" />
              <div className="vd-place__body">
                <p className="vd-eyebrow">{card.subtitle || "Scena"}</p>
                <h3 className="vd-title vd-title--sm">{card.title}</h3>
                {card.time ? (
                  <p className="vd-place__row">
                    <Clock className="h-4 w-4 shrink-0" />
                    {card.time}
                  </p>
                ) : null}
                {card.location ? (
                  <p className="vd-place__row">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {card.location}
                  </p>
                ) : null}
                {card.text ? <p className="vd-body">{card.text}</p> : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
