"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { Wave } from "../components/Ornaments";

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
    <section id={id} className="vb-hero">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="vb-shell"
      >
        <div className="vb-arch" />
        <p className="vb-kicker mt-8">{data.subtitle ?? "Venčanje"}</p>

        <h1 className="mt-6">
          <span className="vb-script block">{first}</span>
          {second ? (
            <>
              <span
                className="my-1 block text-2xl"
                style={{ color: "var(--color-vb-clay)", fontFamily: "var(--font-primary)" }}
              >
                &
              </span>
              <span className="vb-script block">{second}</span>
            </>
          ) : null}
        </h1>

        <Wave className="vb-wave mt-8" />

        <p className="vb-meta mt-8">
          {formatDate(event.date, "DAY_D_MMMM_YYYY")}
        </p>
        {data.title ? (
          <p className="vb-body mx-auto mt-5 max-w-sm">{data.title}</p>
        ) : null}
      </motion.div>
    </section>
  );
};

export default Hero;
