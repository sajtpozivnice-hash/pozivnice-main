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

const InviteText: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const text = (data.description || "18.\nJEDNA NOĆ.\nBEZ PONAVLJANJA.").trim();

  return (
    <section id={id} className="bn-section bn-intro overflow-hidden">
      <div className="bn-grain" aria-hidden />
      <div className="bn-shell relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bn-label mb-8"
        >
          Izjava
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bn-intro__title"
        >
          {text}
        </motion.h2>
      </div>
    </section>
  );
};

export default InviteText;
