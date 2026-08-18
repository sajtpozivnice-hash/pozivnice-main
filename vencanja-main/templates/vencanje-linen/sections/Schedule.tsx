"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { ScheduleSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { LinenMedia } from "../components/Media";

type Props = {
  section: ScheduleSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Schedule: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C4A574";
  const ink = theme.colors?.base?.secondary?.value ?? "#2A2420";
  const items = data.items ?? [];
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section id={id} className="vl-section vl-linen-ground">
      <div
        className={
          hasImage
            ? "vl-container grid gap-12 lg:grid-cols-12 lg:gap-14"
            : "vl-container max-w-2xl"
        }
      >
        <div className={hasImage ? "lg:col-span-5" : undefined}>
          <div className={hasImage ? "mb-10 lg:mb-0" : "mb-14 text-center"}>
            <p className="vl-eyebrow mb-4" style={{ color: accent }}>
              Raspored
            </p>
            <h2 className="vl-display" style={{ color: ink }}>
              {data.title}
            </h2>
            {data.subtitle ? (
              <p className="vl-body mt-4 text-vl-muted">{data.subtitle}</p>
            ) : null}
          </div>

          {hasImage ? (
            <div className="mt-10 hidden lg:block">
              <LinenMedia
                src={data.imageUrl}
                alt={data.title}
                className="aspect-[5/6] w-full"
              />
            </div>
          ) : null}
        </div>

        <ul className={hasImage ? "space-y-0 lg:col-span-7" : "space-y-0"}>
          {items.map((item, index) => (
            <motion.li
              key={item.id ?? `${item.time}-${index}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="border-t border-vl-line py-7 first:border-t-0 first:pt-0"
            >
              <div className="grid grid-cols-[5.5rem_1fr] gap-5 sm:grid-cols-[6.5rem_1fr] sm:gap-8">
                <span
                  className="pt-1 text-sm tracking-[0.12em] tabular-nums sm:text-base"
                  style={{
                    fontFamily: "var(--font-secondary)",
                    color: accent,
                  }}
                >
                  {item.time}
                </span>
                <div>
                  <h3
                    className="text-xl sm:text-2xl"
                    style={{ fontFamily: "var(--font-primary)", color: ink }}
                  >
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="vl-body mt-2 text-[15px] text-vl-muted">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Schedule;
