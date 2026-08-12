"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
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

  return (
    <section id={id} className="bday-section pb-10 pt-6">
      <div className="bday-shell max-w-2xl text-center">
        <div className="bday-stamp-seal mx-auto mb-6">
          <PartyPopper className="h-6 w-6" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bday-card-strong relative overflow-hidden px-6 py-12 sm:px-10"
        >
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.08]"
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
              <p className="mt-3 text-lg text-black/60">{data.subtitle}</p>
            ) : null}
            {data.description ? (
              <p className="mx-auto mt-4 max-w-md text-sm text-black/50">
                {data.description}
              </p>
            ) : null}

            <div
              className="bday-stamp-line mt-8"
              style={{
                borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
                color: accent,
              }}
            >
              <span>{event.names}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
