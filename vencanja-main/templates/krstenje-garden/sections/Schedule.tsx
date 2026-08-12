"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
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
    <section id={id} className="kg-section bg-white">
      <div className="kg-container-narrow">
        <div className="mb-14 text-center">
          <div className="kg-eyebrow justify-center">
            <Leaf className="h-3.5 w-3.5" />
            Koraci proslave
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kg-heading mt-4"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="kg-subheading">{data.subtitle}</p>
          ) : null}
        </div>

        {/* Winding garden path — numbered leaf-badge steps along a thick vine trail */}
        <div className="kg-steps">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="kg-step"
            >
              <span className="kg-step-badge">
                <Leaf className="h-4 w-4" />
                <em>{String(index + 1).padStart(2, "0")}</em>
              </span>

              <div className="kg-card kg-step-card">
                <p className="text-[10px] uppercase tracking-[0.3em] text-kg-champagne">
                  Korak {index + 1}
                </p>
                <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                  <h3
                    className="text-xl sm:text-2xl"
                    style={{ fontFamily: "var(--font-primary)", color: ink }}
                  >
                    {item.title}
                  </h3>
                  <span className="text-xs uppercase tracking-[0.24em] text-kg-champagne-soft">
                    {item.time}
                  </span>
                </div>
                {item.description ? (
                  <p className="mt-2 text-sm text-kg-muted">
                    {item.description}
                  </p>
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
