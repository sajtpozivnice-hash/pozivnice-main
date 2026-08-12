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

const InviteText: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const raw = data.description?.trim() || "";

  return (
    <section id={id} className="gala-section gala-invite">
      <div className="gala-shell gala-invite__grid">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="gala-display gala-invite__giant"
        >
          {event.names?.split(/\s+/)[0] || "18"}
        </motion.p>
        <div>
          <p className="gala-kicker mb-4">Program večeri</p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gala-invite__copy"
          >
            {raw}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default InviteText;
