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

/** Lookbook spread: spine index + open page, not the coast kicker-over-copy stack. */
const InviteText: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const raw = data.description?.trim() || "";
  const [headline, ...rest] = raw.split("\n\n");
  const body = rest.join("\n\n") || raw;

  return (
    <section id={id} className="b18a-section">
      <div className="b18a-shell b18a-spread">
        <div className="b18a-spread__spine">
          <span className="b18a-spread__num">01</span>
          <span className="b18a-spread__tag">Poziv</span>
        </div>
        <div className="b18a-spread__page">
          <h2 className="b18a-display text-2xl sm:text-3xl">
            {headline || `${event.names} navršava 18`}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="b18a-invite__copy"
          >
            {body}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default InviteText;
