"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneFrame } from "../components/SceneFrame";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#d4a574";

  return (
    <SceneFrame id={id} backgroundImage={data.imageUrl}>
      <div className="vc-stage flex min-h-[100svh] flex-col items-center justify-end pb-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vc-eyebrow mb-6"
          style={{ color: accent }}
        >
          The end — and the beginning
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-5xl text-white sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {event.names}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-md text-sm text-white/65 sm:text-base"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          {data.title}
        </motion.p>
        <div
          className="mt-10 h-px w-14"
          style={{ background: accent }}
        />
      </div>
    </SceneFrame>
  );
};

export default Footer;
