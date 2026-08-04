"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneShell } from "../components/SceneShell";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#c9a86a";

  return (
    <SceneShell
      id={id}
      backgroundImage={data.imageUrl}
      overlay="default"
    >
      <div className="v4-content-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="v4-glass-strong px-6 py-14 sm:px-12 sm:py-20"
        >
          <div
            className="mx-auto mb-8 h-px w-14"
            style={{ background: accent }}
          />
          <p
            className="text-xl leading-relaxed text-white sm:text-2xl sm:leading-relaxed"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {data.description}
          </p>
          <div
            className="mx-auto mt-8 h-px w-14"
            style={{ background: accent }}
          />
        </motion.div>
      </div>
    </SceneShell>
  );
};

export default InviteText;
