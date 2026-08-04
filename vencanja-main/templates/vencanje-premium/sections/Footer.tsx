"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { PremiumMedia } from "../components/PremiumMedia";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#9c7a45";

  return (
    <section id={id} className="relative min-h-[80svh] w-full overflow-hidden">
      <PremiumMedia
        src={data.imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full"
        imgClassName="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/40" />

      <div className="relative z-10 flex min-h-[80svh] flex-col items-center justify-end px-5 pb-20 pt-32 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-5 text-4xl sm:text-5xl"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {event.names}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md text-sm text-white/75 sm:text-base"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          {data.title}
        </motion.p>
        <div
          className="mt-10 h-px w-14"
          style={{ background: accent }}
        />
        <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-white/50">
          With love
        </p>
      </div>
    </section>
  );
};

export default Footer;
