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
    <section id={id} className="vg-section">
      <div className="vg-shell">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="vg-kicker">Program</p>
            <h2 className="vg-display mt-3">{data.title}</h2>
          </div>
          {data.subtitle ? <p className="vg-meta">{data.subtitle}</p> : null}
        </div>

        <div className="vg-bar mb-2" />

        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="vg-row"
          >
            <span className="vg-row-idx">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="vg-row-time">{item.time}</span>
            <div>
              <h3 className="vg-row-title">{item.title}</h3>
              {item.description ? (
                <p className="vg-body mt-2 max-w-xl">{item.description}</p>
              ) : null}
            </div>
          </motion.div>
        ))}

        <div className="vg-bar" />
      </div>
    </section>
  );
};

export default Schedule;
