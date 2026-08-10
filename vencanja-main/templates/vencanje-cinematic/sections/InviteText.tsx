"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneFrame } from "../components/SceneFrame";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#d4a574";

  return (
    <SceneFrame id={id} backgroundImage={data.imageUrl}>
      <div className="vc-stage-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="vc-eyebrow mb-8" style={{ color: accent }}>
            Monolog
          </p>
          <div className="vc-rule mb-8" style={{ background: accent }} />
          <p
            className="text-2xl leading-relaxed text-white sm:text-3xl sm:leading-relaxed"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {data.description}
          </p>
          <div className="vc-rule mt-8" style={{ background: accent }} />
        </motion.div>
      </div>
    </SceneFrame>
  );
};

export default InviteText;
