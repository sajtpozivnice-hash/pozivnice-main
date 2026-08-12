"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { ScheduleSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneShell } from "../components/SceneShell";

type Props = {
  section: ScheduleSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Schedule: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#c9a86a";
  const items = data.items ?? [];

  return (
    <SceneShell
      id={id}
      backgroundImage={data.imageUrl}
      overlay="dark"
    >
      <div className="v4-content-narrow">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="v4-eyebrow mb-5"
            style={{ color: accent }}
          >
            Timeline
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
            <p className="mt-4 text-sm text-white/60 sm:text-base">
              {data.subtitle}
            </p>
          ) : null}
        </div>

        <p className="mb-4 text-center text-[11px] uppercase tracking-[0.3em] text-white/40 sm:hidden">
          Prevucite za više →
        </p>

        <div className="v4-reel">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="v4-glass v4-reel-card"
            >
              <span className="v4-label mb-4 inline-block" style={{ color: accent }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <p
                className="text-[11px] uppercase tracking-[0.32em]"
                style={{ color: accent }}
              >
                {item.time}
              </p>
              <h3
                className="mt-2 text-2xl text-white sm:text-3xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {item.title}
              </h3>
              {item.description ? (
                <p className="mt-2 text-sm text-white/60">
                  {item.description}
                </p>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};

export default Schedule;
