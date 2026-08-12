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
    <section id={id} className="b18c-band">
      <div className="b18c-shell text-center">
        <p className="b18c-kicker mb-3">Poziv</p>
        <h2 className="b18c-display text-3xl sm:text-4xl">
          {headline || `${event.names} slavi 18`}
        </h2>
      </div>

      {/* Surfboard-wide single line — full-bleed board shape with a stringer running through the copy */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="b18c-board"
      >
        <span className="b18c-board__stringer" aria-hidden />
        <p className="b18c-board__text">{body}</p>
      </motion.div>
    </section>
  );
};

export default InviteText;
