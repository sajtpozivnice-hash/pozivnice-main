"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Feather } from "lucide-react";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

  return (
    <section id={id} className="kpas-section pb-10 pt-6">
      <div className="kpas-shell max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kpas-colophon"
        >
          {data.imageUrl ? (
            <div className="kpas-colophon-thumb">
              <img src={data.imageUrl} alt="" referrerPolicy="no-referrer" />
            </div>
          ) : (
            <span className="kpas-seal kpas-colophon-seal">
              <Feather className="h-6 w-6" />
            </span>
          )}

          <h2 className="kpas-heading text-4xl sm:text-5xl">{data.title}</h2>
          {data.subtitle ? (
            <p className="mt-3 text-kpas-ink/60">{data.subtitle}</p>
          ) : null}
          {data.description ? (
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-kpas-ink/50">
              {data.description}
            </p>
          ) : null}

          <div className="kpas-divider" />

          <p className="kpas-colophon-names">{event.names}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
