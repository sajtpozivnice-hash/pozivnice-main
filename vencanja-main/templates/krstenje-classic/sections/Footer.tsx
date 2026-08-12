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
    <section id={id} className="kc-section bg-kc-ivory">
      <div className="kc-container-narrow text-center">
        {/* Formal letterpress closing — signature block framed by a double rule and seal dot */}
        <div className="kc-ornament mb-8">
          <span className="kc-ornament-dot" />
        </div>

        {data.imageUrl ? (
          <div className="kc-seal-frame mx-auto mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.imageUrl} alt={event.names} />
          </div>
        ) : null}

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl leading-snug sm:text-4xl"
          style={{ fontFamily: "var(--font-primary)", color: ink }}
        >
          {data.title}
        </motion.h2>

        {data.description ? (
          <p className="mt-4 text-sm text-kc-muted">{data.description}</p>
        ) : null}

        <div className="kc-ornament my-8">
          <span className="kc-ornament-dot" />
        </div>

        <p className="text-[11px] uppercase tracking-[0.32em] text-kc-muted">
          S ljubavlju
        </p>
        <p
          className="mt-2 text-xl sm:text-2xl"
          style={{ fontFamily: "var(--font-primary)", color: ink }}
        >
          {event.names}
        </p>
      </div>
    </section>
  );
};

export default Footer;
