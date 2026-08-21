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
    <section id={id} className="khny-section">
      <div className="khny-shell">
        <div className="mb-10 text-center">
          <p className="khny-lid mx-auto mb-4">{data.subtitle ?? "Program"}</p>
          <h2 className="khny-heading">{data.title}</h2>
        </div>

        <div className="mx-auto grid max-w-xl gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="khny-pot"
            >
              <p
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--color-khny-red)" }}
              >
                {item.time}
              </p>
              <h3 className="khny-heading mt-2 text-xl sm:text-2xl">
                {item.title}
              </h3>
              {item.description ? (
                <p className="khny-body mt-2 text-sm sm:text-base">
                  {item.description}
                </p>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
