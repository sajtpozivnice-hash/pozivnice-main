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
  const items = [...(data.items || [])].sort((a, b) =>
    a.time.localeCompare(b.time),
  );

  return (
    <section id={id} className="bn-section overflow-hidden">
      <div className="bn-shell relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="bn-label mb-3">{data.subtitle || "REDOSLED PROGRAMA"}</p>
            <h2 className="bn-display text-5xl sm:text-6xl lg:text-7xl">
              {data.title || "VEČE"}
            </h2>
          </div>
        </div>

        <div className="bn-schedule__list">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bn-schedule__item"
            >
              <p className="bn-schedule__time bn-mono">{item.time}</p>
              <div>
                <h3 className="bn-schedule__title">{item.title}</h3>
                {item.description ? (
                  <p className="mt-1 max-w-xl text-sm text-[color:var(--bn-muted)]">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
