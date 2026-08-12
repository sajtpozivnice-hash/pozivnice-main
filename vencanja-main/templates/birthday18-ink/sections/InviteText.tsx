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
  const [headline, ...rest] = raw.split("\n\n");
  const body = rest.join("\n\n") || raw;

  return (
    <section id={id} className="b18i-section">
      {/* Single-column newspaper article — oversized drop cap, no headline/body grid split */}
      <div className="b18i-shell b18i-invite-column">
        <p className="b18i-eyebrow mb-3 text-center">Uvodnik</p>
        <h2 className="b18i-display b18i-invite__headline text-center">
          {headline || `${event.names} navršava 18`}
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18i-invite__copy b18i-invite__copy--article mt-8"
        >
          {body}
        </motion.p>
        <div className="b18i-pullquote b18i-pullquote--center mt-8">
          „Osamnaest se slavi jednom — ostalo su reprize.“
        </div>
      </div>
    </section>
  );
};

export default InviteText;
