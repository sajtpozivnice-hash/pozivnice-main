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
      <div className="vc-stage flex min-h-[100svh] flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="vc-eyebrow mb-10"
          style={{ color: accent }}
        >
          Ove uloge su tumačili
        </motion.p>

        <div className="vc-credits">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vc-credits-row"
          >
            <span className="vc-credits-role">Mladenci</span>
            <span className="vc-credits-name">{event.names}</span>
          </motion.div>

          {data.subtitle ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="vc-credits-row"
            >
              <span className="vc-credits-role">Napomena</span>
              <span className="vc-credits-name vc-credits-name--body">
                {data.subtitle}
              </span>
            </motion.div>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="vc-credits-row"
          >
            <span className="vc-credits-role">Poruka</span>
            <span className="vc-credits-name vc-credits-name--body">
              {data.title}
            </span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="vc-endcard"
        >
          Kraj
        </motion.p>
      </div>
    </SceneFrame>
  );
};

export default Footer;
