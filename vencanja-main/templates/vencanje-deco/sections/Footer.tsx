"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

  return (
    <section id={id} className="vd-section">
      <div className="vd-shell">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85 }}
          className="vd-double-frame mx-auto max-w-lg text-center"
        >
          <span className="vd-corner tl" aria-hidden />
          <span className="vd-corner tr" aria-hidden />
          <span className="vd-corner bl" aria-hidden />
          <span className="vd-corner br" aria-hidden />

          <p className="vd-eyebrow">{data.title || "Sa ljubavlju"}</p>
          <div className="vd-diamond mt-6" />
          <h2 className="vd-script mt-8 text-[clamp(2.2rem,6vw,3.5rem)]">
            {event.names}
          </h2>
          {data.subtitle ? (
            <p className="vd-body mt-5">{data.subtitle}</p>
          ) : null}
          {data.description ? (
            <p className="vd-body mt-2">{data.description}</p>
          ) : null}
          <div className="vd-rule mt-8" />
          <p className="vd-meta mt-8">
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
