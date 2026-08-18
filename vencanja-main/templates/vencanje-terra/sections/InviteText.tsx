"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { TerraMedia } from "../components/Media";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C45C26";
  const ink = theme.colors?.base?.secondary?.value ?? "#3D3429";
  const paragraphs = (data.description ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section id={id} className="vt-section bg-vt-sand">
      <div className="vt-container grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <TerraMedia
            src={data.imageUrl}
            alt={event.names}
            className="vt-soft aspect-[4/5] w-full max-w-sm mx-auto lg:mx-0"
          />
        </motion.div>

        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vt-eyebrow mb-6"
            style={{ color: accent }}
          >
            Poziv
          </motion.p>

          <div className="space-y-5">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph.slice(0, 24)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                className={
                  index === 0
                    ? "text-xl leading-[1.7] sm:text-2xl"
                    : "vt-body text-vt-muted"
                }
                style={
                  index === 0
                    ? { fontFamily: "var(--font-primary)", color: ink }
                    : undefined
                }
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <p className="mt-10 text-[10px] uppercase tracking-[0.36em] text-vt-muted">
            {event.names}
          </p>
        </div>
      </div>
    </section>
  );
};

export default InviteText;
