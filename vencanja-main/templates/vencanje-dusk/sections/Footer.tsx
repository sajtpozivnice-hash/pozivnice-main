"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import Media from "../components/Media";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

  return (
    <footer id={id} className="vd-footer">
      <Media src={data.imageUrl} className="vd-footer__still" />

      <div className="vd-footer__inner vd-shell--narrow">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vd-footer__names"
        >
          {event.names}
        </motion.p>

        <div className="vd-rule mx-auto my-7" />

        <p className="vd-body">{data.title}</p>
        {data.subtitle ? (
          <p className="vd-eyebrow vd-eyebrow--muted mt-6">{data.subtitle}</p>
        ) : null}

        <p className="vd-eyebrow vd-eyebrow--muted mt-10">
          {formatDate(event.date, "DD.MM.YYYY")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
