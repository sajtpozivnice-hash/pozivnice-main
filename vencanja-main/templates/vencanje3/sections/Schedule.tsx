"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { ScheduleSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: ScheduleSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Schedule: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value;
  const ink = theme.colors?.base?.secondary?.value;
  const items = data.items ?? [];

  return (
    <section id={id} className="v3-section bg-white">
      <div className="v3-container-narrow">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="v3-eyebrow mb-4"
          >
            Timeline
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="v3-heading"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="v3-subheading">{data.subtitle}</p>
          ) : null}
        </div>

        <div className="relative space-y-0">
          <div
            className="absolute top-3 bottom-3 left-[11px] w-px sm:left-1/2 sm:-translate-x-1/2"
            style={{ background: `${accent}33` }}
          />

          {items.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`relative grid gap-4 py-6 sm:grid-cols-2 sm:gap-10 ${
                  isLeft ? "" : "sm:text-right"
                }`}
              >
                <div
                  className={`absolute top-8 left-0 h-6 w-6 rounded-full border-2 bg-white sm:left-1/2 sm:-translate-x-1/2 ${
                    isLeft ? "" : ""
                  }`}
                  style={{ borderColor: accent }}
                />

                <div
                  className={`pl-10 sm:pl-0 ${
                    isLeft ? "sm:pr-12" : "sm:col-start-2 sm:pl-12 sm:text-left"
                  }`}
                >
                  <p
                    className="text-xs uppercase tracking-[0.28em]"
                    style={{ color: accent }}
                  >
                    {item.time}
                  </p>
                  <h3
                    className="mt-2 text-2xl"
                    style={{
                      fontFamily: "var(--font-primary)",
                      color: ink,
                    }}
                  >
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-2 text-sm text-v3-muted">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
