"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { Media } from "../components/Media";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const hasImage = Boolean(data.imageUrl?.trim());

  if (hasImage) {
    return (
      <section
        id={id}
        className="relative min-h-[58svh] w-full overflow-hidden"
      >
        <Media
          src={data.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />

        <div className="relative z-10 flex min-h-[58svh] flex-col items-center justify-end px-5 pb-16 pt-28 text-center text-white sm:px-8 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.75 }}
          >
            <p className="text-[10px] uppercase tracking-[0.36em] text-white/70">
              {data.title || "Vidimo se"}
            </p>
            <p
              className="mt-5 text-4xl sm:text-5xl"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {data.subtitle || event.names}
            </p>
            <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-white/65">
              {formatDate(event.date, "DD.MM.YYYY")}
            </p>
            {data.description ? (
              <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/75">
                {data.description}
              </p>
            ) : null}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="va-section-tight pb-16 sm:pb-20">
      <div className="va-shell text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75 }}
        >
          <div className="va-rule-thin mb-8" />
          <p className="va-display">{data.title || event.names}</p>
          <p className="va-caption mt-4">
            {formatDate(event.date, "DD.MM.YYYY")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
