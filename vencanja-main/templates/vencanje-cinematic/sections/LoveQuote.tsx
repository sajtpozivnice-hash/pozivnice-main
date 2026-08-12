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
      <div className="vc-stage-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vc-still"
        >
          <span className="vc-still-corner vc-still-corner--tl" aria-hidden="true" />
          <span className="vc-still-corner vc-still-corner--tr" aria-hidden="true" />
          <span className="vc-still-corner vc-still-corner--bl" aria-hidden="true" />
          <span className="vc-still-corner vc-still-corner--br" aria-hidden="true" />

          <div className="vc-still-sprockets" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>

          <blockquote className="vc-still-quote">{data.title}</blockquote>

          <div className="vc-still-caption">
            <span className="vc-still-caption-label" style={{ color: accent }}>
              Kadar
            </span>
            <p className="vc-still-caption-text">
              {data.description ?? "Iz zajedničke priče"}
            </p>
          </div>
        </motion.div>
      </div>
    </SceneFrame>
  );
};

export default LoveQuote;
