"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LoveQuoteSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneFrame } from "../components/SceneFrame";

type Props = {
  section: LoveQuoteSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const LoveQuote: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#d4a574";

  return (
    <SceneFrame id={id} backgroundImage={data.imageUrl}>
      <div className="vc-stage-narrow text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="vc-eyebrow mb-10"
          style={{ color: accent }}
        >
          {data.description ?? "Intertitle"}
        </motion.p>
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl leading-snug text-white sm:text-4xl sm:leading-snug"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {data.title}
        </motion.blockquote>
        <div
          className="mx-auto mt-10 h-px w-16"
          style={{ background: accent }}
        />
      </div>
    </SceneFrame>
  );
};

export default LoveQuote;
