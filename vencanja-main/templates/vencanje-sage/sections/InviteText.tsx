"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#6b7f6a";
  const paragraphs = (data.description ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section id={id} className="vs-section bg-vs-linen">
      <div className="vs-container-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vs-eyebrow"
          style={{ color: accent }}
        >
          Poziv
        </motion.p>

        <div className="mt-10 space-y-6">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={paragraph.slice(0, 24)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className={
                index === 0
                  ? "text-2xl leading-[1.75] text-vs-ink sm:text-3xl sm:leading-[1.7]"
                  : "vs-body text-vs-muted"
              }
              style={
                index === 0
                  ? { fontFamily: "var(--font-primary)" }
                  : undefined
              }
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-14 h-px w-20 origin-center"
          style={{ background: accent }}
        />

        <p className="mt-8 text-[13px] uppercase tracking-[0.36em] text-vs-muted sm:text-sm">
          {event.names}
        </p>
      </div>
    </section>
  );
};

export default InviteText;
