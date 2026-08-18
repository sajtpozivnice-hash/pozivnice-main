"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LoveQuoteSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { OpalMedia } from "../components/Media";

type Props = {
  section: LoveQuoteSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const LoveQuote: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:py-36"
      style={
        hasImage
          ? undefined
          : {
              background:
                "linear-gradient(160deg, #E8D5D0 0%, #C9A9A0 55%, #E8D5D0 100%)",
            }
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
          <div className="absolute inset-0 bg-vo-charcoal/50" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(247,244,240,0.18)_0%,transparent_60%)]" />
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(247,244,240,0.28)_0%,transparent_60%)]" />
      )}

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl leading-snug text-vo-pearl sm:text-4xl sm:leading-snug"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {data.title}
        </motion.blockquote>

        {data.description ? (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-8 text-[11px] uppercase tracking-[0.35em] text-vo-pearl/80"
          >
            {data.description}
          </motion.p>
        ) : (
          <div className="mx-auto mt-10 h-px w-16 bg-vo-pearl/70" />
        )}
      </div>
    </section>
  );
};

export default LoveQuote;
