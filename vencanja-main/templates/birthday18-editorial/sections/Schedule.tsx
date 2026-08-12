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

/** Magazine day-plan two-up: schedule laid out as paired spread cards, not a single dotted-line list. */
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

        <div className="ed-dayplan">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="ed-dayplan__card"
            >
              <span className="ed-dayplan__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="ed-dayplan__time">{item.time}</p>
              <h3 className="ed-dayplan__title">{item.title}</h3>
              {item.description ? (
                <p className="ed-dayplan__desc">{item.description}</p>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
