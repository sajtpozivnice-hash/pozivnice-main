"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { PremiumMedia } from "../components/PremiumMedia";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#9c7a45";
  const ink = theme.colors?.base?.secondary?.value ?? "#1c1917";

  return (
    <section id={id} className="relative min-h-[70svh] w-full overflow-hidden">
      <PremiumMedia
        src={data.imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full"
        imgClassName="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-vp-ink/55" />

      <div className="relative z-10 flex min-h-[70svh] items-center justify-center px-5 py-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl text-center"
        >
          <div
            className="mx-auto mb-8 h-px w-14"
            style={{ background: accent }}
          />
          <p
            className="text-2xl leading-relaxed text-white sm:text-3xl sm:leading-relaxed"
            style={{ fontFamily: "var(--font-primary)", color: "white" }}
          >
            {data.description}
          </p>
          <div
            className="mx-auto mt-8 h-px w-14"
            style={{ background: accent }}
          />
          <p className="sr-only" style={{ color: ink }}>
            Pozivnica
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
