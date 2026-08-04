"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneFrame } from "../components/SceneFrame";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#d4a574";
  const cards = data.cards ?? [];

  return (
    <section id={id} className="w-full overflow-hidden bg-vc-void">
      <div className="px-5 py-16 text-center sm:px-8 sm:py-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vc-eyebrow mb-4"
          style={{ color: accent }}
        >
          Places
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vc-title"
        >
          {data.title}
        </motion.h2>
        {data.subtitle ? (
          <p className="mt-4 text-sm text-white/50">{data.subtitle}</p>
        ) : null}
      </div>

      {cards.length === 0 ? (
        <SceneFrame
          id={`${id}-empty`}
          backgroundImage={data.imageUrl}
          className="min-h-[60svh]"
        >
          <div className="vc-stage text-center">
            <p className="vc-body">Locations coming soon.</p>
          </div>
        </SceneFrame>
      ) : (
        cards.map((card, index) => (
          <SceneFrame
            key={card.id}
            id={`${id}-${card.id}`}
            backgroundImage={card.image || data.imageUrl}
            className="min-h-[85svh]"
          >
            <div className="vc-stage flex min-h-[85svh] flex-col justify-end">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="max-w-xl"
              >
                <p
                  className="mb-3 text-[10px] uppercase tracking-[0.4em]"
                  style={{ color: accent }}
                >
                  Scene {String(index + 1).padStart(2, "0")} · {card.time}
                </p>
                <h3
                  className="text-4xl text-white sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {card.title}
                </h3>
                {card.location ? (
                  <p className="mt-4 text-sm uppercase tracking-[0.22em] text-white/70">
                    {card.location}
                  </p>
                ) : null}
                {card.text ? (
                  <p className="mt-4 max-w-md text-base text-white/60">
                    {card.text}
                  </p>
                ) : null}
              </motion.div>
            </div>
          </SceneFrame>
        ))
      )}
    </section>
  );
};

export default Locations;
