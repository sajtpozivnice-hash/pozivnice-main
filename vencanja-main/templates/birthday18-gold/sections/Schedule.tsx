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
    <section id={id} className="gala-section">
      <div className="gala-shell max-w-3xl">
        <p className="gala-kicker mb-3">{data.subtitle || "Raspored"}</p>
        <h2 className="gala-display mb-3 text-4xl sm:text-5xl">{data.title}</h2>
        <p className="gala-sched__hint mb-6">Prevucite za više →</p>
        <div className="gala-sched">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="gala-sched__row"
            >
              <span className="gala-sched__time">{item.time}</span>
              <span className="gala-sched__title">{item.title}</span>
              {item.description ? (
                <p className="gala-sched__desc">{item.description}</p>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
