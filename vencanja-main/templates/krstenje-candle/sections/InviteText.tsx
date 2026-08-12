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
    <section id={id} className="kd-section">
      <div className="kd-glow top-0 right-1/3 h-56 w-56" />

      <div className="kd-container-narrow">
        {/* Liturgy block — cross rule above the reading, no icon-in-card layout */}
        <div className="kd-cross-rule" aria-hidden>
          <span className="kd-cross-rule__cross" />
        </div>
        <p className="kd-liturgy-kicker">Čitanje</p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kd-liturgy-text"
        >
          {data.description}
        </motion.p>
        <div className="kd-cross-rule kd-cross-rule--end" aria-hidden>
          <span className="kd-cross-rule__cross" />
        </div>
      </div>
    </section>
  );
};

export default InviteText;
