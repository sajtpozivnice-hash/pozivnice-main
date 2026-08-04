"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value;

  return (
    <section id={id} className="v3-section bg-v3-ivory">
      <div className="v3-container-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="v3-eyebrow mb-6"
        >
          {event.names}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl leading-snug sm:text-4xl"
          style={{
            fontFamily: "var(--font-primary)",
            color: theme.colors?.base?.secondary?.value,
          }}
        >
          {data.title}
        </motion.h2>
        <div
          className="mx-auto mt-10 h-px w-16"
          style={{ background: accent }}
        />
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-v3-muted">
          Sa ljubavlju
        </p>
      </div>
    </section>
  );
};

export default Footer;
