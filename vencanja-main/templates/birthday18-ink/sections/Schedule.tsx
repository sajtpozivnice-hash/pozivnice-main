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
    <section id={id} className="b18i-section">
      <div className="b18i-shell max-w-3xl">
        <p className="b18i-eyebrow mb-3">{data.subtitle || "Sadržaj"}</p>
        <h2 className="b18i-display mb-8 text-3xl sm:text-4xl">{data.title}</h2>
        <div className="b18i-rule--thin mb-2" />
        <div>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="b18i-toc__row flex-wrap"
            >
              <span className="b18i-toc__num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="b18i-toc__title">{item.title}</span>
              <span className="b18i-toc__leader" aria-hidden />
              <span className="b18i-toc__time">{item.time}</span>
              {item.description ? (
                <span className="b18i-toc__desc">{item.description}</span>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
