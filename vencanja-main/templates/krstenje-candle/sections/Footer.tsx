"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

  return (
    <section id={id} className="kd-section">
      <div className="kd-glow bottom-0 left-1/2 h-72 w-72 -translate-x-1/2" />

      <div className="kd-container-narrow relative z-10 text-center">
        {/* Night chapel closing plaque — a row of votive flames above the farewell */}
        <div className="kd-vigil-row">
          {Array.from({ length: 5 }).map((_, index) => (
            <Flame
              key={index}
              className="h-4 w-4"
              style={{ opacity: index === 2 ? 1 : 0.35 }}
            />
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-3xl leading-snug text-kd-ink sm:text-4xl"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {data.title}
        </motion.h2>

        {data.description ? (
          <p className="mt-4 text-sm text-kd-ink-soft">{data.description}</p>
        ) : null}

        <p className="mt-8 text-xs uppercase tracking-[0.32em] text-kd-champagne">
          {event.names}
        </p>
      </div>
    </section>
  );
};

export default Footer;
