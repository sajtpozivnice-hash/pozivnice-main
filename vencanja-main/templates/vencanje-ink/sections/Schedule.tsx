"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { ScheduleSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { Media } from "../components/Media";

type Props = {
  section: ScheduleSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Schedule: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#111111";
  const items = data.items ?? [];

  return (
    <section id={id} className="vi-section">
      <div className="vi-shell">
        <div className="vi-rule-ink" />
        <div className="flex flex-wrap items-baseline justify-between gap-3 py-4">
          <p className="vi-eyebrow">Raspored</p>
          <p className="vi-caption">{items.length} trenutka</p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="vi-display max-w-lg">{data.title}</h2>
            <div className="vi-accent mt-8" style={{ background: accent }} />
            {data.subtitle ? (
              <p className="vi-body mt-6 max-w-md">{data.subtitle}</p>
            ) : null}
          </div>

          <div className="lg:col-span-5">
            <div className="w-44 sm:w-56 lg:ml-auto lg:w-full lg:max-w-xs">
              <Media
                src={data.imageUrl}
                alt=""
                className="vi-plate-portrait"
              />
            </div>
          </div>
        </div>

        <div className="mt-14">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="vi-row"
            >
              <span className="vi-row-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="vi-num text-sm text-vi-ink sm:text-base">
                {item.time}
              </span>
              <div className="col-start-2 sm:col-start-3">
                <h3 className="vi-display-sm">{item.title}</h3>
                {item.description ? (
                  <p className="vi-body mt-2 max-w-xl">{item.description}</p>
                ) : null}
              </div>
            </motion.div>
          ))}
          <div className="vi-rule" />
        </div>
      </div>
    </section>
  );
};

export default Schedule;
