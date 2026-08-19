"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { OpalMedia } from "../components/Media";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C9A9A0";
  const ink = theme.colors?.base?.secondary?.value ?? "#3A3532";
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section
      id={id}
      className={
        hasImage
          ? "relative min-h-[70svh] w-full overflow-hidden"
          : "vo-section-tight bg-vo-pearl"
      }
    >
      {hasImage ? (
        <>
          <OpalMedia
            src={data.imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full"
            imgClassName="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vo-charcoal/80 via-vo-charcoal/45 to-vo-charcoal/30" />
        </>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className={
          hasImage
            ? "relative z-10 flex min-h-[70svh] flex-col items-center justify-end px-5 pb-20 pt-32 text-center sm:px-8"
            : "vo-container-narrow text-center"
        }
      >
        <p
          className="vo-eyebrow"
          style={{ color: hasImage ? "rgba(247,244,240,0.85)" : accent }}
        >
          {event.names}
        </p>

        <h2
          className="mt-8 text-2xl leading-snug sm:text-3xl"
          style={{
            fontFamily: "var(--font-primary)",
            color: hasImage ? "#F7F4F0" : ink,
          }}
        >
          {data.title}
        </h2>

        {data.subtitle ? (
          <p
            className={`vo-body mt-5 ${hasImage ? "text-vo-pearl/85" : ""}`}
          >
            {data.subtitle}
          </p>
        ) : null}

        <span
          className="mx-auto mt-10 block h-px w-20"
          style={{
            background: hasImage ? "rgba(247,244,240,0.55)" : accent,
          }}
        />

        <p
          className={`mt-8 text-[10px] uppercase tracking-[0.4em] ${
            hasImage ? "text-vo-pearl/65" : "text-vo-muted"
          }`}
        >
          {formatDate(event.date, "DD.MM.YYYY")}
        </p>
      </motion.div>
    </section>
  );
};

export default Footer;
