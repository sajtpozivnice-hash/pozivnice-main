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

const Schedule: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const items = data.items ?? [];

  return (
    <section id={id} className="vb-section">
      <div className="vb-shell">
        <div className="mb-10 text-center">
          <p className="vb-kicker">{data.subtitle ?? "Program"}</p>
          <h2 className="vb-script-sm mt-4">{data.title}</h2>
          <div className="vb-dot-row mt-6">
            <span className="vb-dot" />
            <span className="vb-dot opacity-60" />
            <span className="vb-dot opacity-35" />
          </div>
        </div>

        <div className="mx-auto flex max-w-xl flex-col gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="vb-flow-item"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="vb-display text-[1.35rem]">{item.title}</h3>
                <p
                  className="text-base tracking-[0.06em]"
                  style={{
                    color: "var(--color-vb-clay)",
                    fontFamily: "var(--font-secondary)",
                    fontWeight: 500,
                  }}
                >
                  {item.time}
                </p>
              </div>
              {item.description ? (
                <p className="vb-body mt-3 text-sm">{item.description}</p>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
