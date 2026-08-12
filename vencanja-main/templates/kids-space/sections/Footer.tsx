"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

  return (
    <section id={id} className="kspc-section pb-10 pt-6">
      <div className="kspc-shell max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kspc-transmission"
        >
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
              referrerPolicy="no-referrer"
            />
          ) : null}

          <div className="relative z-10">
            <p className="kspc-transmission-head">
              <Radio className="h-3.5 w-3.5" />
              <span className="kspc-transmission-dot" />
              Kraj transmisije
            </p>

            <h2 className="kspc-heading text-3xl sm:text-5xl">{data.title}</h2>
            {data.subtitle ? (
              <p className="mt-3 text-white/60">{data.subtitle}</p>
            ) : null}
            {data.description ? (
              <p className="mx-auto mt-4 max-w-sm text-sm text-white/50">
                {data.description}
              </p>
            ) : null}

            <div className="kspc-transmission-row">
              <span>Posada</span>
              <span>{event.names}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
