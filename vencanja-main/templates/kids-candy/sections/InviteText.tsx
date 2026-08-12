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

const InviteText: FC<Props> = ({ section }) => {
  const { data, id, name } = section;

  return (
    <section id={id} className="kcan-section">
      <div className="kcan-shell">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          {data.imageUrl ? (
            <motion.div
              initial={{ opacity: 0, rotate: -3 }}
              whileInView={{ opacity: 1, rotate: -2 }}
              viewport={{ once: true }}
              className="kcan-card-strong order-2 overflow-hidden lg:order-1"
            >
              <img
                src={data.imageUrl}
                alt=""
                className="aspect-[4/3] w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <p className="kcan-kicker w-fit">{name}</p>
            <p
              className="mt-6 text-2xl font-bold leading-snug sm:text-3xl"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {data.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InviteText;
