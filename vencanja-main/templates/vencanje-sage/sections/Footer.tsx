"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#6b7f6a";
  const ink = theme.colors?.base?.secondary?.value ?? "#2c2a26";

  return (
    <section id={id} className="vs-section-tight bg-vs-sage-tint">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="vs-container-narrow text-center"
      >
        <p className="vs-eyebrow" style={{ color: accent }}>
          {event.names}
        </p>

        <h2
          className="mt-8 text-3xl leading-snug sm:text-4xl"
          style={{ fontFamily: "var(--font-primary)", color: ink }}
        >
          {data.title}
        </h2>

        {data.subtitle ? (
          <p className="vs-body mt-5 text-vs-muted">{data.subtitle}</p>
        ) : null}

        {data.description ? (
          <p className="vs-body mt-3 text-vs-muted">{data.description}</p>
        ) : null}

        <span
          className="mx-auto mt-10 block h-px w-16"
          style={{ background: accent }}
        />

        <p className="mt-8 text-[13px] uppercase tracking-[0.36em] text-vs-muted sm:text-sm">
          {formatDate(event.date, "DD.MM.YYYY")}
        </p>
      </motion.div>
    </section>
  );
};

export default Footer;
