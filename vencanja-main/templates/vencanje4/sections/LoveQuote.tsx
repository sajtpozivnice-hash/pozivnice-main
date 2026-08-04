"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LoveQuoteSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneShell } from "../components/SceneShell";

type Props = {
  section: LoveQuoteSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const LoveQuote: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#c9a86a";

  return (
    <SceneShell id={id} backgroundImage={data.imageUrl} overlay="soft">
      <div className="v4-content-narrow text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-6xl leading-none"
          style={{ color: accent, fontFamily: "var(--font-primary)" }}
        >
          “
        </motion.p>
        <motion.blockquote
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl leading-relaxed text-white sm:text-4xl sm:leading-snug"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {data.title}
        </motion.blockquote>
        {data.description ? (
          <p className="mt-8 text-sm text-white/55">{data.description}</p>
        ) : (
          <div
            className="mx-auto mt-10 h-px w-16"
            style={{ background: accent }}
          />
        )}
      </div>
    </SceneShell>
  );
};

export default LoveQuote;
