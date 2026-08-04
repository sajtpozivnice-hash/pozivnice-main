"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { ScheduleSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { GlassPanel } from "../components/GlassPanel";

type Props = {
  section: ScheduleSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Schedule: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#e2c4a0";
  const items = data.items ?? [];

  return (
    <section id={id} className="vb-section">
      <div className="vb-wrap-narrow">
        <GlassPanel strong className="px-6 py-10 sm:px-10 sm:py-12">
          <div className="mb-10 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="vb-eyebrow mb-4"
              style={{ color: accent }}
            >
              Raspored
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="vb-title"
            >
              {data.title}
            </motion.h2>
            {data.subtitle ? (
              <p className="mt-3 text-sm text-white/55">{data.subtitle}</p>
            ) : null}
          </div>

          <div className="relative space-y-0">
            <div className="absolute top-2 bottom-2 left-[11px] w-px bg-white/20" />
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative grid grid-cols-[1.5rem_1fr] gap-5 py-5"
              >
                <span
                  className="mt-1.5 h-3 w-3 rounded-full border-2 bg-transparent"
                  style={{ borderColor: accent }}
                />
                <div>
                  <p
                    className="text-[11px] uppercase tracking-[0.28em]"
                    style={{ color: accent }}
                  >
                    {item.time}
                  </p>
                  <h3
                    className="mt-1 text-2xl text-white"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-1 text-sm text-white/55">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
};

export default Schedule;
