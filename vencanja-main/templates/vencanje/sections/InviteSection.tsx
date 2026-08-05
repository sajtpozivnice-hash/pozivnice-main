"use client";

import { ThemeConfig } from "@/types/config";
import { InviteTextSection } from "@/types/sections";
import { motion } from "framer-motion";

type Props = {
  section: InviteTextSection;
  theme: ThemeConfig;
};

const InviteSection: React.FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const { colors } = theme;

  return (
    <section
      id={id}
      className="section-padding relative overflow-hidden bg-wedding-cream/30"
    >
      {data.imageUrl ? (
        <div className="section-bg opacity-[0.12]">
          <img
            src={data.imageUrl}
            alt=""
            referrerPolicy="no-referrer"
          />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            style={{ color: colors?.base?.primary?.value }}
            className="text-lg leading-relaxed opacity-80 sm:text-xl md:text-2xl"
          >
            {data.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteSection;
