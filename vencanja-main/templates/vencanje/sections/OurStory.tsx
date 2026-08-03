"use client";

import { ThemeConfig } from "@/types/config";
import { OurStorySection } from "@/types/sections";
import { motion } from "framer-motion";

type Props = {
  section: OurStorySection;
  theme: ThemeConfig;
};

const OurStory: React.FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const { colors } = theme;
  return (
    <section id={id} className="section-padding bg-wedding-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={data.image}
                alt="Nasa Prica"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              style={{ color: colors?.base?.primary?.value }}
              className="text-wedding-gold uppercase tracking-[0.2em] text-sm font-semibold mb-4 block"
            >
              {data.overline}
            </span>
            <h2
              style={{ color: colors?.base?.secondary?.value }}
              className="text-5xl md:text-6xl font-display mb-8 leading-tight"
            >
              {data.title}
            </h2>
            <div
              style={{ color: colors?.base?.secondary?.value }}
              className="space-y-6 text-lg leading-relaxed opacity-80 font-serif italic whitespace-pre-wrap"
            >
              {data.text}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
