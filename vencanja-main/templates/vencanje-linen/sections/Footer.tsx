"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { LinenMedia } from "../components/Media";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

function monogramFromNames(names: string): string {
  const parts = names
    .split(/\s*(?:&|\/|\+| i )\s*/i)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
  }
  return names
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

const Footer: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C4A574";
  const monogram = monogramFromNames(event.names);
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section
      id={id}
      className={
        hasImage
          ? "relative min-h-[78svh] w-full overflow-hidden"
          : "vl-section-tight bg-vl-paper pb-20"
      }
    >
      {hasImage ? (
        <>
          <LinenMedia
            src={data.imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full"
            imgClassName="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/25" />
        </>
      ) : null}

      <div
        className={
          hasImage
            ? "relative z-10 flex min-h-[78svh] flex-col items-center justify-end px-5 pb-20 pt-32 text-center text-white"
            : "vl-container max-w-md text-center"
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85 }}
        >
          <div
            className="vl-monogram mx-auto mb-8"
            style={{
              borderColor: hasImage ? "rgba(255,255,255,0.55)" : accent,
              color: hasImage ? "#fff" : undefined,
            }}
          >
            {monogram}
          </div>

          <p
            className="text-2xl sm:text-3xl"
            style={{
              fontFamily: "var(--font-primary)",
              color: hasImage ? "#fff" : undefined,
            }}
          >
            {event.names}
          </p>

          <p
            className={`vl-caption mt-4 ${hasImage ? "text-white/70" : ""}`}
          >
            {formatDate(event.date, "DD.MM.YYYY")}
          </p>

          <div
            className="mx-auto mt-8 h-px w-12"
            style={{
              background: hasImage ? "rgba(255,255,255,0.55)" : accent,
            }}
          />

          <p
            className={`vl-body mt-8 ${hasImage ? "text-white/85" : "text-vl-muted"}`}
          >
            {data.title}
          </p>

          {data.subtitle ? (
            <p
              className={`vl-caption mt-6 ${hasImage ? "text-white/65" : ""}`}
            >
              {data.subtitle}
            </p>
          ) : null}

          {data.description ? (
            <p
              className={`vl-body mt-4 max-w-md ${hasImage ? "text-white/75" : "text-vl-muted"}`}
            >
              {data.description}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
