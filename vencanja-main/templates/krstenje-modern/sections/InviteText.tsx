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
    <section id={id} className="km-section">
      <div className="km-container-narrow">
        <div className="km-divider mb-8" />
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg leading-relaxed sm:text-xl sm:leading-relaxed"
          style={{
            fontFamily: "var(--font-secondary)",
            color: "var(--color-km-ink)",
          }}
        >
          {data.description}
        </motion.p>
      </div>
    </section>
  );
};

export default InviteText;
