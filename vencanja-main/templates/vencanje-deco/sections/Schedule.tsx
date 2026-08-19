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
    <section id={id} className="vd-section">
      <div className="vd-shell">
        <div className="mb-12 text-center">
          <p className="vd-eyebrow">{data.subtitle ?? "Program"}</p>
          <h2 className="vd-display mt-4">{data.title}</h2>
          <div className="vd-diamond mt-6" />
        </div>

        <div className="vd-timeline">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="vd-timeline-item"
            >
              <div className="sm:text-right">
                <p className="vd-meta sm:hidden">{item.time}</p>
                <p
                  className="hidden text-lg tracking-[0.08em] sm:block"
                  style={{
                    color: "var(--color-vd-gold)",
                    fontFamily: "var(--font-secondary)",
                    fontWeight: 500,
                  }}
                >
                  {item.time}
                </p>
              </div>

              <span className="vd-timeline-dot" aria-hidden />

              <div>
                <h3 className="vd-display-sm">{item.title}</h3>
                {item.description ? (
                  <p className="vd-body mt-2">{item.description}</p>
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
