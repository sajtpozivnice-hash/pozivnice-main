"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { Media } from "../components/Media";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#111111";

  return (
    <section id={id} className="vi-section">
      <div className="vi-shell">
        <div className="vi-rule-ink" />

        <div className="flex flex-wrap items-baseline justify-between gap-3 py-4">
          <p className="vi-eyebrow">Poziv</p>
          <p className="vi-caption">
            {event.names} — {formatDate(event.date, "D_MMMM_YYYY")}
          </p>
        </div>

        <div className="vi-rule" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85 }}
          className="mt-10"
        >
          <p className="vi-newspaper vi-dropcap">{data.description}</p>
        </motion.div>

        <div className="vi-accent mt-12" style={{ background: accent }} />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Media
              src={data.imageUrl}
              alt=""
              className="vi-plate-strip"
              caption="Fotografija — pre godinu dana"
            />
          </div>
          <p className="vi-caption lg:col-span-4 lg:pt-2">
            Molimo Vas da odgovor pošaljete do{" "}
            {formatDate(event.rsvpDate, "D_MMMM_YYYY")}.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InviteText;
