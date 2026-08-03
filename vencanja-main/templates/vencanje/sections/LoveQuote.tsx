"use client";

import { ThemeConfig } from "@/types/config";
import { LoveQuoteSection } from "@/types/sections";
import { motion } from "framer-motion";

type Props = {
  section: LoveQuoteSection;
  theme: ThemeConfig;
};

const LoveQuote: React.FC<Props> = ({ section, theme }) => {
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
          <h2
            style={{ color: colors?.base?.secondary?.value }}
            className="text-3xl md:text-5xl font-display leading-relaxed"
          >
            {data.title}
          </h2>

          {data.description && (
            <p className="text-lg md:text-xl font-serif italic opacity-70 leading-relaxed">
              {data.description}
            </p>
          )}

          <div
            style={{ backgroundColor: colors?.base?.primary?.value }}
            className="w-24 h-[2px] bg-wedding-gold mx-auto opacity-60"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LoveQuote;
