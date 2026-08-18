"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import Media from "../components/Media";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

/** Dark panel that overlaps a dimmed cinemascope still. */
const InviteText: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

  return (
    <section id={id} className="vd-section">
      <div className="vd-shell">
        <div className="vd-overlap">
          <Media src={data.imageUrl} className="vd-overlap__still" />

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="vd-overlap__panel"
          >
            <p className="vd-eyebrow">Poziv</p>
            <p className="vd-overlap__copy">{data.description}</p>
            <div className="vd-rule mt-8" />
            <p className="vd-eyebrow vd-eyebrow--muted mt-5">{event.names}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InviteText;
