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

const InviteText: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

  return (
    <section id={id} className="kcart-section">
      <div className="kcart-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kcart-panel mx-auto grid max-w-4xl overflow-hidden md:grid-cols-2"
        >
          {data.imageUrl ? (
            <div className="min-h-[220px] border-b-[3.5px] border-[var(--color-kcart-ink)] md:border-b-0 md:border-r-[3.5px]">
              <img
                src={data.imageUrl}
                alt=""
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div
              className="min-h-[180px] border-b-[3.5px] border-[var(--color-kcart-ink)] md:border-b-0 md:border-r-[3.5px]"
              style={{ background: "var(--color-kcart-mint)" }}
            />
          )}
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <p className="kcart-eyebrow mb-4 w-fit">Pozivnica</p>
            <h2 className="kcart-heading text-3xl sm:text-4xl">{event.names}</h2>
            <p className="kcart-body mt-4">{data.description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
