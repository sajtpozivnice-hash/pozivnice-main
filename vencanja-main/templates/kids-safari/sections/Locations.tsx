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
  const { data, id, name } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C1801F";
  const card = data.cards?.[0];
  const image = card?.image || data.imageUrl;

  return (
    <section id={id} className="ksaf-section">
      <div className="ksaf-shell">
        <div className="mb-10 text-center">
          <p className="ksaf-eyebrow mb-4">{name}</p>
          <h2 className="ksaf-heading">{data.title}</h2>
          {data.subtitle ? (
            <p className="mt-3 text-black/55">{data.subtitle}</p>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ksaf-passport"
        >
          <div className="relative mx-auto w-fit">
            <div
              className={`ksaf-passport-photo ${
                image ? "" : "ksaf-passport-photo--empty"
              }`}
            >
              {image ? (
                <img src={image} alt="" referrerPolicy="no-referrer" />
              ) : (
                <MapPin className="h-8 w-8" style={{ color: accent }} />
              )}
            </div>
            <span className="ksaf-passport-postmark">Terrain</span>
          </div>

          {card?.title ? (
            <h3
              className="text-3xl sm:text-4xl"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {card.title}
            </h3>
          ) : null}
          {card?.subtitle ? (
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-black/45">
              {card.subtitle}
            </p>
          ) : null}
          {card?.text || data.description ? (
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-black/55">
              {card?.text || data.description}
            </p>
          ) : null}

          <dl className="ksaf-passport-grid">
            {card?.location ? (
              <div>
                <dt>Lokacija</dt>
                <dd className="flex items-start gap-2">
                  <MapPin className="mt-1 h-4 w-4 shrink-0" style={{ color: accent }} />
                  {card.location}
                </dd>
              </div>
            ) : null}
            {card?.time ? (
              <div>
                <dt>Vreme</dt>
                <dd>{card.time}</dd>
              </div>
            ) : null}
          </dl>
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;
