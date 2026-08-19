"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { LinenMedia } from "../components/Media";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C4A574";
  const ink = theme.colors?.base?.secondary?.value ?? "#2A2420";
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section id={id} className="vl-section bg-vl-paper">
      <div className="vl-container max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85 }}
        >
          <div className="vl-amp-ornament">
            <span style={{ color: accent }}>&</span>
          </div>

          {hasImage ? (
            <div className="mx-auto mb-10 mt-2 max-w-xs sm:max-w-sm">
              <LinenMedia
                src={data.imageUrl}
                alt=""
                className="aspect-[4/5] w-full"
              />
            </div>
          ) : null}

          <p
            className="vl-body text-[1.35rem] leading-[1.95] sm:text-[1.55rem] sm:leading-[2]"
            style={{ color: ink }}
          >
            {data.description}
          </p>

          <div className="vl-amp-ornament mt-10">
            <span style={{ color: accent }}>&</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
