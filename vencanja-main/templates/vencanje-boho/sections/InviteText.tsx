"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { Wave } from "../components/Ornaments";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

  return (
    <section id={id} className="vb-section bg-[var(--color-vb-sand-deep)]">
      <div className="vb-shell text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85 }}
        >
          <p className="vb-kicker">Pozivnica</p>
          <h2 className="vb-script-sm mt-5">{event.names}</h2>
          <Wave className="vb-wave mt-6" />
          <p className="vb-body mx-auto mt-8 max-w-lg">
            {data.description ??
              "Pozivamo Vas da budete uz nas na svečanosti našeg venčanja."}
          </p>
          <p className="vb-meta mt-10">
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
