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

const InviteText: FC<Props> = ({ section, theme }) => {
  const { data, id, name } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#FF5C8A";

  return (
    <section id={id} className="bday-section">
      <div className="bday-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bday-card-strong relative overflow-hidden p-6 sm:p-10 lg:p-12"
        >
          <div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30"
            style={{ background: accent }}
          />
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="bday-eyebrow mb-5">{name}</p>
              <p
                className="text-2xl leading-relaxed text-bday-ink sm:text-3xl lg:text-4xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {data.description}
              </p>
            </div>
            {data.imageUrl ? (
              <div className="overflow-hidden rounded-[1.75rem]">
                <img
                  src={data.imageUrl}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
