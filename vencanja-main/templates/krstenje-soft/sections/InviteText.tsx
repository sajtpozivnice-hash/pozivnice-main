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

  return (
    <section id={id} className="ks-section">
      <div className="ks-wash top-0 right-1/4 h-72 w-72 bg-ks-champagne-soft/30" />

      <div className="ks-container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ks-card px-6 py-14 sm:px-14 sm:py-16"
        >
          <span className="ks-script mb-4 block">✿</span>
          <p
            className="text-xl leading-relaxed sm:text-2xl sm:leading-relaxed"
            style={{
              fontFamily: "var(--font-primary)",
              color: "var(--color-ks-ink)",
            }}
          >
            {data.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
