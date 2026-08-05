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
  const accent = theme.colors?.base?.primary?.value ?? "#FF5C8A";
  const secondary = theme.colors?.base?.secondary?.value ?? "#3D8BFF";

  return (
    <section id={id} className="bday-section pb-10 pt-6">
      <div className="bday-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] px-6 py-14 text-center text-white sm:px-10"
          style={{
            background: `linear-gradient(135deg, ${accent}, ${secondary})`,
          }}
        >
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
          ) : null}

          <div className="relative z-10">
            <h2
              className="text-4xl sm:text-5xl"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {data.title}
            </h2>
            {data.subtitle ? (
              <p className="mt-3 text-lg text-white/85">{data.subtitle}</p>
            ) : null}
            {data.description ? (
              <p className="mx-auto mt-4 max-w-md text-sm text-white/75">
                {data.description}
              </p>
            ) : null}
            <p className="mt-8 text-xs uppercase tracking-[0.28em] text-white/60">
              {event.names}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
