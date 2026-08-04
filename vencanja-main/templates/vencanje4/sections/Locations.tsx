"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneShell } from "../components/SceneShell";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#c9a86a";
  const cards = data.cards ?? [];

  return (
    <SceneShell
      id={id}
      backgroundImage={data.imageUrl}
      overlay="default"
    >
      <div className="v4-content">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="v4-eyebrow mb-5"
            style={{ color: accent }}
          >
            Lokacije
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="v4-heading"
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="mt-4 text-sm text-white/65 sm:text-base">
              {data.subtitle}
            </p>
          ) : null}
        </div>

        <div
          className={`grid gap-5 ${
            cards.length === 1
              ? "mx-auto max-w-xl md:grid-cols-1"
              : "md:grid-cols-2"
          }`}
        >
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="v4-glass-strong overflow-hidden"
            >
              {card.image ? (
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title || "Lokacija"}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : null}
              <div className="p-7 sm:p-9">
              <div
                className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20"
                style={{ color: accent }}
              >
                <MapPin className="h-5 w-5" />
              </div>
              {card.time ? (
                <p
                  className="text-[11px] uppercase tracking-[0.32em]"
                  style={{ color: accent }}
                >
                  {card.time}
                </p>
              ) : null}
              <h3
                className="mt-3 text-3xl text-white"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {card.title}
              </h3>
              {card.location ? (
                <p className="mt-3 text-sm font-medium text-white/80">
                  {card.location}
                </p>
              ) : null}
              {card.text ? (
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  {card.text}
                </p>
              ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};

export default Locations;
