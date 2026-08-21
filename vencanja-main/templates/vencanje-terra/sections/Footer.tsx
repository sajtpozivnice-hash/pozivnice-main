"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { TerraMedia } from "../components/Media";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C45C26";

  return (
    <section
      id={id}
      className="relative overflow-hidden bg-vt-ink px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      {data.imageUrl ? (
        <>
          <TerraMedia
            src={data.imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full opacity-30"
          />
          <div className="absolute inset-0 bg-vt-ink/75" />
        </>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-lg text-center"
      >
        <p className="vt-eyebrow" style={{ color: accent }}>
          {event.names}
        </p>

        <h2
          className="mt-8 text-3xl leading-snug text-vt-cream sm:text-4xl"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {data.title}
        </h2>

        {data.subtitle ? (
          <p className="vt-body mt-5 text-vt-cream/70">{data.subtitle}</p>
        ) : null}

        {data.description ? (
          <p className="vt-body mt-3 text-vt-cream/60">{data.description}</p>
        ) : null}

        <span
          className="mx-auto mt-10 block h-1 w-12 rounded-full"
          style={{ background: accent }}
        />

        <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-vt-cream/55">
          {formatDate(event.date, "DD.MM.YYYY")}
        </p>
      </motion.div>
    </section>
  );
};

export default Footer;
