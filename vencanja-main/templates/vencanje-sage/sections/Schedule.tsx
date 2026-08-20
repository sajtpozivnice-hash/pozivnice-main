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
  const accent = theme.colors?.base?.primary?.value ?? "#6b7f6a";
  const ink = theme.colors?.base?.secondary?.value ?? "#2c2a26";
  const items = data.items ?? [];

  return (
    <section id={id} className="vs-section bg-vs-oat">
      <div className="vs-container-narrow">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vs-eyebrow mb-6"
            style={{ color: accent }}
          >
            Tok dana
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vs-display"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="vs-body mx-auto mt-5 max-w-md text-vs-muted">
              {data.subtitle}
            </p>
          ) : null}
        </div>

        <ol className="relative mx-auto max-w-xl border-l border-vs-line pl-8 sm:pl-10">
          {items.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
              className="relative pb-12 last:pb-0"
            >
              <span
                className="absolute left-[-2.3rem] top-2 h-2.5 w-2.5 rounded-full sm:left-[-2.8rem]"
                style={{ background: accent }}
              />
              <p
                className="text-base uppercase tracking-[0.28em] sm:text-lg"
                style={{ color: accent }}
              >
                {item.time}
              </p>
              <h3
                className="mt-3 text-3xl sm:text-4xl"
                style={{ fontFamily: "var(--font-primary)", color: ink }}
              >
                {item.title}
              </h3>
              {item.description ? (
                <p className="vs-body mt-3 max-w-md text-vs-muted">
                  {item.description}
                </p>
              ) : null}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Schedule;
