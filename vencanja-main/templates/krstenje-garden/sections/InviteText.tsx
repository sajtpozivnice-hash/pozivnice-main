"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="kg-section bg-kg-sand">
      <div className="kg-container-narrow text-center">
        {/* Torn-paper note, pinned with a washi tape strip — not a plain rounded card */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
          viewport={{ once: true }}
          className="kg-note px-6 py-16 sm:px-14 sm:py-20"
        >
          <span className="kg-note-tape" aria-hidden />
          <Leaf className="mx-auto mb-6 h-6 w-6 text-kg-champagne" />
          <p
            className="text-xl leading-relaxed sm:text-2xl sm:leading-relaxed"
            style={{
              fontFamily: "var(--font-primary)",
              color: "var(--color-kg-ink)",
            }}
          >
            {data.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteText;
