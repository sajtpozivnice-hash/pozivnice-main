"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurStorySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: OurStorySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurStory: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const paragraphs = (data.text ?? "")
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <section id={id} className="vg-section bg-[var(--color-vg-paper-deep)]">
      <div className="vg-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-vg-ink)] pb-6">
            <div>
              <p className="vg-kicker">{data.overline ?? "Folio"}</p>
              <h2 className="vg-display mt-3">{data.title}</h2>
            </div>
            {data.subtitle ? (
              <p className="vg-meta max-w-xs sm:text-right">{data.subtitle}</p>
            ) : null}
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="vg-body">
                <span
                  className="mb-3 block text-sm font-bold tracking-wide text-[var(--color-vg-blood)]"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
