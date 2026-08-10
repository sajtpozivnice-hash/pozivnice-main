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
    <section id={id} className="ed-section ed-intro">
      <div className="ed-grain" aria-hidden />
      <div className="ed-shell ed-intro__grid relative z-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="ed-label mb-5 text-[rgba(244,239,230,0.55)]"
          >
            Editor&apos;s letter
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="ed-intro__title"
          >
            {headline.split("\n").map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {index === 1 ? <em>{line}</em> : line}
              </span>
            ))}
          </motion.h2>
          {body ? (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="ed-intro__body mt-8"
            >
              {body}
            </motion.p>
          ) : null}
        </div>

        {data.imageUrl ? (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="ed-intro__media"
          >
            <img src={data.imageUrl} alt="" referrerPolicy="no-referrer" />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default InviteText;
