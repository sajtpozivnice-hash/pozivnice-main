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
    <section id={id} className="km-section">
      <div className="km-container-narrow">
        <div className="mb-14">
          <p className="km-eyebrow mb-3">Raspored</p>
          <h2 className="km-heading">{data.title}</h2>
          {data.subtitle ? (
            <p className="km-subheading">{data.subtitle}</p>
          ) : null}
        </div>

        {/* Dense time | title table, not a flat list */}
        <div className="km-table">
          <div className="km-table-head">
            <span>Vreme</span>
            <span>Program</span>
          </div>

          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="km-table-row"
            >
              <span className="km-table-time">{item.time}</span>
              <div>
                <p className="km-table-title">{item.title}</p>
                {item.description ? (
                  <p className="km-table-desc">{item.description}</p>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
