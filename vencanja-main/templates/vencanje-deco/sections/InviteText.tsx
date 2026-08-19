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
    <section id={id} className="vd-section">
      <div className="vd-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85 }}
          className="vd-double-frame mx-auto max-w-2xl text-center"
        >
          <span className="vd-corner tl" aria-hidden />
          <span className="vd-corner tr" aria-hidden />
          <span className="vd-corner bl" aria-hidden />
          <span className="vd-corner br" aria-hidden />

          <p className="vd-eyebrow">Pozivnica</p>
          <div className="vd-diamond mt-6" />
          <h2 className="vd-display mt-6">{event.names}</h2>
          <p className="vd-body mx-auto mt-6 max-w-md">
            imaju čast da zatraže zadovoljstvo Vašeg prisustva
          </p>
          <div className="vd-rule mt-8" />
          <p className="vd-body mx-auto mt-8 max-w-md">
            {data.description ??
              "Sa velikim poštovanjem molimo za čast Vašeg prisustva."}
          </p>
          <p className="vd-meta mt-10">
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
