"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { ScheduleSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { TerraMedia } from "../components/Media";

type Props = {
  section: ScheduleSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Schedule: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C45C26";
  const ink = theme.colors?.base?.secondary?.value ?? "#3D3429";
  const olive = theme.colors?.base?.ternary?.value ?? "#5C6B4A";
  const items = data.items ?? [];

  return (
    <section id={id} className="vt-section bg-vt-cream">
      <div className="vt-container">
        <div className="mb-14 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vt-eyebrow mb-6"
            style={{ color: olive }}
          >
            Tok dana
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vt-display"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="vt-body mt-5 text-vt-muted">{data.subtitle}</p>
          ) : null}
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {data.imageUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hidden lg:col-span-4 lg:block"
            >
              <TerraMedia
                src={data.imageUrl}
                alt={data.title}
                className="vt-soft sticky top-24 aspect-[3/4] w-full"
              />
            </motion.div>
          ) : null}

          <div
            className={
              data.imageUrl ? "lg:col-span-8" : "lg:col-span-12"
            }
          >
            <ul className="space-y-4">
              {items.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                  className="vt-soft flex flex-col gap-3 border border-vt-line bg-vt-sand px-6 py-6 sm:flex-row sm:items-start sm:gap-8 sm:px-8"
                >
                  <span
                    className="shrink-0 text-sm uppercase tracking-[0.28em]"
                    style={{ color: accent }}
                  >
                    {item.time}
                  </span>
                  <div>
                    <h3
                      className="text-xl sm:text-2xl"
                      style={{
                        fontFamily: "var(--font-primary)",
                        color: ink,
                      }}
                    >
                      {item.title}
                    </h3>
                    {item.description ? (
                      <p className="vt-body mt-2 text-vt-muted">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
