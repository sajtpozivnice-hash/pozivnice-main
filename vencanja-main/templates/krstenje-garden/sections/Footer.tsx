"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
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
    <section id={id} className="kg-section bg-kg-ivory">
      <div className="kg-container-narrow">
        {/* Vine divider with leaf ornaments, then a split closing: names left, message right */}
        <div className="kg-vine-divider">
          <Leaf className="h-4 w-4" />
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:items-center">
          <div className="text-center sm:text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-kg-champagne">
              Sa ljubavlju
            </p>
            <p
              className="mt-2 text-2xl text-kg-ink sm:text-3xl"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {event.names}
            </p>
          </div>

          <div className="text-center sm:border-l sm:border-kg-champagne-soft sm:pl-8 sm:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl leading-snug text-kg-ink sm:text-2xl"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {data.title}
            </motion.h2>
            {data.description ? (
              <p className="mt-3 text-sm text-kg-muted">{data.description}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
