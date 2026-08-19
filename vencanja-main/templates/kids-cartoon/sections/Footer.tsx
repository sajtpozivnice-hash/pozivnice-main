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
    <section id={id} className="kcart-section pb-20">
      <div className="kcart-shell">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kcart-panel relative overflow-hidden px-6 py-12 text-center sm:px-10 sm:py-14"
          style={{ background: "var(--color-kcart-sun)" }}
        >
          <span
            className="kcart-cloud left-6 top-6 h-8 w-14"
            aria-hidden
          />
          <span
            className="kcart-cloud bottom-8 right-8 h-10 w-16"
            aria-hidden
          />
          <p className="kcart-eyebrow mx-auto mb-5 w-fit bg-white">
            {data.title || "Vidimo se!"}
          </p>
          <h2 className="kcart-heading">{event.names}</h2>
          {data.subtitle ? (
            <p className="kcart-body mx-auto mt-4 max-w-md">{data.subtitle}</p>
          ) : null}
          {data.description ? (
            <p className="kcart-body mx-auto mt-2 max-w-md">
              {data.description}
            </p>
          ) : null}
          <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] opacity-60">
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
