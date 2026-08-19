"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { Wave } from "../components/Ornaments";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

  return (
    <section id={id} className="vb-section">
      <div className="vb-shell text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85 }}
        >
          <div className="vb-arch" />
          <p className="vb-kicker mt-8">{data.title || "Vidimo se"}</p>
          <h2 className="vb-script mt-5 text-[clamp(2.8rem,9vw,5rem)]">
            {event.names}
          </h2>
          <Wave className="vb-wave mt-6" />
          {data.subtitle ? (
            <p className="vb-body mx-auto mt-6 max-w-md">{data.subtitle}</p>
          ) : null}
          {data.description ? (
            <p className="vb-body mx-auto mt-2 max-w-md">{data.description}</p>
          ) : null}
          <p className="vb-meta mt-8">
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
