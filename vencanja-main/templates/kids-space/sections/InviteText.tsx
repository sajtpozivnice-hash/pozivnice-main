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
  const { data, id, name } = section;

  return (
    <section id={id} className="kspc-section">
      <div className="kspc-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kspc-card-strong grid items-center gap-0 overflow-hidden sm:grid-cols-[1fr_0.9fr]"
        >
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="kspc-eyebrow mb-6">{name}</p>
            <p
              className="text-xl leading-relaxed text-white/85 sm:text-2xl"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {data.description}
            </p>
          </div>
          {data.imageUrl ? (
            <div className="relative min-h-[220px] sm:min-h-[300px]">
              <img
                src={data.imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0b0e1a]/40" />
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
