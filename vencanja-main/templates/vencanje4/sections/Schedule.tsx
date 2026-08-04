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

        <div className="relative">
          <div
            className="absolute top-2 bottom-2 left-[11px] w-px sm:left-1/2 sm:-translate-x-1/2"
            style={{ background: "rgba(255,255,255,0.22)" }}
          />

          <div className="space-y-8">
            {items.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  className="relative grid gap-4 sm:grid-cols-2 sm:gap-12"
                >
                  <div
                    className="absolute top-5 left-0 h-6 w-6 rounded-full border sm:left-1/2 sm:-translate-x-1/2"
                    style={{
                      borderColor: accent,
                      background: "rgba(12,11,10,0.85)",
                      boxShadow: `0 0 0 4px rgba(12,11,10,0.4)`,
                    }}
                  />

                  <div
                    className={`pl-12 sm:pl-0 ${
                      isLeft
                        ? "sm:pr-14 sm:text-right"
                        : "sm:col-start-2 sm:pl-14"
                    }`}
                  >
                    <div className="v4-glass px-5 py-5 sm:px-6 sm:py-6">
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
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SceneShell>
  );
};

export default Schedule;
