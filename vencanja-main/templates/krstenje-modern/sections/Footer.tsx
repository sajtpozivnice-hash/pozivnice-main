"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const ink = theme.colors?.base?.secondary?.value;

  return (
    <section id={id} className="km-section bg-white">
      <div className="km-container">
        {/* Typographic poster closing — left-aligned, no divider/eyebrow/caption stack */}
        <div className="km-footer-poster">
          <span className="km-footer-poster__tag">Hvala</span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="km-footer-names"
            style={{ color: ink }}
          >
            {event.names}
          </motion.h2>

          <div className="km-footer-poster__meta">
            <p className="max-w-sm text-sm text-km-muted sm:text-base">
              {data.title}
            </p>
            {data.description ? (
              <p className="text-xs uppercase tracking-[0.25em] text-km-champagne">
                {data.description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
