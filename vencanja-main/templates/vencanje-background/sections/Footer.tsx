"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { GlassPanel } from "../components/GlassPanel";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#e2c4a0";
  const accentImage = data.imageUrl?.trim() ? data.imageUrl.trim() : "";

  return (
    <section id={id} className="vb-section pb-28">
      <div className="vb-wrap-narrow">
        <GlassPanel strong className="overflow-hidden p-0 text-center">
          {accentImage ? (
            <img
              src={accentImage}
              alt=""
              className="aspect-[21/9] w-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
          ) : null}
          <div className="px-6 py-12 sm:px-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-4xl text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {event.names}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm text-white/70 sm:text-base"
            >
              {data.title}
            </motion.p>
            <div
              className="mx-auto mt-8 h-px w-12"
              style={{ background: accent }}
            />
            <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-white/45">
              Sa ljubavlju
            </p>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
};

export default Footer;
