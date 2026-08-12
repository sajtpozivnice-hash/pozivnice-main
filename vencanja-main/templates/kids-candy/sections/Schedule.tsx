"use client";

import { CSSProperties, FC } from "react";
import { motion } from "framer-motion";
import { ScheduleSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: ScheduleSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const TAGS = ["kcan-lime", "kcan-turquoise", "kcan-yellow", "kcan-pink"];

const Schedule: FC<Props> = ({ section }) => {
  const { data, id, name } = section;
  const items = data.items ?? [];

  return (
    <section id={id} className="kcan-section">
      <div className="kcan-shell">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kcan-kicker w-fit">{name}</p>
            <h2 className="kcan-heading mt-5">{data.title}</h2>
            {data.subtitle ? (
              <p className="mt-3 max-w-md text-sm font-semibold text-kcan-ink/55">
                {data.subtitle}
              </p>
            ) : null}
          </div>
          {data.imageUrl ? (
            <div className="kcan-card hidden overflow-hidden sm:block sm:w-40 lg:w-52">
              <img
                src={data.imageUrl}
                alt=""
                className="aspect-square w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}
        </div>

        <div className="kcan-bill-strip">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="kcan-bill"
              style={
                {
                  "--bill-color": `var(--color-${TAGS[index % TAGS.length]})`,
                } as CSSProperties
              }
            >
              <span className="kcan-bill-tape kcan-bill-tape--l" />
              <span className="kcan-bill-tape kcan-bill-tape--r" />
              <span className="kcan-bill-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="kcan-bill-time">{item.time}</div>
              <h3 className="kcan-bill-title">{item.title}</h3>
              {item.description ? (
                <p className="kcan-bill-desc">{item.description}</p>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
