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
    <section id={id} className="kpas-section">
      <div className="kpas-shell max-w-3xl">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="kpas-eyebrow mb-4">{name}</p>
            <h2 className="kpas-heading">{data.title}</h2>
            {data.subtitle ? (
              <p className="mt-3 text-kpas-ink/55">{data.subtitle}</p>
            ) : null}
          </div>
          {data.imageUrl ? (
            <div className="mx-auto hidden overflow-hidden rounded-2xl border-4 border-kpas-paper shadow-[0_16px_32px_-20px_rgba(74,63,82,0.35)] sm:mx-0 sm:block sm:w-40 lg:w-52">
              <img
                src={data.imageUrl}
                alt=""
                className="aspect-square w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}
        </div>

        <div className="kpas-card-strong px-6 py-4 sm:px-10 sm:py-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="kpas-toc-row last:border-b-0"
            >
              <h3
                className="shrink-0 text-lg sm:text-xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {item.title}
              </h3>
              <span className="kpas-toc-leader" />
              <span className="kpas-toc-time">{item.time}</span>
            </motion.div>
          ))}
        </div>

        {items.some((item) => item.description) ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {items
              .filter((item) => item.description)
              .map((item) => (
                <div key={item.id}>
                  <p className="kpas-page-number mb-1">{item.time}</p>
                  <p className="text-sm leading-relaxed text-kpas-ink/60">
                    {item.description}
                  </p>
                </div>
              ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Schedule;
