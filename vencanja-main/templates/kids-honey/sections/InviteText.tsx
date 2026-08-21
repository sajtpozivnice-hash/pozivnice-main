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
    <section id={id} className="khny-section">
      <div className="khny-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="khny-jar relative mx-auto overflow-hidden"
        >
          <span className="khny-jar-lid" aria-hidden />
          {data.imageUrl ? (
            <div className="aspect-[16/10] w-full sm:aspect-[2/1]">
              <img
                src={data.imageUrl}
                alt=""
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}
          <div className="px-6 py-8 text-center sm:px-10 sm:py-10">
            <p className="khny-lid mx-auto mb-4">Pozivnica</p>
            <p className="khny-script text-[clamp(2.2rem,7vw,3.5rem)]">
              {event.names}
            </p>
            <div className="khny-drip mt-1" aria-hidden />
            <p className="khny-body mx-auto mt-5 max-w-md">{data.description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
