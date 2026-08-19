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
    <section id={id} className="vg-section">
      <div className="vg-shell">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85 }}
        >
          <div className="vg-bar" />
          <div className="flex flex-col gap-8 py-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="vg-kicker">{data.title || "Vidimo se"}</p>
              <h2 className="vg-display mt-4">{event.names}</h2>
              {data.subtitle ? (
                <p className="vg-body mt-5 max-w-md">{data.subtitle}</p>
              ) : null}
              {data.description ? (
                <p className="vg-body mt-3 max-w-md">{data.description}</p>
              ) : null}
            </div>
            <p className="vg-meta sm:text-right">
              {formatDate(event.date, "DAY_D_MMMM_YYYY")}
            </p>
          </div>
          <div className="vg-bar" />
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
