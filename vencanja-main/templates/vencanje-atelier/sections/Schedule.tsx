"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { ScheduleSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { Media } from "../components/Media";

type Props = {
  section: ScheduleSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Schedule: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const items = data.items ?? [];
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section id={id} className="va-section bg-va-paper">
      <div
        className={
          hasImage
            ? "va-shell grid items-center gap-10 lg:grid-cols-12 lg:gap-12"
            : "va-shell max-w-3xl"
        }
      >
        <div className={hasImage ? "lg:col-span-5" : undefined}>
          <p className="va-eyebrow">Raspored</p>
          <h2 className="va-display mt-4">{data.title}</h2>
          {data.subtitle ? (
            <p className="va-caption mt-3">{data.subtitle}</p>
          ) : null}

          {hasImage ? (
            <div className="mt-8 hidden lg:block">
              <Media
                src={data.imageUrl}
                alt={data.title}
                className="aspect-[4/5] w-full"
              />
            </div>
          ) : null}
        </div>

        <div className={hasImage ? "lg:col-span-7" : "mt-8"}>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="va-row"
            >
              <span className="va-row-time">{item.time}</span>
              <div>
                <h3 className="va-row-title">{item.title}</h3>
                {item.description ? (
                  <p className="va-body mt-1.5 text-va-muted">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </motion.div>
          ))}
          <div className="va-rule" />
        </div>
      </div>
    </section>
  );
};

export default Schedule;
