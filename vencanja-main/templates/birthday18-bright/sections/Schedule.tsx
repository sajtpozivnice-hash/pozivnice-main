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
    <section id={id} className="b18b-section overflow-hidden">
      <div className="b18b-blob b18b-blob--lilac b18b-float absolute right-0 top-10 h-52 w-52" />
      <div className="b18b-shell relative z-10">
        <div className="mb-12 text-center">
          <p className="b18b-eyebrow mb-3">{data.subtitle}</p>
          <h2 className="b18b-heading">{data.title}</h2>
        </div>

        {/* Horizontal ticket carousel with a circular time badge clipped over the corner — not a vertical spine or grid */}
        <div className="b18b-schedule-row">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, x: 22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="b18b-schedule-card"
            >
              <span className="b18b-schedule-badge">{item.time}</span>
              <h3
                className="mt-6 text-xl font-extrabold tracking-wide uppercase sm:text-2xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {item.title}
              </h3>
              {item.description ? (
                <p className="mt-2 text-sm leading-relaxed text-[var(--b18b-muted)]">
                  {item.description}
                </p>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
