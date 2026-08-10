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
    <section id={id} className="b18-section overflow-hidden">
      {data.imageUrl ? (
        <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
          <img
            src={data.imageUrl}
            alt=""
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#050506]/88" />
        </div>
      ) : null}

      <div className="b18-shell relative z-10">
        <div className="mb-14 text-center">
          <p className="b18-eyebrow mb-4">{data.subtitle}</p>
          <h2 className="b18-heading">{data.title}</h2>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="b18-panel grid grid-cols-[88px_1fr] items-start gap-4 p-5 sm:grid-cols-[120px_1fr] sm:gap-8 sm:p-6"
            >
              <p
                className="b18-metal text-2xl font-bold tracking-tight sm:text-3xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {item.time}
              </p>
              <div>
                <p className="text-lg font-semibold tracking-wide uppercase sm:text-xl">
                  {item.title}
                </p>
                {item.description ? (
                  <p className="mt-1.5 text-sm text-white/50">
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
