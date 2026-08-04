"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { ScheduleSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { PremiumMedia } from "../components/PremiumMedia";

type Props = {
  section: ScheduleSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Schedule: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#9c7a45";
  const ink = theme.colors?.base?.secondary?.value ?? "#1c1917";
  const items = data.items ?? [];

  return (
    <section id={id} className="vp-section bg-vp-paper">
      <div className="vp-container grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vp-eyebrow mb-4"
            style={{ color: accent }}
          >
            Timeline
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vp-display mb-4"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="vp-body mb-10 text-vp-muted">{data.subtitle}</p>
          ) : null}

          <PremiumMedia
            src={data.imageUrl}
            alt={data.title}
            className="hidden aspect-[4/5] w-full lg:block"
          />
        </div>

        <div className="lg:col-span-7">
          <div className="relative">
            <div className="absolute top-2 bottom-2 left-[4.5rem] w-px bg-vp-line sm:left-[5.5rem]" />

            <div className="space-y-0">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="relative grid grid-cols-[4.5rem_1fr] gap-6 border-b border-vp-line py-8 last:border-b-0 sm:grid-cols-[5.5rem_1fr] sm:gap-8"
                >
                  <p
                    className="pt-1 text-sm tracking-[0.12em]"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: accent,
                    }}
                  >
                    {item.time}
                  </p>
                  <div>
                    <span
                      className="absolute top-10 left-[4.2rem] h-2.5 w-2.5 rounded-full border border-vp-ink bg-vp-paper sm:left-[5.2rem]"
                      style={{ borderColor: accent }}
                    />
                    <h3
                      className="text-2xl sm:text-3xl"
                      style={{
                        fontFamily: "var(--font-primary)",
                        color: ink,
                      }}
                    >
                      {item.title}
                    </h3>
                    {item.description ? (
                      <p className="mt-2 text-sm text-vp-muted sm:text-base">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-10 lg:hidden">
            <PremiumMedia
              src={data.imageUrl}
              alt={data.title}
              className="aspect-[16/10] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
