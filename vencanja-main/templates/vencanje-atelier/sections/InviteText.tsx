"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { Media } from "../components/Media";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section id={id} className="va-section">
      <div
        className={
          hasImage
            ? "va-shell grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
            : "va-shell-narrow"
        }
      >
        {hasImage ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75 }}
            className="lg:col-span-5"
          >
            <Media
              src={data.imageUrl}
              alt=""
              className="aspect-[4/5] w-full"
            />
          </motion.div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, delay: 0.06 }}
          className={hasImage ? "lg:col-span-7" : undefined}
        >
          <p className="va-eyebrow mb-5">Poziv</p>
          <div className="va-rule-thin mb-8 ml-0" />
          <p className="va-body">{data.description}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
