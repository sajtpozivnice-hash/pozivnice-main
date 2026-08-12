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
    <section id={id} className="b18c-band">
      <div className="b18c-shell max-w-2xl">
        <p className="b18c-kicker mb-3">{data.subtitle || "Raspored"}</p>
        <h2 className="b18c-display mb-10 text-3xl sm:text-4xl">{data.title}</h2>
        <div className="b18c-timeline">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="b18c-timeline__item"
            >
              <p className="b18c-timeline__time">{item.time}</p>
              <h3 className="b18c-timeline__title">{item.title}</h3>
              {item.description ? (
                <p className="b18c-timeline__desc">{item.description}</p>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
