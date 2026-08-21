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
    <section id={id} className="khny-section pb-20">
      <div className="khny-shell">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="khny-jar relative overflow-hidden px-6 py-12 text-center sm:px-10 sm:py-14"
          style={{
            background:
              "linear-gradient(160deg, var(--color-khny-honey), color-mix(in srgb, var(--color-khny-sky) 55%, var(--color-khny-cream)))",
          }}
        >
          <span className="khny-jar-lid" aria-hidden />
          <span className="khny-bee left-8 top-10" aria-hidden />
          <span
            className="khny-bee bottom-12 right-10"
            style={{ animationDelay: "0.8s" }}
            aria-hidden
          />
          <p className="khny-lid mx-auto mb-5 w-fit bg-[var(--color-khny-paper)]">
            {data.title || "Vidimo se!"}
          </p>
          <p className="khny-script">{event.names}</p>
          {data.subtitle ? (
            <p className="khny-body mx-auto mt-4 max-w-md">{data.subtitle}</p>
          ) : null}
          {data.description ? (
            <p className="khny-body mx-auto mt-2 max-w-md">{data.description}</p>
          ) : null}
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] opacity-60">
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
