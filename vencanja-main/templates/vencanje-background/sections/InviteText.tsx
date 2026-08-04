"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { GlassPanel } from "../components/GlassPanel";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#e2c4a0";

  return (
    <section id={id} className="vb-section">
      <div className="vb-wrap-narrow">
        <GlassPanel strong className="px-6 py-12 text-center sm:px-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="mx-auto mb-8 h-px w-12"
              style={{ background: accent }}
            />
            <p
              className="text-xl leading-relaxed text-white sm:text-2xl"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {data.description}
            </p>
            <div
              className="mx-auto mt-8 h-px w-12"
              style={{ background: accent }}
            />
          </motion.div>
        </GlassPanel>
      </div>
    </section>
  );
};

export default InviteText;
