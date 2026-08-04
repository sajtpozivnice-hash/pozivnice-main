"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneShell } from "../components/SceneShell";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#c9a86a";

  return (
    <SceneShell id={id} backgroundImage={data.imageUrl} overlay="soft">
      <div className="v4-content-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-3xl text-white sm:text-4xl"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {event.names}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg leading-relaxed text-white/80 sm:text-xl"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          {data.title}
        </motion.h2>
        {data.subtitle ? (
          <p className="mt-4 text-sm text-white/55">{data.subtitle}</p>
        ) : null}
        <div
          className="mx-auto mt-10 h-px w-16"
          style={{ background: accent }}
        />
        <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-white/45">
          Sa ljubavlju
        </p>
      </div>
    </SceneShell>
  );
};

export default Footer;
