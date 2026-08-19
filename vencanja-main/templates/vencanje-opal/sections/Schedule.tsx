"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { ScheduleSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { OpalMedia } from "../components/Media";

type Props = {
  section: ScheduleSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Schedule: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C9A9A0";
  const ink = theme.colors?.base?.secondary?.value ?? "#3A3532";
  const items = data.items ?? [];
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section id={id} className="vo-section bg-vo-pearl-deep">
      <div
        className={
          hasImage
            ? "vo-container grid gap-12 lg:grid-cols-12 lg:gap-16"
            : "vo-container-narrow"
        }
      >
        <div className={hasImage ? "lg:col-span-5" : undefined}>
          <div className={hasImage ? "mb-10 lg:mb-0" : "mb-12 text-center"}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="vo-eyebrow mb-4"
              style={{ color: accent }}
            >
              Raspored
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="vo-display"
              style={{ color: ink }}
            >
              {data.title}
            </motion.h2>
            {data.subtitle ? (
              <p className="vo-body mt-4">{data.subtitle}</p>
            ) : null}
          </div>

          {hasImage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 hidden lg:block"
            >
              <OpalMedia
                src={data.imageUrl}
                alt={data.title}
                className="aspect-[5/6] w-full rounded-[2rem]"
              />
            </motion.div>
          ) : null}
        </div>

        <div
          className={
            hasImage
              ? "flex flex-col gap-4 lg:col-span-7"
              : "flex flex-col gap-4"
          }
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="vo-vellum flex flex-col gap-2 rounded-2xl px-6 py-5 sm:flex-row sm:items-baseline sm:gap-8 sm:px-8 sm:py-6"
            >
              <p
                className="shrink-0 text-sm tracking-[0.14em]"
                style={{
                  fontFamily: "var(--font-secondary)",
                  color: accent,
                }}
              >
                {item.time}
              </p>
              <div>
                <h3
                  className="text-xl sm:text-2xl"
                  style={{ fontFamily: "var(--font-primary)", color: ink }}
                >
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="vo-body mt-1">
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
