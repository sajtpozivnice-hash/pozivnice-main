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

/** Studio call-sheet: bordered column table (time / activity / notes), not a leader-dot index list. */
const Schedule: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const items = [...(data.items || [])].sort((a, b) =>
    a.time.localeCompare(b.time),
  );

  return (
    <section id={id} className="b18a-section">
      <div className="b18a-shell max-w-3xl">
        <p className="b18a-label mb-3">{data.subtitle || "Call sheet"}</p>
        <h2 className="b18a-display mb-8 text-2xl sm:text-3xl">{data.title}</h2>
        <div className="b18a-callsheet">
          <div className="b18a-callsheet__head">
            <span>Vreme</span>
            <span>Aktivnost</span>
            <span>Napomena</span>
          </div>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="b18a-callsheet__row"
            >
              <span className="b18a-callsheet__time">{item.time}</span>
              <span className="b18a-callsheet__title">{item.title}</span>
              <span className="b18a-callsheet__desc">
                {item.description || "—"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
