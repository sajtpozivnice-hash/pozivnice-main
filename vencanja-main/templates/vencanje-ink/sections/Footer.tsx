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

const Footer: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#111111";

  return (
    <section id={id} className="vi-section-tight pb-16">
      <div className="vi-shell">
        <Media src={data.imageUrl} alt="" className="vi-plate-strip" />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="mt-12"
        >
          <div className="vi-rule-ink" />

          <div className="flex flex-wrap items-baseline justify-between gap-4 py-6">
            <p className="vi-display-sm">{event.names}</p>
            <p className="vi-caption">
              {formatDate(event.date, "DD.MM.YYYY")}
            </p>
          </div>

          <div className="vi-rule" />

          <p className="vi-body mt-8 max-w-md">{data.title}</p>
          <div className="vi-accent mt-8" style={{ background: accent }} />
          {data.subtitle ? (
            <p className="vi-caption mt-5">{data.subtitle}</p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
