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
  const { data, id, name } = section;
  const items = data.items ?? [];

  return (
    <section id={id} className="kspc-section">
      <div className="kspc-shell">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="kspc-eyebrow mx-auto justify-center sm:mx-0 sm:justify-start">{name}</p>
            <h2 className="kspc-heading mt-4">{data.title}</h2>
            {data.subtitle ? (
              <p className="mt-3 text-white/55">{data.subtitle}</p>
            ) : null}
          </div>
          {data.imageUrl ? (
            <div className="mx-auto hidden overflow-hidden rounded-xl border border-white/15 sm:mx-0 sm:block sm:w-40 lg:w-52">
              <img
                src={data.imageUrl}
                alt=""
                className="aspect-square w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-4">
          {items.map((item, index) => (
            <div key={item.id} className="flex flex-1 items-center gap-4 sm:flex-col sm:items-stretch sm:gap-0">
              <div className="flex items-center gap-4 sm:w-full sm:justify-center">
                <span className="kspc-mission-node">{String(index + 1).padStart(2, "0")}</span>
                {index < items.length - 1 ? <span className="kspc-mission-line" /> : null}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="kspc-card mt-0 flex-1 p-5 sm:mt-5"
              >
                <p
                  className="text-sm font-bold tracking-wide"
                  style={{ color: "var(--color-kspc-cyan)" }}
                >
                  {item.time}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white/90">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {item.description}
                  </p>
                ) : null}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
