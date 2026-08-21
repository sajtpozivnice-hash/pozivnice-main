"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { ScheduleSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: ScheduleSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Schedule: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const ink = theme.colors?.base?.secondary?.value;
  const items = data.items ?? [];

  return (
    <section id={id} className="kd-section">
      <div className="kd-container-narrow">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kd-eyebrow mb-4"
          >
            Red večeri
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kd-heading"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="kd-subheading">{data.subtitle}</p>
          ) : null}
        </div>

        {/* Horizontal scroll of time cards */}
        <div className="kd-time-rail">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="kd-time-card"
            >
              <Flame className="h-4 w-4 text-kd-champagne" />
              <p className="kd-time-card__time">{item.time}</p>
              <h3 className="kd-time-card__title" style={{ color: ink }}>
                {item.title}
              </h3>
              {item.description ? (
                <p className="kd-time-card__desc">{item.description}</p>
              ) : null}
            </motion.div>
          ))}
        </div>
        <p className="kd-time-rail-hint">Prevucite za više →</p>
      </div>
    </section>
  );
};

export default Schedule;
