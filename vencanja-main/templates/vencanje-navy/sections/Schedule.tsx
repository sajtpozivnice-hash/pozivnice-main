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
    <section id={id} className="vn-section">
      <div
        className={
          hasImage
            ? "vn-shell grid gap-12 lg:grid-cols-12 lg:gap-14"
            : "vn-shell"
        }
      >
        <div className={hasImage ? "lg:col-span-5" : undefined}>
          <div className={hasImage ? "mb-10 lg:mb-0" : "mb-14 text-center"}>
            <p className="vn-eyebrow">Program</p>
            <h2 className="vn-display mt-4">{data.title}</h2>
            {data.subtitle ? (
              <p
                className={`vn-body mt-5 ${hasImage ? "max-w-md" : "mx-auto max-w-md"}`}
              >
                {data.subtitle}
              </p>
            ) : null}
          </div>

          {hasImage ? (
            <div className="mt-10 hidden lg:block">
              <Media
                src={data.imageUrl}
                alt={data.title}
                className="aspect-[5/6] w-full"
              />
            </div>
          ) : null}
        </div>

        <div className={hasImage ? "vn-program lg:col-span-7" : "vn-program"}>
          <div className="vn-hairline" />
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="vn-program-row"
            >
              <span className="vn-program-num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="vn-program-time hidden sm:block">
                {item.time}
              </span>
              <div>
                <p className="vn-program-time mb-2 sm:hidden">{item.time}</p>
                <h3 className="vn-display-sm">{item.title}</h3>
                {item.description ? (
                  <p className="vn-body mt-2 max-w-xl">{item.description}</p>
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
