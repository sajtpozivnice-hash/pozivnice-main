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
    <section id={id} className="kc-section">
      <div className="kc-container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kc-plate px-8 py-14 sm:px-16 sm:py-20"
        >
          <div className="kc-ornament mb-8">
            <span className="kc-ornament-dot" />
          </div>
          <p
            className="text-xl leading-relaxed italic sm:text-2xl sm:leading-relaxed"
            style={{
              fontFamily: "var(--font-primary)",
              color: "var(--color-kc-ink)",
            }}
          >
            {data.description}
          </p>
          <div className="kc-ornament mt-8">
            <span className="kc-ornament-dot" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
