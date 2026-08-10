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
    <section id={id} className="ed-section overflow-hidden">
      <div className="ed-shell relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="ed-label mb-3">{data.subtitle}</p>
            <h2 className="ed-display text-5xl sm:text-6xl lg:text-7xl">
              {data.title}
            </h2>
          </div>
          <span className="ed-sticker ed-sticker--blue">Redosled programa</span>
        </div>

        <div className="ed-schedule__list">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="ed-schedule__item"
            >
              <p className="ed-schedule__time">{item.time}</p>
              <div>
                <h3 className="ed-schedule__title">{item.title}</h3>
                {item.description ? (
                  <p className="ed-schedule__desc">{item.description}</p>
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
