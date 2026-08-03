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
      className="relative py-32 px-6 flex items-center justify-center bg-wedding-cream/30"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1
            style={{ color: colors?.base?.primary?.value }}
            className="text-2xl md:text-2xl opacity-70 leading-relaxed"
          >
            {data.description}
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default InviteSection;
