"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
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
    <section id={id} className="ksaf-section">
      <div className="ksaf-shell">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="ksaf-eyebrow mb-4">{name}</p>
            <h2 className="ksaf-heading">{data.title}</h2>
            {data.subtitle ? (
              <p className="mt-3 max-w-md text-ksaf-ink/60">{data.subtitle}</p>
            ) : null}
          </div>
          {data.imageUrl ? (
            <div className="hidden overflow-hidden rounded-xl border-2 border-ksaf-ink/15 sm:block sm:w-40 lg:w-52">
              <img
                src={data.imageUrl}
                alt=""
                className="aspect-square w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}
        </div>

        <div className="ksaf-rail flex flex-col gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="ksaf-rail-item"
            >
              <span className="ksaf-waypoint">
                <MapPin className="h-4 w-4" />
              </span>

              <div className="ksaf-card w-full p-5 sm:p-6">
                <p
                  className="text-sm font-bold tracking-wide"
                  style={{ color: "var(--color-ksaf-ochre)" }}
                >
                  {item.time}
                </p>
                <h3
                  className="mt-2 text-2xl leading-tight"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-ksaf-ink/60">
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
