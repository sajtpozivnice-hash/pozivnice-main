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
    <section id={id} className="kpas-section">
      <div className="kpas-shell max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kpas-card-strong p-8 sm:p-12"
        >
          <p className="kpas-eyebrow mb-6">{name}</p>

          {data.imageUrl ? (
            <div className="mx-auto mb-8 h-40 w-40 overflow-hidden rounded-full border-4 border-kpas-paper shadow-[0_16px_32px_-20px_rgba(74,63,82,0.4)] sm:h-48 sm:w-48">
              <img
                src={data.imageUrl}
                alt=""
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}

          <p
            className="kpas-dropcap text-center text-lg leading-relaxed text-kpas-ink/80 sm:text-xl"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {data.description}
          </p>

          <div className="kpas-divider" />
          <p className="kpas-page-number text-center">Strana Jedan</p>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
