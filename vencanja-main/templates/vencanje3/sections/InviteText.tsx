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

const InviteText: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const ink = theme.colors?.base?.secondary?.value;

  return (
    <section id={id} className="v3-section bg-white">
      <div className="v3-container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="v3-card px-6 py-12 sm:px-12 sm:py-16"
        >
          <div className="v3-divider mb-8" />
          <p
            className="text-xl leading-relaxed sm:text-2xl sm:leading-relaxed"
            style={{
              fontFamily: "var(--font-primary)",
              color: ink,
            }}
          >
            {data.description}
          </p>
          <div className="v3-divider mt-8" />
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
