"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { OpalMedia } from "../components/Media";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C9A9A0";
  const ink = theme.colors?.base?.secondary?.value ?? "#3A3532";

  return (
    <section id={id} className="vo-section bg-vo-pearl">
      <div className="vo-container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-2xl"
        >
          <OpalMedia
            src={data.imageUrl}
            alt=""
            className="aspect-[5/4] w-full rounded-[2rem] opacity-55"
            imgClassName="h-full w-full object-cover"
          />
          <div className="absolute inset-0 rounded-[2rem] bg-vo-blush/30" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="vo-vellum-strong relative z-10 mx-auto mt-[-4.5rem] max-w-lg rounded-[1.75rem] px-8 py-10 sm:ml-auto sm:mr-0 sm:mt-[-7rem] sm:px-12 sm:py-12 md:max-w-xl"
        >
          <div
            className="mb-6 h-px w-12"
            style={{ background: accent }}
          />
          <p
            className="text-xl leading-relaxed sm:text-2xl sm:leading-relaxed"
            style={{ fontFamily: "var(--font-primary)", color: ink }}
          >
            {data.description}
          </p>
          <div
            className="mt-8 h-px w-12"
            style={{ background: accent }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
