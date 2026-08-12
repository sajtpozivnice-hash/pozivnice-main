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

const InviteText: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#d4a574";

  return (
    <SceneFrame id={id} backgroundImage={data.imageUrl} overlay="heavy">
      <span className="vc-letterbox vc-letterbox--top" aria-hidden="true" />
      <span className="vc-letterbox vc-letterbox--bottom" aria-hidden="true" />

      <div className="vc-caption-wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vc-caption-strip"
        >
          <span className="vc-caption-badge" style={{ borderColor: accent, color: accent }}>
            CC
          </span>
          <p className="vc-caption-text">{data.description}</p>
          <span className="vc-caption-code">{event.names}</span>
        </motion.div>
      </div>
    </SceneFrame>
  );
};

export default InviteText;
