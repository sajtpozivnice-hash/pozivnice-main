"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SageMedia } from "../components/Media";

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
        {data.imageUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-12 w-fit"
          >
            <SageMedia
              src={data.imageUrl}
              alt={event.names}
              className="h-24 w-24 rounded-full sm:h-28 sm:w-28"
            />
          </motion.div>
        ) : null}

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
                  ? "text-xl leading-[1.75] text-vs-ink first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:leading-[0.85] first-letter:font-normal sm:text-2xl sm:leading-[1.7] sm:first-letter:text-7xl"
                  : "vs-body text-vs-muted"
              }
              style={
                index === 0
                  ? { fontFamily: "var(--font-primary)", textAlign: "left" }
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

        <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-vs-muted">
          {event.names}
        </p>
      </div>
    </section>
  );
};

export default InviteText;
