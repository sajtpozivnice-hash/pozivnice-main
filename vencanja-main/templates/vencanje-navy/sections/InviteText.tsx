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

const InviteText: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section id={id} className="vn-section">
      <div className="vn-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9 }}
          className="vn-invite-frame"
        >
          <span className="vn-invite-br" aria-hidden="true">
            <span className="tl" />
            <span className="tr" />
            <span className="bl" />
            <span className="br" />
          </span>

          <p className="vn-eyebrow">Pozivnica</p>

          {hasImage ? (
            <div className="mx-auto mt-8 max-w-[11rem] sm:max-w-[13rem]">
              <Media
                src={data.imageUrl}
                alt={event.names}
                className="aspect-[4/5] w-full"
              />
            </div>
          ) : null}

          <h2 className="vn-display mt-8">{event.names}</h2>

          <p className="vn-invite-lede mt-6">
            imaju čast da zatraže zadovoljstvo Vašeg prisustva
          </p>

          <div className="mx-auto mt-8 h-px w-12 bg-[var(--color-vn-champagne)]" />

          <p className="vn-body mx-auto mt-8 max-w-md">
            {data.description ??
              "Sa velikim poštovanjem molimo za čast Vašeg prisustva na svečanosti našeg venčanja."}
          </p>

          <p className="vn-caption mt-10">
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
