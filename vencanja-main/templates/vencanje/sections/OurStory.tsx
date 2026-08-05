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
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {data.image ? (
              <div className="img-1-1 rounded-2xl shadow-2xl">
                <img
                  src={data.image}
                  alt={data.title || "Naša priča"}
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {data.overline ? (
              <span
                style={{ color: colors?.base?.primary?.value }}
                className="mb-4 block text-sm font-semibold tracking-[0.2em] uppercase"
              >
                {data.overline}
              </span>
            ) : null}
            <h2
              style={{ color: colors?.base?.secondary?.value }}
              className="mb-6 font-display text-4xl leading-tight sm:mb-8 sm:text-5xl md:text-6xl"
            >
              {data.title}
            </h2>
            <div
              style={{ color: colors?.base?.secondary?.value }}
              className="space-y-6 font-serif text-base leading-relaxed italic opacity-80 whitespace-pre-wrap sm:text-lg"
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
