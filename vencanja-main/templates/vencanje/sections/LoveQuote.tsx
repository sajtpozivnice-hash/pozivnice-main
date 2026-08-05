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
      className="section-padding relative overflow-hidden bg-wedding-cream/30"
    >
      {data.imageUrl ? (
        <div className="section-bg opacity-[0.12]">
          <img src={data.imageUrl} alt="" referrerPolicy="no-referrer" />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2
            style={{ color: colors?.base?.secondary?.value }}
            className="font-display text-3xl leading-relaxed md:text-5xl"
          >
            {data.title}
          </h2>

          {data.description ? (
            <p className="font-serif text-lg leading-relaxed italic opacity-70 md:text-xl">
              {data.description}
            </p>
          ) : null}

          <div
            style={{ backgroundColor: colors?.base?.primary?.value }}
            className="mx-auto h-0.5 w-24 opacity-60"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LoveQuote;
