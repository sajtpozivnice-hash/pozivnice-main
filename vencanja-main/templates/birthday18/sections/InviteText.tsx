"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const raw = data.description?.trim() || "";
  const parts = raw.split(/\n\n+/);
  const headline = parts[0] || "";
  const body = parts.slice(1).join("\n\n");

  return (
    <section id={id} className="b18-section overflow-hidden">
      {data.imageUrl ? (
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <img
            src={data.imageUrl}
            alt=""
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050506] via-[#050506]/80 to-[#050506]" />
        </div>
      ) : null}

      <div className="b18-shell relative z-10 max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18-heading b18-metal whitespace-pre-line"
        >
          {headline}
        </motion.p>
        {body ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed whitespace-pre-line text-white/60 sm:text-lg"
          >
            {body}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
};

export default InviteText;
