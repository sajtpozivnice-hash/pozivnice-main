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
  const { data, id, name } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#FF5C8A";
  const secondary = theme.colors?.base?.secondary?.value ?? "#3D8BFF";
  const ternary = theme.colors?.base?.ternary?.value ?? "#2EC4B6";
  const colors = [accent, secondary, ternary, "#FFB703", "#9B5DE5"];
  const items = data.items ?? [];

  return (
    <section id={id} className="bday-section">
      <div className="bday-shell">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="bday-eyebrow mb-4">{name}</p>
            <h2 className="bday-heading">{data.title}</h2>
            {data.subtitle ? (
              <p className="mt-3 max-w-md text-black/55">{data.subtitle}</p>
            ) : null}
          </div>
          {data.imageUrl ? (
            <div className="hidden overflow-hidden rounded-3xl sm:block sm:w-40 lg:w-52">
              <img
                src={data.imageUrl}
                alt=""
                className="aspect-square w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}
        </div>

        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {items.map((item, index) => {
            const color = colors[index % colors.length] ?? accent;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="bday-card-strong relative min-w-[78%] snap-center p-5 sm:min-w-0"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1.5 rounded-t-[1.75rem]"
                  style={{ background: color }}
                />
                <p
                  className="text-sm font-black tracking-wide"
                  style={{ color }}
                >
                  {item.time}
                </p>
                <h3
                  className="mt-3 text-2xl leading-tight"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-black/55">
                    {item.description}
                  </p>
                ) : null}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
