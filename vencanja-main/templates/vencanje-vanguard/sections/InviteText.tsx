"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

  return (
    <section id={id} className="vg-section">
      <div className="vg-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85 }}
          className="grid gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-4">
            <p className="vg-kicker">Pozivnica</p>
            <h2 className="vg-display-sm mt-4">{event.names}</h2>
            <p className="vg-meta mt-6">
              {formatDate(event.date, "DAY_D_MMMM_YYYY")}
            </p>
          </div>

          <div className="lg:col-span-8 lg:border-l lg:border-[var(--color-vg-ink)] lg:pl-12">
            <p className="vg-meta mb-6">Čast i zadovoljstvo</p>
            <p className="vg-body max-w-xl text-[1.15rem] leading-[1.8]">
              {data.description ??
                "Pozivamo Vas da budete uz nas na svečanosti našeg venčanja."}
            </p>
            <div className="vg-bar-accent mt-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
