"use client";

import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScheduleSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: ScheduleSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Schedule: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const items = data.items ?? [];
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section id={id} className="ks-section">
      <div className="ks-wash top-10 -left-16 h-64 w-64 bg-ks-sand" />

      <div className="ks-container-narrow">
        <div className="mb-14 text-center">
          <p className="ks-script mb-2">Kako će teći dan</p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="ks-heading"
          >
            {data.title}
          </motion.h2>
          {data.subtitle ? (
            <p className="ks-subheading">{data.subtitle}</p>
          ) : null}
        </div>

        {/* Soft accordion — tap a block to unfold its details */}
        <div className="ks-accordion">
          {items.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="ks-accordion-item"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="ks-accordion-trigger"
                >
                  <span className="ks-accordion-time">{item.time}</span>
                  <span className="ks-accordion-title">{item.title}</span>
                  <ChevronDown
                    className={`h-5 w-5 ks-accordion-icon ${
                      isOpen ? "ks-accordion-icon--open" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && item.description ? (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="ks-accordion-body">{item.description}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
