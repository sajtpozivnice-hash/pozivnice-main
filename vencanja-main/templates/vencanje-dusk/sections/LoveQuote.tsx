"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LoveQuoteSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import Media from "../components/Media";

type Props = {
  section: LoveQuoteSection;
  event: EventConfig;
  theme: ThemeConfig;
};

/** Full viewport blackout with a single copper quote. */
const LoveQuote: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

  return (
    <section id={id} className="vd-quote">
      <Media src={data.imageUrl} className="vd-quote__still" />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="vd-quote__inner"
      >
        <p className="vd-quote__mark">“</p>
        <p className="vd-quote__text">{data.title}</p>
        <div className="vd-rule mx-auto my-9" />
        <p className="vd-eyebrow vd-eyebrow--muted">
          {data.description || event.names}
        </p>
      </motion.div>
    </section>
  );
};

export default LoveQuote;
