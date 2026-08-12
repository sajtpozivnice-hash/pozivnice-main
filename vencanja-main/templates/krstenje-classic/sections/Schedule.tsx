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

const Schedule: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const ink = theme.colors?.base?.secondary?.value;
  const items = data.items ?? [];

  return (
    <section id={id} className="kc-section">
      <div className="kc-container-narrow">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kc-eyebrow mb-4"
          >
            Red služenja
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kc-heading"
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="kc-subheading">{data.subtitle}</p>
          ) : null}
        </div>

        {/* Formal order-of-service list — plain aligned rows, no markers or nodes */}
        <div className="kc-order-list">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="kc-order-row"
            >
              <div className="flex items-baseline gap-3 sm:contents">
                <span className="kc-order-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="kc-order-time">{item.time}</span>
              </div>
              <h3 className="kc-order-title" style={{ color: ink }}>
                {item.title}
              </h3>
              {item.description ? (
                <p className="kc-order-desc">{item.description}</p>
              ) : (
                <span />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
