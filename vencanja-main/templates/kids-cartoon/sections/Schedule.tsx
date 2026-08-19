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

const COLORS = [
  "var(--color-kcart-tomato)",
  "var(--color-kcart-blue)",
  "var(--color-kcart-sun)",
  "var(--color-kcart-mint)",
];

const Schedule: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const items = data.items ?? [];

  return (
    <section id={id} className="kcart-section">
      <div className="kcart-shell">
        <div className="mb-10 text-center">
          <p className="kcart-eyebrow mb-4">{data.subtitle ?? "Program"}</p>
          <h2 className="kcart-heading">{data.title}</h2>
        </div>

        <div className="mx-auto grid max-w-3xl gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="kcart-panel flex flex-wrap items-center gap-4 px-5 py-5 sm:gap-6 sm:px-7"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-[var(--color-kcart-ink)] text-sm font-black"
                style={{ background: COLORS[index % COLORS.length] }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h3
                  className="text-xl font-black sm:text-2xl"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="kcart-body mt-1 text-sm sm:text-base">
                    {item.description}
                  </p>
                ) : null}
              </div>
              <p className="text-lg font-black tabular-nums">{item.time}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
