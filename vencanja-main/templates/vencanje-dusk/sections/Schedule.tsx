"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { ScheduleSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import Media from "../components/Media";

type Props = {
  section: ScheduleSection;
  event: EventConfig;
  theme: ThemeConfig;
};

/** Vertical day timeline — no horizontal slider. */
const Schedule: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const items = data.items ?? [];
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section id={id} className="vd-section">
      <div className="vd-shell">
        <div className="mb-10 max-w-2xl">
          <p className="vd-eyebrow">Tok dana</p>
          <h2 className="vd-title mt-3">{data.title}</h2>
          {data.subtitle ? (
            <p className="vd-body mt-3">{data.subtitle}</p>
          ) : null}
        </div>

        <div className={hasImage ? "vd-split" : undefined}>
          {hasImage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Media src={data.imageUrl} className="vd-split__still" />
            </motion.div>
          ) : null}

          <div className="vd-day">
            {items.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="vd-day__row"
              >
                <p className="vd-day__time">{item.time}</p>
                <div>
                  <p className="vd-day__index">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(items.length).padStart(2, "0")}
                  </p>
                  <h3 className="vd-day__title">{item.title}</h3>
                  {item.description ? (
                    <p className="vd-day__desc">{item.description}</p>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
