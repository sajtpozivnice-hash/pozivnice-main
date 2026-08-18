"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { Media } from "../components/Media";

type Props = {
  section: FooterSection;
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

const initialOf = (name: string) =>
  name.trim().charAt(0).toUpperCase() || "";

const Footer: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const { first, second } = splitNames(event.names);
  const crest = `${initialOf(first)}${second ? initialOf(second) : ""}`;
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section
      id={id}
      className={
        hasImage
          ? "relative min-h-[78svh] w-full overflow-hidden"
          : "vn-section"
      }
    >
      {hasImage ? (
        <>
          <Media
            src={data.imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full"
            imgClassName="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </>
      ) : null}

      <div
        className={
          hasImage
            ? "relative z-10 flex min-h-[78svh] flex-col items-center justify-end px-5 pb-20 pt-32 text-center text-white"
            : "vn-shell max-w-lg text-center"
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85 }}
        >
          <div
            className="vn-crest"
            aria-hidden="true"
            style={
              hasImage
                ? {
                    borderColor: "rgba(255,255,255,0.55)",
                    color: "#fff",
                  }
                : undefined
            }
          >
            {crest}
          </div>

          <p
            className={`vn-caption mt-10 tracking-[0.4em] ${hasImage ? "text-white/75" : ""}`}
          >
            {data.title || "Sa poštovanjem"}
          </p>

          <h2
            className="vn-display-sm mt-5"
            style={hasImage ? { color: "#fff" } : undefined}
          >
            {event.names}
          </h2>

          {data.subtitle ? (
            <p className={`vn-body mt-5 ${hasImage ? "text-white/85" : ""}`}>
              {data.subtitle}
            </p>
          ) : null}

          {data.description ? (
            <p className={`vn-body mt-3 ${hasImage ? "text-white/75" : ""}`}>
              {data.description}
            </p>
          ) : null}

          <div
            className="mx-auto mt-10 h-px w-16"
            style={{
              background: hasImage
                ? "rgba(255,255,255,0.55)"
                : "var(--color-vn-champagne)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
