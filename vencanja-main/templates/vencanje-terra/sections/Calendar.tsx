"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { CalendarSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate, parseDate } from "@/helpers/formatDate";
import { TerraMedia } from "../components/Media";

type Props = {
  section: CalendarSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Calendar: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C45C26";
  const ink = theme.colors?.base?.secondary?.value ?? "#3D3429";
  const olive = theme.colors?.base?.ternary?.value ?? "#5C6B4A";
  const parsed = parseDate(event.date);
  const dayNumber = parsed ? String(parsed.getDate()).padStart(2, "0") : "";
  const year = parsed ? String(parsed.getFullYear()) : "";
  const weekday = formatDate(event.date, "DAY_D_MMMM_YYYY").split(",")[0];

  return (
    <section id={id} className="vt-section bg-vt-cream">
      <div className="vt-container">
        <div className="vt-soft overflow-hidden border border-vt-line bg-vt-sand">
          <div className="grid lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:col-span-7 lg:py-16"
            >
              <p className="vt-eyebrow mb-8" style={{ color: olive }}>
                {data.title}
              </p>

              <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
                <span
                  className="text-[5.5rem] leading-[0.85] tracking-[-0.04em] sm:text-[8rem]"
                  style={{ fontFamily: "var(--font-primary)", color: accent }}
                >
                  {dayNumber}
                </span>
                <div className="pb-2">
                  <p
                    className="text-2xl capitalize leading-none sm:text-3xl"
                    style={{ fontFamily: "var(--font-primary)", color: ink }}
                  >
                    {formatDate(event.date, "MMMM")}
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.36em] text-vt-muted">
                    {year}
                  </p>
                </div>
              </div>

              <p className="mt-8 text-sm capitalize tracking-[0.2em] text-vt-ink-soft">
                {weekday}
              </p>

              {data.description ? (
                <p className="vt-body mt-6 max-w-md text-vt-muted">
                  {data.description}
                </p>
              ) : null}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <TerraMedia
                src={data.imageUrl}
                alt={data.title ?? "Sačuvajte datum"}
                className="aspect-[4/5] h-full min-h-72 w-full lg:rounded-none"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
