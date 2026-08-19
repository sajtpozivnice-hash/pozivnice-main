"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";

type Props = {
  section: HeroSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const splitNames = (names: string) => {
  const separator = names.includes("&") ? "&" : " i ";
  const parts = names.split(separator);
  return {
    first: parts[0]?.trim() ?? names,
    second: parts.slice(1).join(separator).trim(),
  };
};

const Hero: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const { first, second } = splitNames(event.names);

  return (
    <section id={id} className="vd-hero">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="vd-shell relative"
      >
        <div className="vd-double-frame mx-auto max-w-2xl">
          <span className="vd-corner tl" aria-hidden />
          <span className="vd-corner tr" aria-hidden />
          <span className="vd-corner bl" aria-hidden />
          <span className="vd-corner br" aria-hidden />

          <p className="vd-eyebrow">{data.subtitle ?? "Venčanje"}</p>

          <div className="vd-diamond mt-8" />

          <h1 className="mt-8">
            <span className="vd-script block">{first}</span>
            {second ? (
              <>
                <span className="vd-eyebrow my-5 block tracking-[0.5em]">&</span>
                <span className="vd-script block">{second}</span>
              </>
            ) : null}
          </h1>

          <div className="vd-rule mt-10" />

          <p className="vd-meta mt-8">
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </p>

          {data.title ? (
            <p className="vd-body mx-auto mt-6 max-w-sm">{data.title}</p>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
