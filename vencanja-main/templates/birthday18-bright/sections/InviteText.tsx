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
  const raw = data.description?.trim() || "";
  const parts = raw.split(/\n\n+/);
  const headline = parts[0] || "";
  const body = parts.slice(1).join("\n\n");

  return (
    <section id={id} className="b18b-section b18b-intro">
      <div className="b18b-blob b18b-blob--lilac absolute -right-10 top-0 h-48 w-48 opacity-40" />
      <div className="b18b-shell relative z-10 max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18b-heading whitespace-pre-line"
        >
          {headline}
        </motion.h2>
        {body ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="b18b-intro__body whitespace-pre-line"
          >
            {body}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
};

export default InviteText;
