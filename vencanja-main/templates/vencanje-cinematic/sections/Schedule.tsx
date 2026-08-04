"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { ScheduleSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneFrame } from "../components/SceneFrame";

type Props = {
  section: ScheduleSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Schedule: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#d4a574";
  const items = data.items ?? [];

  return (
    <SceneFrame id={id} backgroundImage={data.imageUrl} overlay="heavy">
      <div className="vc-stage">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vc-eyebrow mb-4"
            style={{ color: accent }}
          >
            Sequence
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

        <div className="mx-auto max-w-2xl space-y-0">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.06, duration: 0.55 }}
              className="grid grid-cols-[auto_1fr] gap-6 border-t border-white/15 py-8 sm:gap-10 sm:py-10"
            >
              <p
                className="pt-1 text-3xl tracking-tight sm:text-5xl"
                style={{ fontFamily: "var(--font-primary)", color: accent }}
              >
                {item.time}
              </p>
              <div>
                <h3
                  className="text-2xl text-white sm:text-3xl"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="mt-2 text-sm text-white/55 sm:text-base">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneFrame>
  );
};

export default Schedule;
